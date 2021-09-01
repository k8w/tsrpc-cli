import fs from "fs-extra";
import glob from "glob";
import path from "path";
import 'ts-node/register';
import { EncodeIdUtil, TSBufferProtoGenerator } from 'tsbuffer-proto-generator';
import { ServiceDef, ServiceProto } from "tsrpc-proto";
import ts from "typescript";
import { i18n } from "../i18n/i18n";
import { ProtoUtil } from "../models/ProtoUtil";
import { colorJson, error, formatStr } from "../models/util";

export interface CmdProtoOptions {
    /** 默认当前文件夹 */
    input: string | undefined,
    output: string | undefined,
    /** 默认同 output */
    compatible: string | undefined,
    ugly: boolean | undefined,
    new: boolean | undefined,
    ignore: string[] | string | undefined,
    verbose: boolean | undefined,
}

export async function cmdProto(options: CmdProtoOptions) {
    let resGenProto = await genProto(options);

    if (options.output) {
        await outputProto({
            input: options.input!,
            output: options.output,
            ugly: options.ugly,
            proto: resGenProto.newProto
        })
    }
    else if (options.verbose) {
        console.log(colorJson(resGenProto.newProto));
    }
}

export async function genProto(options: CmdProtoOptions) {
    // 解析输入 默认为当前文件夹
    if (!options.input) {
        options.input = '.'
    }
    // 去除尾部的 / 和 \
    options.input = options.input.replace(/[\\\/]+$/, '');
    // 只能填写文件夹 不支持通配符
    if (!(await fs.stat(options.input)).isDirectory()) {
        throw error(i18n.inputMustBeFolder)
    }

    // compatible 默认同output
    let oldProtoPath = options.compatible || options.output;
    let oldProto: ServiceProto | undefined;
    if (!options.new && oldProtoPath) {
        // Parse TS
        if (oldProtoPath.endsWith('.ts')) {
            let content = fs.existsSync(oldProtoPath) && await fs.readFile(oldProtoPath, 'utf-8');
            if (content) {
                let match = content.match(/[\s\S]*:\s*ServiceProto<ServiceType>\s*=\s*(\{[\s\S]+\});?\s*/);
                if (match) {
                    try {
                        oldProto = JSON.parse(match[1]);
                    }
                    catch (e) {
                        throw error(i18n.compatibleError, { innerError: (e as Error).message })
                    }
                }
                else {
                    console.error(`Not invalid proto ts file: ${oldProtoPath}`);
                    throw error(i18n.compatibleError, { innerError: `Not invalid proto ts file: ${oldProtoPath}` })
                }
            }
        }
        // Parse JSON
        else {
            try {
                oldProto = ProtoUtil.loadServiceProto(oldProtoPath)
                if (!oldProto && options.compatible) {
                    throw new Error(formatStr(i18n.fileOpenError, { file: path.resolve(oldProtoPath) }));
                }
            }
            catch (e) {
                throw error(i18n.compatibleError, { innerError: (e as Error).message })
            }
        }
    }

    let fileList = glob.sync(options.input + '/**/{Ptl,Msg}*.ts', {
        ignore: options.ignore
    }).map(v => path.relative(options.input!, v).replace(/\\/g, '/'));

    // 临时切换working dir
    let originalCwd = process.cwd();
    process.chdir(options.input);

    let canOptimizeByNew = false;
    EncodeIdUtil.onGenCanOptimized = () => {
        canOptimizeByNew = true;
    }

    let services: ServiceDef[] = [];
    const exp = /^(.*\/)?(Ptl|Msg)([^\.\/\\]+)\.ts$/;
    let typeProto = await new TSBufferProtoGenerator({ verbose: options.verbose }).generate(fileList, {
        compatibleResult: oldProto ? oldProto.types : undefined,
        filter: info => {
            let infoPath = info.path.replace(/\\/g, '/')
            let match = infoPath.match(exp);

            // path里包含 __开头的目录名 则忽略
            if (/(\/|^)__/.test(infoPath)) {
                return false;
            }

            if (!match) {
                throw new Error('Error path (not Ptl nor Msg): ' + info.path);
            }

            if (match[2] === 'Ptl') {
                return info.name === 'Req' + match[3] || info.name === 'Res' + match[3];
            }
            else {
                return info.name === 'Msg' + match[3];
            }
        }
    });

    for (let filepath of fileList) {
        filepath = filepath.replace(/^\.\//, '');
        let match = filepath.match(exp)!;
        let typePath = filepath.replace(/\.ts$/, '');

        // 解析conf
        let src = (await fs.readFile(filepath)).toString();
        let compileResult = ts.transpileModule(src, {
            compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2015 }
        });
        let mod: any = {};
        eval(`(function(exports){${compileResult.outputText}})`)(mod);
        let conf: { [key: string]: any } | undefined = mod ? mod.conf : undefined;

        // Ptl 检测 Req 和 Res 类型齐全
        if (match[2] === 'Ptl') {
            let req = typePath + '/Req' + match[3];
            let res = typePath + '/Res' + match[3];
            if (typeProto[req] && typeProto[res]) {
                services.push({
                    id: services.length,
                    name: (match[1] || '') + match[3],
                    type: 'api',
                    conf: conf
                })
            }
            else {
                !typeProto[res] && console.warn(`[WARN] Missing Res${match[3]} at: "${filepath}"`.yellow);
                !typeProto[req] && console.warn(`[WARN] Missing Req${match[3]} at: "${filepath}"`.yellow);
            }
        }
        // Msg 检测Msg类型在
        else {
            let msg = typePath + '/Msg' + match[3];
            if (typeProto[msg]) {
                services.push({
                    id: services.length,
                    name: (match[1] || '') + match[3],
                    type: 'msg',
                    conf: conf
                })
            }
            else {
                console.warn(`Missing Msg: ` + typePath);
            }
        }
    }

    // EncodeID 兼容OldProto
    EncodeIdUtil.onGenCanOptimized = () => {
        canOptimizeByNew = true;
    }
    let encodeIds = EncodeIdUtil.genEncodeIds(services.map(v => v.type + v.name), oldProto ? oldProto.services.map(v => ({
        key: v.type + v.name,
        id: v.id
    })) : undefined);
    for (let item of encodeIds) {
        services.find(v => item.key.startsWith(v.type) && v.name === item.key.substr(v.type.length))!.id = item.id;
    }

    let version: number | undefined = oldProto?.version;
    // 只有在旧 Proto 存在，同时协议内容变化的情况下，才更新版本号
    if (oldProto && JSON.stringify({ types: oldProto.types, services: oldProto.services }) !== JSON.stringify({ types: typeProto, services: services })) {
        version = (oldProto.version || 0) + 1;
    }

    let proto: ServiceProto = {
        version: version,
        services: services,
        types: typeProto
    };
    process.chdir(originalCwd);

    if (canOptimizeByNew) {
        console.warn(formatStr(i18n.canOptimizeByNew, { filename: path.basename(oldProtoPath ?? options.output!) }) + '\n');
    }

    return {
        newProto: proto,
        oldProto: oldProto,
        isChanged: proto.version !== oldProto?.version
    };
}

export async function outputProto(options: {
    input: string,
    output: string,
    ugly: boolean | undefined,
    proto: ServiceProto<any>
}) {
    // TS
    if (options.output.endsWith('.ts')) {
        let imports: { [path: string]: { srcName: string, asName?: string }[] } = {};
        let apis: { name: string, importPath: string, req: string, res: string }[] = [];
        let msgs: { name: string, importPath: string, msg: string }[] = [];

        // 防止重名
        let usedNames: { [name: string]: 1 } = {};
        let getAsName = (name: string) => {
            while (usedNames[name]) {
                let match = name.match(/(^.*)\_(\d+)$/);
                if (match) {
                    let seq = parseInt(match[2]) + 1;
                    name = match[1] + '_' + seq;
                }
                else {
                    name = name + '_1';
                }
            }

            usedNames[name] = 1;
            return name;
        }

        let addImport = (path: string, srcNames: string[]): string[] => {
            let asNames = srcNames.map(v => getAsName(v));
            imports[path] = srcNames.map((v, i) => ({
                srcName: v,
                asName: asNames[i] && asNames[i] !== v ? asNames[i] : undefined
            }))

            return asNames;
        }

        for (let svc of options.proto.services) {
            let match = svc.name.replace(/\\/g, '/').match(/^(.*\/)*([^\/]+)$/);
            if (!match) {
                throw new Error(`Invalid svc name: ${svc.name}`);
            }

            let lastName = match[2];
            let importPath = path.relative(
                path.dirname(options.output),
                path.join(options.input, (match[1] || '') + (svc.type === 'api' ? 'Ptl' : 'Msg') + lastName)
            ).replace(/\\/g, '/');
            if (!importPath.startsWith('.')) {
                importPath = './' + importPath;
            }

            if (svc.type === 'api') {
                let op = addImport(importPath, ['Req' + lastName, 'Res' + lastName]);
                apis.push({
                    name: svc.name,
                    importPath: importPath,
                    req: op[0],
                    res: op[1]
                })
            }
            else {
                let op = addImport(importPath, ['Msg' + lastName]);
                msgs.push({
                    name: svc.name,
                    importPath: importPath,
                    msg: op[0]
                })
            }
        }

        let importStr = Object.entries(imports)
            .map(v => `import { ${v[1].map(w => w.asName ? `${w.srcName} as ${w.asName}` : w.srcName).join(', ')} } from '${v[0]}';`)
            .join('\n');
        let apiStr = apis.map(v => `        ${JSON.stringify(v.name)}: {
            req: ${v.req},
            res: ${v.res}
        }`).join(',\n');
        let msgStr = msgs.map(v => `        ${JSON.stringify(v.name)}: ${v.msg}`).join(',\n');

        let fileContent = `
import { ServiceProto } from 'tsrpc-proto';
${importStr}

export interface ServiceType {
    api: {
${apiStr}
    },
    msg: {
${msgStr}
    }
}

export const serviceProto: ServiceProto<ServiceType> = ${JSON.stringify(options.proto, null, 4)};
`.trim();

        await fs.writeFile(options.output, fileContent);
    }
    // JSON
    else {
        await fs.writeFile(options.output, options.ugly ? JSON.stringify(options.proto) : JSON.stringify(options.proto, null, 2));
    }
    console.log(formatStr(i18n.protoSucc, { output: path.resolve(options.output) }).green);
}




// 新
export interface GenerateServiceProtoOptions {
    protocolDir: string,
    newProtoPath: string,
    oldProto?: ServiceProto,
    oldProtoPath?: string,
    ugly?: boolean,
    ignore?: string[] | string,
    verbose?: boolean,
}
/**
 * 生成 ServiceProto，本方法没有日志输出
 * @param options 
 * @returns 
 */
export async function generateServiceProto(options: GenerateServiceProtoOptions) {
    const oldProto = options.oldProto;

    // TODO 移到外边
    // 标准化路径（抹平系统差异）
    const protocolDir = options.protocolDir.replace(/\\/g, '/').replace(/\/+$/, '');
    // 只能填写文件夹 不支持通配符
    if (!(await fs.stat(options.protocolDir)).isDirectory()) {
        throw error(i18n.inputMustBeFolder)
    }

    // 查找所有目标 Ptl 和 Msg 文件，输出标准化的相对路径
    let fileList = glob.sync(protocolDir + '/**/{Ptl,Msg}*.ts', {
        ignore: options.ignore
    }).map(v => path.relative(protocolDir, v).replace(/\\/g, '/'));

    // 临时切换working dir
    // let originalCwd = process.cwd();
    // process.chdir(protocolDir);

    // 生成 types （TSBufferSchema）
    const EXP_DIR_TYPE_NAME = /^(.+\/)?(Ptl|Msg)([^\.\/\\]+)\.ts$/;
    let typeProto = await new TSBufferProtoGenerator({
        verbose: options.verbose,
        baseDir: protocolDir
    }).generate(fileList, {
        compatibleResult: oldProto?.types,
        filter: info => {
            let infoPath = info.path.replace(/\\/g, '/')
            let match = infoPath.match(EXP_DIR_TYPE_NAME);

            if (!match) {
                return false;
            }

            if (match[2] === 'Ptl') {
                return info.name === 'Req' + match[3] || info.name === 'Res' + match[3];
            }
            else {
                return info.name === 'Msg' + match[3];
            }
        }
    });

    // 生成 services
    let services: ServiceDef[] = [];
    for (let filepath of fileList) {
        let match = filepath.match(EXP_DIR_TYPE_NAME)!;
        let typePath = filepath.replace(/^\.\//, '').replace(/\.ts$/, '');

        // 解析conf
        let tsModule = await import(path.resolve(protocolDir, filepath));
        let conf: { [key: string]: any } | undefined = tsModule.conf;

        // Ptl 检测 Req 和 Res 类型齐全
        if (match[2] === 'Ptl') {
            let req = typePath + '/Req' + match[3];
            let res = typePath + '/Res' + match[3];
            if (typeProto[req] && typeProto[res]) {
                services.push({
                    id: services.length,
                    name: (match[1] || '') + match[3],
                    type: 'api',
                    conf: conf
                })
            }
            else {
                !typeProto[res] && console.warn(`[WARN] Missing type 'Res${match[3]}' at: "${filepath}"`.yellow);
                !typeProto[req] && console.warn(`[WARN] Missing type 'Req${match[3]}' at: "${filepath}"`.yellow);
            }
        }
        // Msg 检测Msg类型在
        else {
            let msg = typePath + '/Msg' + match[3];
            if (typeProto[msg]) {
                services.push({
                    id: services.length,
                    name: (match[1] || '') + match[3],
                    type: 'msg',
                    conf: conf
                })
            }
            else {
                console.warn(`Missing type 'Msg${match[3]}' at: ${filepath}`.yellow);
            }
        }
    }

    // 检测可优化的 ID 冗余
    let canOptimizeByNew = false;
    EncodeIdUtil.onGenCanOptimized = () => {
        canOptimizeByNew = true;
    }
    // EncodeID 兼容 OldProto
    let encodeIds = EncodeIdUtil.genEncodeIds(services.map(v => v.type + v.name), oldProto?.services.map(v => ({
        key: v.type + v.name,
        id: v.id
    })));
    for (let item of encodeIds) {
        services.find(v => item.key.startsWith(v.type) && v.name === item.key.substr(v.type.length))!.id = item.id;
    }

    let version: number | undefined = oldProto?.version;
    // 只有在旧 Proto 存在，同时协议内容变化的情况下，才更新版本号
    if (oldProto && JSON.stringify({ types: oldProto.types, services: oldProto.services }) !== JSON.stringify({ types: typeProto, services: services })) {
        version = (oldProto.version || 0) + 1;
    }

    // 创建新 Proto
    let newProto: ServiceProto = {
        version: version,
        services: services,
        types: typeProto
    };
    // process.chdir(originalCwd);

    if (canOptimizeByNew) {
        console.warn(formatStr(i18n.canOptimizeByNew, { filename: path.basename(options.oldProtoPath ?? options.newProtoPath) }) + '\n');
    }

    return {
        newProto: newProto,
        oldProto: oldProto,
        isChanged: newProto.version !== oldProto?.version
    };
}
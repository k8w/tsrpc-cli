import { error } from "console";
import fs from "fs";
import glob from "glob";
import path from "path";
import { EncodeIdUtil, TSBufferProtoGenerator } from 'tsbuffer-proto-generator';
import { ServiceDef, ServiceProto } from "tsrpc-proto";
import ts from "typescript";
import { args } from "..";
import { i18n } from "../i18n/i18n";
import { ProtoUtil } from "../models/ProtoUtil";
import { colorJson, formatStr } from "../models/util";

export async function proto(input?: string, output?: string, compatible?: string, ugly?: boolean, newMode?: boolean, ignore?: string) {
    // 解析输入 默认为当前文件夹
    if (!input) {
        input = '.'
    }
    // 去除尾部的 / 和 \
    input = input.replace(/[\\\/]+$/, '');
    // 只能填写文件夹 不支持通配符
    if (!fs.statSync(input).isDirectory()) {
        throw error(i18n.inputMustBeFolder)
    }

    // compatible 默认同output
    let oldProtoPath = compatible || output;
    let oldProto: ServiceProto | undefined;
    if (!newMode && oldProtoPath) {
        // Parse TS
        if (oldProtoPath.endsWith('.ts')) {
            let content = fs.existsSync(oldProtoPath) && fs.readFileSync(oldProtoPath, 'utf-8');
            if (content) {
                let match = content.match(/[\s\S]*:\s*ServiceProto<ServiceType>\s*=\s*(\{[\s\S]+\});?\s*/);
                if (match) {
                    try {
                        oldProto = JSON.parse(match[1]);
                    }
                    catch (e) {
                        throw error(i18n.compatibleError, { innerError: e.message })
                    }
                }
                else {
                    console.error(`Not invalid proto ts file: ${oldProtoPath}`);
                    throw error(i18n.compatibleError)
                }
            }
        }
        // Parse JSON
        else {
            try {
                oldProto = ProtoUtil.loadServiceProto(oldProtoPath)
                if (!oldProto && compatible) {
                    throw new Error(formatStr(i18n.fileOpenError, { file: path.resolve(oldProtoPath) }));
                }
            }
            catch (e) {
                throw error(i18n.compatibleError, { innerError: e.message })
            }
        }
    }

    let fileList = glob.sync(input + '/**/{Ptl,Msg}*.ts', {
        ignore: ignore
    }).map(v => path.relative(input!, v).replace(/\\/g, '/'));

    // 临时切换working dir
    let originalCwd = process.cwd();
    process.chdir(input);

    let canOptimizeByNew = false;
    EncodeIdUtil.onGenCanOptimized = () => {
        canOptimizeByNew = true;
    }

    let services: ServiceDef[] = [];
    const exp = /^(.*\/)?(Ptl|Msg)([^\.\/\\]+)\.ts$/;
    let typeProto = await new TSBufferProtoGenerator({ verbose: args.verbose }).generate(fileList, {
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
        let src = fs.readFileSync(filepath).toString();
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
                !typeProto[req] && console.warn(`Missing Req: ` + typePath);
                !typeProto[res] && console.warn(`Missing Res: ` + typePath);
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
    let encodeIds = EncodeIdUtil.genEncodeIds(services.map(v => v.type + v.name), oldProto ? oldProto.services.map(v => ({
        key: v.type + v.name,
        id: v.id
    })) : undefined);
    for (let item of encodeIds) {
        services.find(v => item.key.startsWith(v.type) && v.name === item.key.substr(v.type.length))!.id = item.id;
    }

    let proto: ServiceProto = {
        services: services,
        types: typeProto
    };

    if (output) {
        if (canOptimizeByNew) {
            console.warn(i18n.canOptimizeByNew);
        }

        // TS
        if (output.endsWith('.ts')) {
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

            for (let svc of services) {
                let match = svc.name.replace(/\\/g, '/').match(/^(.*\/)*([^\/]+)$/);
                if (!match) {
                    throw new Error(`Invalid svc name: ${svc.name}`);
                }

                let lastName = match[2];
                let importPath = path.relative(path.dirname(path.resolve(originalCwd, output)), (match[1] || '') + (svc.type === 'api' ? 'Ptl' : 'Msg') + lastName).replace(/\\/g, '/');
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
                .map(v => `import { ${v[1].map(w => w.asName ? `${w.srcName} as ${w.asName}` : w.srcName).join(', ')} } from '${v[0]}'`)
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

export const serviceProto: ServiceProto<ServiceType> = ${JSON.stringify(proto, null, 4)};
`.trim();

            process.chdir(originalCwd);
            fs.writeFileSync(output, fileContent);
        }
        // JSON
        else {
            process.chdir(originalCwd);
            fs.writeFileSync(output, ugly ? JSON.stringify(proto) : JSON.stringify(proto, null, 2));
        }
        console.log(formatStr(i18n.protoSucc, { output: path.resolve(output) }).green);
    }
    else {
        console.log(colorJson(proto));
    }
}
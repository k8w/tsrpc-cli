#!/usr/bin/env node

import * as glob from 'glob';
import 'colors';
import minimist from 'minimist';
import { TSBufferProtoGenerator, EncodeIdUtil } from 'tsbuffer-proto-generator';
import * as fs from "fs";
import * as path from "path";
import { TSBufferProto } from 'tsbuffer-schema';
import { i18n } from './i18n/i18n';
import { TSBuffer } from 'tsbuffer';
import { TSRPCServiceProto } from 'tsrpc-ws';
import { ServiceDef, ServiceProto } from 'tsrpc-ws/src/proto/ServiceProto';
require('node-json-color-stringify');

let colorJson = (json: any) => {
    return (JSON as any).colorStringify(json, null, 2) as string;
};

const version = require('./package.json').version;
const args = minimist(process.argv);
let verbose: boolean | undefined = args.verbose || args.v;

// 进入主流程
main();

async function main() {
    // Version
    if (args._.length === 2 && (args.version || args.v)) {
        console.log('TSBuffer ' + version);
    }
    // Help
    else if (args.h || args.help) {
        showHelp();
    }
    // Proto
    else if (args._[2] === 'proto') {
        await proto(args.input || args.i, args.output || args.o, args.compatible || args.c, args.ugly || args.u, args.new || args.n);
    }
    // Encode
    else if (args._[2] === 'encode') {
        encode(args.input || args.i, args._[3], args.output || args.o, args.proto || args.p, args.schema || args.s);
    }
    // Decode
    else if (args._[2] === 'decode') {
        decode(args.proto || args.p, args.schema || args.s, args.input || args.i, args._[3], args.output || args.o);
    }
    // Validate
    else if (args._[2] === 'validate') {
        validate(args.proto || args.p, args.schema || args.s, args.input || args.i, args._[3]);
    }
    // Show
    else if (args._[2] === 'show') {
        showBin();
    }
    // Error
    // No Command
    else if (args._.length === 2) {
        showLogo();
        console.log(formatStr(i18n.welcome, { version: version }).green);
        console.log('\n' + i18n.example);
        console.log('\n' + i18n.helpGuide.yellow);
    }
    else {
        error(i18n.errCmd);
    }

    process.exit(0);
}

function showLogo() {
    console.log(`                                                   
88888888888 .d8888b.  8888888b.  8888888b.   .d8888b.  
    888    d88P  Y88b 888   Y88b 888   Y88b d88P  Y88b 
    888    Y88b.      888    888 888    888 888    888 
    888     "Y888b.   888   d88P 888   d88P 888        
    888        "Y88b. 8888888P"  8888888P"  888        
    888          "888 888 T88b   888        888    888 
    888    Y88b  d88P 888  T88b  888        Y88b  d88P 
    888     "Y8888P"  888   T88b 888         "Y8888P"  
------------------------------------------------------------------------
`.green);
}

function showHelp() {
    showLogo();
    console.log(formatStr(i18n.welcome, { version: version }).green);
    console.log('\n' + i18n.help);
    console.log('\n' + i18n.example);
}

async function proto(input?: string, output?: string, compatible?: string, ugly?: boolean, newMode?: boolean) {
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

    // 临时切换working dir
    let originalCwd = process.cwd();
    process.chdir(input);

    const exp = /^(.*\/)?(Ptl|Msg)([^\.\/\\]+)\.ts$/;
    let fileList = glob.sync('**/*.ts').filter(v => exp.test(v))

    // compatible 默认同output
    let oldProtoPath = compatible || output;
    let oldProto: TSRPCServiceProto | undefined;
    if (!newMode && oldProtoPath) {
        try {
            oldProto = loadServiceProto(oldProtoPath)
            if (!oldProto && compatible) {
                throw new Error(formatStr(i18n.fileOpenError, { file: path.resolve(oldProtoPath) }));
            }
        }
        catch (e) {
            throw error(i18n.compatibleError, { innerError: e.message })
        }
    }

    let services: ServiceDef[] = [];

    let typeProto = await new TSBufferProtoGenerator({ verbose: verbose }).generate(fileList, {
        compatibleResult: oldProto ? oldProto.types : undefined,
        filter: info => {
            let infoPath = info.path.replace(/\\/g, '/')
            let match = infoPath.match(exp);

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

        // Ptl 检测 Req 和 Res 类型齐全
        if (match[2] === 'Ptl') {
            let req = typePath + '/Req' + match[3];
            let res = typePath + '/Res' + match[3];
            if (typeProto[req] && typeProto[res]) {
                services.push({
                    id: services.length,
                    name: (match[1] || '') + match[3],
                    type: 'api',
                    req: req,
                    res: res
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
                    msg: msg
                })
            }
            else {
                console.warn(`Missing Msg: ` + typePath);
            }
        }
    }

    // EncodeID 兼容OldProto
    let encodeIds = EncodeIdUtil.genEncodeIds(services.map(v => v.name), oldProto ? oldProto.services.map(v => ({
        key: v.name,
        id: v.id
    })) : undefined);
    for (let item of encodeIds) {
        services.find(v => v.name === item.key)!.id = item.id;
    }

    let proto: ServiceProto = {
        services: services,
        types: typeProto
    };

    if (output) {
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
            let reqStr = apis.map(v => `        ${JSON.stringify(v.name)}: ${v.req}`).join(',\n');
            let resStr = apis.map(v => `        ${JSON.stringify(v.name)}: ${v.res}`).join(',\n');
            let msgStr = msgs.map(v => `        ${JSON.stringify(v.name)}: ${v.msg}`).join(',\n')

            let fileContent = `
import { TSRPCServiceProto } from 'tsrpc';
${importStr}

export interface ServiceType {
    req: {
${reqStr}
    },
    res: {
${resStr}
    },
    msg: {
${msgStr}        
    }
}

export const serviceProto: TSRPCServiceProto = ${JSON.stringify(proto, null, 4)};
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

function loadServiceProto(filepath: string) {
    let proto: TSRPCServiceProto;
    // 打开OldFile
    let fileContent: string;
    try {
        fileContent = fs.readFileSync(filepath).toString();
    }
    catch{
        return undefined;
    }

    try {
        if (filepath.endsWith('.ts')) {
            let match = fileContent.match(/export const serviceProto: TSRPCServiceProto = (\{[\s\S]+\});/);
            if (match) {
                proto = JSON.parse(match[1]);
            }
            else {
                throw new Error(formatStr(i18n.protoParsedError, { file: path.resolve(filepath) }));
            }
        }
        else {
            proto = {
                services: [],
                types: JSON.parse(fileContent)
            };
        }
    }
    catch{
        throw new Error(formatStr(i18n.protoParsedError, { file: path.resolve(filepath) }));
    }

    return proto;
}

function encode(input?: string, exp?: string, output?: string, proto?: string, schemaId?: string) {
    let parsedProto = parseProtoAndSchema(proto, schemaId);

    // #region 解析Input Value
    let inputValue: any;
    if (input) {
        let fileContent: string;
        try {
            fileContent = fs.readFileSync(input).toString();
        }
        catch{
            throw error(i18n.fileOpenError, { file: path.resolve(input) })
        }
        try {
            inputValue = eval(fileContent);
        }
        catch{
            throw error(i18n.jsParsedError, { file: path.resolve(input) });
        }
    }
    else if (exp) {
        try {
            inputValue = eval(`()=>(${exp})`)();
        }
        catch (e) {
            if (verbose) {
                console.log('exp', exp);
                console.error(e);
            }
            throw error(i18n.expParsedError);
        }
    }
    else {
        throw error(i18n.missingParam, { param: `--input ${i18n.or} [expression]` });
    }
    // #endregion

    try {
        verbose && console.log('inputValue', inputValue);
        let buffer = new TSBuffer(parsedProto.proto).encode(inputValue, parsedProto.schemaId);
        console.log('编码长度：' + buffer.byteLength);
        if (output) {
            fs.writeFileSync(output, buffer);
            console.log(formatStr(i18n.encodeSucc, { output: path.resolve(output) }).green);
        }
        else {
            console.log(buf2Hex(buffer).yellow);
        }
    }
    catch (e) {
        throw error('编码失败。\n    ' + e.message)
    }
}

function decode(protoPath?: string, schemaId?: string, input?: string, binStr?: string, output?: string) {
    let parsedProto = parseProtoAndSchema(protoPath, schemaId);
    let inputBuf: Buffer;

    if (input) {
        try {
            inputBuf = fs.readFileSync(input);
        }
        catch (e) {
            verbose && console.error(e);
            throw error(i18n.fileOpenError, { file: path.resolve(input) })
        }
    }
    else if (binStr) {
        inputBuf = hex2Bin(binStr);
    }
    else {
        throw error(i18n.missingParam, { param: `--input ${i18n.or} [binstr]` });
    }

    let decodedValue: any;
    try {
        decodedValue = new TSBuffer(parsedProto.proto).decode(new Uint8Array(inputBuf), parsedProto.schemaId);
    }
    catch (e) {
        throw error('解码失败:\n    ' + e.message)
    }

    if (output) {
        fs.writeFileSync(output, JSON.stringify(decodedValue, null, 2));
        console.log(formatStr(i18n.decodeSucc, { output: output }).green)
    }
    else {
        console.log(colorJson(decodedValue))
    }
}

function validate(proto?: string, schemaId?: string, input?: string, expression?: string) {
    let parsedProto = parseProtoAndSchema(proto, schemaId);

    // #region 解析Input Value
    let inputValue: any;
    if (input) {
        let fileContent: string;
        try {
            fileContent = fs.readFileSync(input).toString();
        }
        catch{
            throw error(i18n.fileOpenError, { file: path.resolve(input) })
        }
        try {
            inputValue = eval(fileContent);
        }
        catch{
            throw error(i18n.jsParsedError, { file: path.resolve(input) });
        }
    }
    else if (expression) {
        try {
            inputValue = eval(`()=>(${expression})`)();
        }
        catch (e) {
            if (verbose) {
                console.log('exp', expression);
                console.error(e);
            }
            throw error(i18n.expParsedError);
        }
    }
    else {
        throw error(i18n.missingParam, { param: `--input ${i18n.or} [expression]` });
    }
    // #endregion

    let vRes = new TSBuffer(parsedProto.proto).validate(inputValue, parsedProto.schemaId);
    if (vRes.isSucc) {
        console.log(i18n.validateSucc.green)
    }
    else {
        let oriErr = vRes.originalError;
        error(i18n.validateFail, { msg: vRes.originalError.message })
    }
}

function error(str: string, data?: { [key: string]: string }) {
    if (data) {
        str = formatStr(str, data);
    }
    console.error(i18n.error.bgRed.white, str.red);
    process.exit(-1);
    return new Error();
}

function formatStr(str: string, data: { [key: string]: string }) {
    for (let key in data) {
        while (str.indexOf(key) > -1) {
            str = str.replace(`\${${key}}`, data[key]);
        }
    }
    return str;
}

function buf2Hex(buf: Uint8Array): string {
    let arr: string[] = [];
    buf.forEach(v => {
        let char = v.toString(16).toUpperCase();
        if (char.length === 1) {
            char = '0' + char;
        }
        arr.push(char)
    });
    return arr.join(' ');
}

function hex2Bin(hexStr: string): Buffer {
    return Buffer.from(new Uint8Array(
        hexStr.trim().split(/\s+/).map(v => parseInt('0x' + v))
    ))
}

function showBin() {
    if (args._.length < 4) {
        throw error(i18n.missingParam, { param: '<file>' });
    }
    let buf: Uint8Array;
    try {
        buf = new Uint8Array(fs.readFileSync(args._[3]));
        console.log('编码长度：' + buf.byteLength)
    }
    catch (e) {
        verbose && console.error(e);
        throw error(i18n.fileOpenError, { file: path.resolve(args._[3]) })
    }
    console.log(buf2Hex(buf).yellow);
}

function parseProtoAndSchema(proto: string | undefined, schemaId: string | undefined) {
    // #region 解析Proto
    if (!proto) {
        error(i18n.missingParam, { param: '--proto' });
        throw new Error()
    }
    if (!schemaId) {
        error(i18n.missingParam, { param: '--schema' });
        throw new Error()
    }
    let serviceProto: ServiceProto | undefined;
    try {
        serviceProto = loadServiceProto(proto);
    }
    catch (e) {
        throw error(e.message);
    }

    if (!serviceProto) {
        throw error(i18n.fileOpenError, { file: path.resolve(proto) });
    }

    return { proto: serviceProto.types, schemaId: schemaId };
    // #endregion
}
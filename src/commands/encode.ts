import { error } from "console";
import { TSBuffer } from "tsbuffer";
import { args } from "..";
import { i18n } from "../i18n/i18n";
import { ProtoUtil } from "../models/ProtoUtil";
import { formatStr, buf2Hex } from "../models/util";
import fs from "fs";
import path from "path";

export function encode(input?: string, exp?: string, output?: string, proto?: string, schemaId?: string) {
    let parsedProto = ProtoUtil.parseProtoAndSchema(proto, schemaId);

    // #region 解析Input Value
    let inputValue: any;
    if (input) {
        let fileContent: string;
        try {
            fileContent = fs.readFileSync(input).toString();
        }
        catch {
            throw error(i18n.fileOpenError, { file: path.resolve(input) })
        }
        try {
            inputValue = eval(fileContent);
        }
        catch {
            throw error(i18n.jsParsedError, { file: path.resolve(input) });
        }
    }
    else if (exp) {
        try {
            inputValue = eval(`()=>(${exp})`)();
        }
        catch (e) {
            if (args.verbose) {
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

    args.verbose && console.log('inputValue', inputValue);
    let opEncode = new TSBuffer(parsedProto.proto).encode(inputValue, parsedProto.schemaId);
    if (!opEncode.isSucc) {
        throw error('编码失败。\n    ' + opEncode.errMsg)
    }
    console.log('编码长度：' + opEncode.buf.byteLength);
    if (output) {
        fs.writeFileSync(output, opEncode.buf);
        console.log(formatStr(i18n.encodeSucc, { output: path.resolve(output) }).green);
    }
    else {
        console.log(buf2Hex(opEncode.buf).yellow);
    }
}
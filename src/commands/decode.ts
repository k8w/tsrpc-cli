import { error } from "console";
import { TSBuffer } from "tsbuffer";
import { args } from "..";
import { i18n } from "../i18n/i18n";
import { formatStr, colorJson, hex2Bin } from "../models/util";
import fs from "fs";
import { ProtoUtil } from "../models/ProtoUtil";
import path from "path";

export function decode(protoPath?: string, schemaId?: string, input?: string, binStr?: string, output?: string) {
    let parsedProto = ProtoUtil.parseProtoAndSchema(protoPath, schemaId);
    let inputBuf: Buffer;

    if (input) {
        try {
            inputBuf = fs.readFileSync(input);
        }
        catch (e) {
            args.verbose && console.error(e);
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
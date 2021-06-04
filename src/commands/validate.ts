import { i18n } from "../i18n/i18n";
import { ProtoUtil } from "../models/ProtoUtil";
import { error } from "../models/util";
import fs from "fs";
import path from "path";
import { args } from "..";
import { TSBuffer } from "tsbuffer";

export function validate(proto?: string, schemaId?: string, input?: string, expression?: string) {
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
    else if (expression) {
        try {
            inputValue = eval(`()=>(${expression})`)();
        }
        catch (e) {
            if (args.verbose) {
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
        throw error(i18n.validateFail, { msg: vRes.errMsg })
    }
}
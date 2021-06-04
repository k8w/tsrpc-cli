import { error } from "console";
import { args } from "..";
import { i18n } from "../i18n/i18n";
import path from "path";
import fs from "fs";
import { buf2Hex } from "../models/util";


export function showBin() {
    if (args._.length < 2) {
        throw error(i18n.missingParam, { param: '<file>' });
    }
    let buf: Uint8Array;
    try {
        buf = new Uint8Array(fs.readFileSync(args._[1]));
        console.log('编码长度：' + buf.byteLength)
    }
    catch (e) {
        args.verbose && console.error(e);
        throw error(i18n.fileOpenError, { file: path.resolve(args._[1]) })
    }
    console.log(buf2Hex(buf).yellow);
}
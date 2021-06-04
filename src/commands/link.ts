import fs from "fs";
import path from "path";
import { i18n } from "../i18n/i18n";
import { error } from "../models/util";

export interface CmdLinkOptions {
    from: string | undefined,
    to: string | undefined,
    verbose: boolean | undefined
}

export function cmdLink(options: CmdLinkOptions) {
    // Validate options
    if (!options.from) {
        throw error(i18n.missingParam, { param: 'from' });
    }
    if (!options.to) {
        throw error(i18n.missingParam, { param: 'to' });
    }
    if (!fs.existsSync(options.from)) {
        throw error(i18n.dirNotExists, { dir: path.resolve(options.from) })
    }

    if (!fs.existsSync(path.join(options.to, '../'))) {
        let dir = path.resolve(options.to, '../');
        fs.mkdirSync(dir, { recursive: true });
        options.verbose && console.log('mkdir: ' + dir);
    }
    if (fs.existsSync(options.to)) {
        let stat = fs.statSync(options.to);
        if (!stat.isSymbolicLink() && stat.isDirectory()) {
            throw error(i18n.dirAtLinkDest)
        }
        fs.rmSync(options.to, { force: true });
    }

    let target = path.relative(path.dirname(options.to), options.from);
    options.verbose && console.log(`path: ${path.resolve(options.to)}, target: ${target}`)
    fs.symlinkSync(target, options.to, 'junction');
    console.log(i18n.success.bgGreen.white);
}
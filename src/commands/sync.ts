import fs from "fs-extra";
import path from "path";
import { i18n } from "../i18n/i18n";
import { CliUtil } from "../models/CliUtil";
import { error } from "../models/util";

export interface CmdSyncOptions {
    from: string | undefined,
    to: string | undefined,
    verbose: boolean | undefined
}

export function cmdSync(options: CmdSyncOptions) {
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

    CliUtil.doing(`Syncing from "${path.resolve(options.from)}" to "${path.resolve(options.to)}"`);
    // Clear
    fs.removeSync(options.to);
    // Copy
    copyDirReadonly(options.from, options.to);
    CliUtil.done(true, 'Synced successfully')
}

function copyDirReadonly(src: string, dest: string, verbose?: boolean) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true })
    }

    let dir = fs.readdirSync(src);
    dir.forEach(v => {
        let srcPath = path.join(src, v);
        let destPath = path.join(dest, v);
        let stat = fs.statSync(srcPath);

        if (stat.isFile()) {
            fs.copyFileSync(srcPath, destPath);
            fs.chmodSync(destPath, 0o444);
            verbose && console.log(path.resolve(destPath).green);
        }
        else if (stat.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            verbose && console.log(path.resolve(destPath).green);
            copyDirReadonly(srcPath, destPath, verbose);
        }
        else {
            verbose && console.log(`Ignored: "${srcPath}"`.yellow);
        }
    })
}
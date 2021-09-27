import chalk from "chalk";
import fs from "fs-extra";
import { glob } from "glob";
import path from "path";
import { Logger } from "tsrpc-proto";
import { i18n } from "../i18n/i18n";
import { CliUtil } from "../models/CliUtil";
import { TsrpcConfig } from "../models/TsrpcConfig";
import { error } from "../models/util";
import { ensureSymlink } from "./link";

export type CmdSyncOptions = {
    from: string | undefined,
    to: string | undefined,
    verbose: boolean | undefined,
    config: undefined
} | { config: TsrpcConfig }

export async function cmdSync(options: CmdSyncOptions) {
    if (options.config) {
        if (!options.config.sync?.length) {
            console.log(chalk.yellow(i18n.nothingSyncConf));
            return;
        }

        const logger = options.config.verbose ? console : undefined;
        for (let item of options.config.sync) {
            await syncByConfigItem(item, logger);
        }

        console.log(chalk.green(i18n.allSyncedSucc))
    }
    else {
        // Validate options
        if (!options.from) {
            throw error(i18n.missingParam, { param: 'from' });
        }
        if (!options.to) {
            throw error(i18n.missingParam, { param: 'to' });
        }
        if (await fs.access(options.from).catch(() => true)) {
            throw error(i18n.dirNotExists, { dir: path.resolve(options.from) })
        }

        CliUtil.doing(`${i18n.copy} '${path.resolve(options.from)}' -> '${path.resolve(options.to)}'`);
        await copyDirReadonly(options.from, options.to, options.verbose ? console : undefined);
        CliUtil.done(true);
        console.log(chalk.green(i18n.syncedSucc))
    }
}

export async function copyDirReadonly(src: string, dst: string, logger?: Logger) {
    // Clean
    logger?.debug(`Start to clean '${dst}'`)
    await fs.remove(dst);
    await fs.ensureDir(dst);
    logger?.debug(`Cleaned succ`)

    // Copy
    logger?.debug(`Start to copy '${src}' to '${dst}'`)
    await fs.copy(src, dst);
    logger?.debug('Copyed succ');

    // Readonly (chmod 0o444)
    setReadonlyRecursive(dst, logger);
}

export async function setReadonlyRecursive(dst: string, logger?: Logger) {
    logger?.debug(`Start to setReadonlyRecursive to '${dst}'`)
    let items = await new Promise<string[]>((rs, rj) => {
        glob(path.resolve(dst, '**'), (err, matches) => {
            err ? rj() : rs(matches);
        })
    })

    for (let item of items) {
        let stat = fs.statSync(item);

        if (stat.isFile()) {
            await fs.chmod(item, 0o444);
            logger?.log(chalk.green('chmod 444: ' + item));
        }
    }

    logger?.debug('setReadonlyRecursive succ');
}

export async function syncByConfigItem(confItem: NonNullable<TsrpcConfig['sync']>[0], logger: Logger | undefined) {
    if (confItem.type === 'copy') {
        CliUtil.doing(`${i18n.copy} "${confItem.from}" -> "${confItem.to}"`);
        await copyDirReadonly(confItem.from, confItem.to, logger);
    }
    else if (confItem.type === 'symlink') {
        CliUtil.doing(`${i18n.link} "${confItem.from}" -> "${confItem.to}"`);
        await ensureSymlink(confItem.from, confItem.to, logger);
    }
    CliUtil.done(true);
}
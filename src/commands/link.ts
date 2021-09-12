import chalk from "chalk";
import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { Logger } from "tsrpc-proto";
import { i18n } from "../i18n/i18n";
import { CliUtil } from "../models/CliUtil";
import { TsrpcConfig } from "../models/TsrpcConfig";
import { error, formatStr } from "../models/util";

export type CmdLinkOptions = {
    from: string | undefined,
    to: string | undefined,
    verbose: boolean | undefined,
    config: undefined
} | {
    config: TsrpcConfig
}

export async function cmdLink(options: CmdLinkOptions) {
    if (options.config) {
        if (!options.config.sync?.length) {
            console.log(chalk.yellow(i18n.nothingSyncConf));
            return;
        }

        let linkConfs = options.config.sync.filter(v => v.type === 'symlink');
        for (let item of linkConfs) {
            CliUtil.doing(`${i18n.link} ${item.from} -> ${item.to}`);
            await ensureSymlink(item.from, item.to, options.config.verbose ? console : undefined);
            CliUtil.done(true);
        }

        console.log(chalk.green(i18n.allLinkedSucc))
    }
    else {
        // Validate options
        if (!options.from) {
            throw error(i18n.missingParam, { param: 'from' });
        }
        if (!options.to) {
            throw error(i18n.missingParam, { param: 'to' });
        }

        CliUtil.doing(`${i18n.link} '${path.resolve(options.from)}' -> '${path.resolve(options.to)}'`);
        await ensureSymlink(options.from, options.to, options.verbose ? console : undefined);
        CliUtil.done(true);
        console.log(chalk.green(i18n.linkedSucc));
    }
}

export async function ensureSymlink(src: string, dst: string, logger?: Logger) {
    await fs.ensureDir(src);

    let err = await fs.ensureSymlink(src, dst, 'junction').catch(e => e);

    // 创建失败（文件已存在），提示删除 然后重试
    if (err?.code === 'EEXIST') {
        let isSpining = CliUtil.spinner.isSpinning;
        isSpining && CliUtil.spinner.stop();
        if ((await inquirer.prompt({
            type: 'confirm',
            message: chalk.yellow(formatStr(i18n.deleteConfirm, { target: path.resolve(dst) })),
            name: 'res'
        })).res) {
            await fs.remove(dst);
        }
        else {
            throw new Error(i18n.canceled);
        }

        // 重试
        isSpining && CliUtil.spinner.start();
        err = await fs.ensureSymlink(src, dst, 'junction').catch(e => e);
    }

    // Fail
    if (err) {
        throw err;
    }

    // Success
    return;
}
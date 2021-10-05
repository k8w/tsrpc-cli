import chalk from "chalk";
import 'k8w-extend-native';
import minimist from 'minimist';
import 'node-json-color-stringify';
import { cmdApi } from './commands/api';
import { cmdBuild } from './commands/build';
import { cmdDecode } from './commands/decode';
import { cmdDev } from "./commands/dev";
import { cmdEncode } from './commands/encode';
import { cmdLink } from './commands/link';
import { cmdProto } from './commands/proto';
import { cmdShowBin } from './commands/showBin';
import { cmdShowHelp } from './commands/showHelp';
import { cmdSync } from './commands/sync';
import { cmdValidate } from './commands/validate';
import { i18n } from './i18n/i18n';
import { CliUtil } from './models/CliUtil';
import { importTsrpcConfig } from "./models/importTS";
import { TsrpcConfig } from './models/TsrpcConfig';
import { error, formatStr, showLogo } from './models/util';

const args = minimist(process.argv.slice(2));

// 进入主流程
main().catch((e: Error) => {
    CliUtil.done(false);
    if (args.verbose) {
        console.error('\n' + chalk.bgRed.white(i18n.error), e);
    }
    else {
        console.error('\n' + chalk.bgRed.white(i18n.error), chalk.red(e?.message ?? e));
    }
    process.exit(-1);
});

async function main() {
    let conf: TsrpcConfig | undefined;
    if (args.config) {
        conf = importTsrpcConfig(args.config);
    }

    if (conf?.cwd) {
        process.chdir(conf.cwd);
    }

    // Version
    if (args._.length === 0 && (args.version || args.v)) {
        console.log('__TSRPC_CLI_VERSION__');
    }
    // Help
    else if (args.h || args.help) {
        cmdShowHelp();
    }
    // Proto
    else if (args._[0] === 'proto') {
        await cmdProto({
            input: args.input ?? args.i,
            output: args.output ?? args.o,
            compatible: args.compatible ?? args.c,
            ugly: args.ugly,
            new: args.new,
            ignore: args.ignore,
            verbose: args.verbose,
            config: conf
        });
    }
    // Api
    else if (args._[0] === 'api') {
        await cmdApi({
            input: args.input ?? args.i,
            output: args.output ?? args.o,
            config: conf
        });
    }
    // Encode
    else if (args._[0] === 'encode') {
        cmdEncode({
            exp: args._[1],
            input: args.input ?? args.i,
            output: args.output ?? args.o,
            proto: args.proto ?? args.p,
            schemaId: args.schema ?? args.s,
            verbose: args.verbose
        });
    }
    // Decode
    else if (args._[0] === 'decode') {
        cmdDecode({
            protoPath: args.proto ?? args.p,
            schemaId: args.schema ?? args.s,
            binStr: args._[1],
            input: args.input ?? args.i,
            output: args.output ?? args.o,
            verbose: args.verbose
        });
    }
    // Validate
    else if (args._[0] === 'validate') {
        cmdValidate({
            proto: args.proto ?? args.p,
            schemaId: args.schema ?? args.s,
            input: args.input ?? args.i,
            expression: args._[1],
            verbose: args.verbose
        });
    }
    // Show
    else if (args._[0] === 'show') {
        if (!args._[1]) {
            throw error(i18n.missingParam, { param: '<file>' });
        }
        cmdShowBin({
            file: args._[1],
            verbose: args.verbose
        });
    }
    // Sync
    else if (args._[0] === 'sync') {
        await cmdSync({
            from: args.from,
            to: args.to,
            verbose: args.verbose,
            config: conf
        })
    }
    // Dev
    else if (args._[0] === 'dev') {
        if (!conf) {
            throw error(i18n.missingParam, { param: 'config' })
        }
        if (!conf.dev) {
            throw new Error(i18n.missingConfigItem('dev'))
        }
        cmdDev({ config: conf });
        return;
    }
    // Build
    else if (args._[0] === 'build') {
        await cmdBuild({
            config: conf
        })
    }
    // Link
    else if (args._[0] === 'link') {
        await cmdLink({
            from: args.from,
            to: args.to,
            verbose: args.verbose,
            config: conf
        })
    }
    // Error
    // No Command
    else if (args._.length === 0) {
        showLogo();
        console.log(chalk.green(formatStr(i18n.welcome, { version: '__TSRPC_CLI_VERSION__' })));
        console.log('\n' + i18n.example);
        console.log('\n' + chalk.yellow(i18n.helpGuide));
    }
    else {
        throw error(i18n.errCmd);
    }

    CliUtil.done(true);
    process.exit(0);
}

// process.on('uncaughtException', e => {
//     console.error('uncaughtException', e)
// })

// process.on('unhandledRejection', e => {
//     console.error('unhandledRejection', e)
// })

export { TsrpcConfig };

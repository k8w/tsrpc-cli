import 'colors';
import fs from "fs";
import minimist from 'minimist';
import 'node-json-color-stringify';
import path from "path";
import 'ts-node/register';
import { cmdApi } from './commands/api';
import { cmdBuild } from './commands/build';
import { cmdDecode } from './commands/decode';
import { cmdEncode } from './commands/encode';
import { cmdLink } from './commands/link';
import { cmdProto } from './commands/proto';
import { cmdShowBin } from './commands/showBin';
import { cmdShowHelp } from './commands/showHelp';
import { cmdSync } from './commands/sync';
import { cmdValidate } from './commands/validate';
import { i18n } from './i18n/i18n';
import { CliUtil } from './models/CliUtil';
import { TsrpcConfig } from './models/TsrpcConfig';
import { error, formatStr, showLogo } from './models/util';

const args = minimist(process.argv.slice(2));

// 进入主流程
main().catch((e: Error) => {
    CliUtil.done(false);
    if (args.verbose) {
        console.error('\n' + i18n.error.bgRed.white, e);
    }
    else {
        e?.message && console.error('\n' + i18n.error.bgRed.white, e.message.red);
    }
    process.exit(-1);
});

async function main() {
    let conf: TsrpcConfig | undefined;
    if (args.config) {
        let confPath = path.resolve(args.config);
        if (!await fs.existsSync(confPath)) {
            throw error(i18n.confNotExists, { path: confPath })
        }
        conf = await import(confPath).then(v => v.default as TsrpcConfig).catch(e => undefined);
        if (!conf) {
            throw error(i18n.confInvalid, { path: confPath })
        }
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
            verbose: args.verbose
        });
    }
    // Api
    else if (args._[0] === 'api') {
        await cmdApi({
            input: args.input ?? args.i,
            output: args.output ?? args.o
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
        cmdSync({
            from: args.from,
            to: args.to,
            verbose: args.verbose
        })
    }
    // Build
    else if (args._[0] === 'build') {
        await cmdBuild({
            protoDir: args['proto-dir'],
            protoFile: args.proto
        })
    }
    // Link
    else if (args._[0] === 'link') {
        await cmdLink({
            from: args.from,
            to: args.to,
            verbose: args.verbose
        })
    }
    // Error
    // No Command
    else if (args._.length === 0) {
        showLogo();
        console.log(formatStr(i18n.welcome, { version: '__TSRPC_CLI_VERSION__' }).green);
        console.log('\n' + i18n.example);
        console.log('\n' + i18n.helpGuide.yellow);
    }
    else {
        throw error(i18n.errCmd);
    }

    CliUtil.done(true);
    process.exit(0);
}
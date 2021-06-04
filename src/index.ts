import 'colors';
import minimist from 'minimist';
import 'node-json-color-stringify';
import { api } from './commands/api';
import { decode } from './commands/decode';
import { encode } from './commands/encode';
import { proto } from './commands/proto';
import { showBin } from './commands/showBin';
import { showHelp } from './commands/showHelp';
import { validate } from './commands/validate';
import { i18n } from './i18n/i18n';
import { error, formatStr, showLogo } from './models/util';

const args = minimist(process.argv.slice(2));

// 进入主流程
main().catch((e: Error) => {
    console.error(i18n.error.bgRed.white, e.message.red);
    process.exit(-1);
});

async function main() {
    // Version
    if (args._.length === 0 && (args.version || args.v)) {
        console.log('__TSRPC_CLI_VERSION__');
    }
    // Help
    else if (args.h || args.help) {
        showHelp();
    }
    // Proto
    else if (args._[0] === 'proto') {
        await proto({
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
        await api({
            input: args.input ?? args.i,
            output: args.output ?? args.o
        });
    }
    // Encode
    else if (args._[0] === 'encode') {
        encode({
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
        decode({
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
        validate({
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
        showBin({
            file: args._[1],
            verbose: args.verbose
        });
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

    process.exit(0);
}
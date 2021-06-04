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

export const args = minimist(process.argv.slice(2));

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
        await proto(args.input || args.i, args.output || args.o, args.compatible || args.c, args.ugly || args.u, args.new, args.ignore);
    }
    // Api
    else if (args._[0] === 'api') {
        await api(args.input || args.i, args.output || args.o);
    }
    // Encode
    else if (args._[0] === 'encode') {
        encode(args.input || args.i, args._[1], args.output || args.o, args.proto || args.p, args.schema || args.s);
    }
    // Decode
    else if (args._[0] === 'decode') {
        decode(args.proto || args.p, args.schema || args.s, args.input || args.i, args._[1], args.output || args.o);
    }
    // Validate
    else if (args._[0] === 'validate') {
        validate(args.proto || args.p, args.schema || args.s, args.input || args.i, args._[1]);
    }
    // Show
    else if (args._[0] === 'show') {
        showBin();
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
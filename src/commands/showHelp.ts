import { i18n } from "../i18n/i18n";
import { formatStr, showLogo } from "../models/util";

export function showHelp() {
    showLogo();
    console.log(formatStr(i18n.welcome, { version: '__TSRPC_CLI_VERSION__' }).green);
    console.log('\n' + i18n.help);
    console.log('\n' + i18n.example);
}
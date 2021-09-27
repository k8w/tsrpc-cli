import fs from "fs";
import path from "path";
import 'ts-node/register';
import { i18n } from "../i18n/i18n";
import { TsrpcConfig } from "./TsrpcConfig";
import { error } from "./util";

const watchingFiles: {
    [path: string]: 1
} = {};
/**
 * 引入 TS 模块，但不缓存
 */
export function importTS(modulePath: string): { [key: string]: any } {
    modulePath = path.resolve(modulePath);

    if (!fs.existsSync(modulePath)) {
        throw error(i18n.fileNotExists, { file: modulePath })
    }

    let module = require(modulePath);
    delete require.cache[modulePath]
    return module;
}

export function importTsrpcConfig(modulePath: string): TsrpcConfig {
    let module = importTS(modulePath);
    let conf = module['default'] ?? module['conf'] ?? module['config'];
    if (!conf) {
        throw error(i18n.confInvalid, { path: path.resolve(modulePath) })
    }
    return conf;
}
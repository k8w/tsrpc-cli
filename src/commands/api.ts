import chalk from "chalk";
import { error } from "console";
import fs from "fs-extra";
import path from "path";
import { ApiServiceDef, Logger, ServiceProto } from "tsrpc-proto";
import { i18n } from "../i18n/i18n";
import { ProtoUtil } from "../models/ProtoUtil";
import { TsrpcConfig } from "../models/TsrpcConfig";
import { formatStr } from "../models/util";

export type CmdApiOptions = {
    input: string | undefined,
    output: string | undefined,
    config?: undefined
} | { config: TsrpcConfig }

export async function cmdApi(options: CmdApiOptions) {
    if (options.config) {
        if (!options.config.proto) {
            throw new Error(i18n.missingConfigItem('proto'))
        }

        let newCount = 0;
        for (let conf of options.config.proto) {
            if (!conf.apiDir) {
                continue;
            }
            let proto = await ProtoUtil.loadServiceProto(conf.output, options.config.verbose ? console : undefined);
            if (!proto) {
                console.warn(chalk.yellow(formatStr(i18n.protoParsedError, { file: path.resolve(conf.output) })))
                continue;
            }

            let res = await genApiFiles({
                proto: proto,
                ptlDir: conf.ptlDir,
                apiDir: conf.apiDir
            }, console);

            newCount += res.length;
        }

        console.log(chalk.green(formatStr(i18n.allApiSucc, { newCount: '' + newCount })))
    }
    else {
        if (!options.input) {
            throw error(i18n.missingParam, { param: 'input' });
        }
        if (!options.output) {
            throw error(i18n.missingParam, { param: 'output' });
        }

        let proto = await ProtoUtil.loadServiceProto(options.input);
        if (!proto) {
            throw error(i18n.protoParsedError, { file: options.input });
        }

        let res = await genApiFiles({
            proto: proto,
            ptlDir: path.dirname(options.input),
            apiDir: options.output
        }, console);

        console.log(chalk.green(formatStr(i18n.allApiSucc, { newCount: '' + res.length })))
    }
}

export async function genApiFiles(options: {
    proto: ServiceProto<any>,
    ptlDir: string,
    apiDir: string,
}, logger?: Logger) {
    let apis = options.proto.services.filter(v => v.type === 'api') as ApiServiceDef[];
    let generatedFiles: { apiPath: string, apiName: string }[] = [];
    for (let api of apis) {
        let apiName = api.name.match(/\w+$/)![0];
        /** a/b/c/Test  apiName='Test' apiNamePath='a/b/c/' */
        let apiNamePath = api.name.substr(0, api.name.length - apiName.length);
        /** API src files dir */
        let apiDir = path.join(options.apiDir, apiNamePath);
        /** API src .ts file pathname */
        let apiPath = path.join(apiDir, `Api${apiName}.ts`);
        /** Ptl src files dir */
        let ptlDir = path.join(options.ptlDir, apiNamePath);
        /** Files exists already, skip */
        if (!await fs.access(apiPath).catch(() => true)) {
            continue;
        }
        await fs.ensureDir(apiDir);
        await fs.writeFile(apiPath, `
import { ApiCall } from "tsrpc";
import { Req${apiName}, Res${apiName} } from "${path.relative(apiDir, ptlDir).replace(/\\/g, '/')}/Ptl${apiName}";

export async function Api${apiName}(call: ApiCall<Req${apiName}, Res${apiName}>) {
    // TODO
    call.error('API Not Implemented');
}        
        `.trim(), { encoding: 'utf-8' })

        generatedFiles.push({ apiPath: apiPath, apiName: apiName })
        logger?.log(chalk.green(formatStr(i18n.apiSucc, { apiPath: apiPath, apiName: apiName })));
    }

    return generatedFiles;
}
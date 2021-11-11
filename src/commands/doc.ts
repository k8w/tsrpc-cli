import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { i18n } from "../i18n/i18n";
import { ApiDocUtil } from "../models/ApiDocUtil";
import { ProtoUtil } from "../models/ProtoUtil";
import { TsrpcConfig } from "../models/TsrpcConfig";
import { error } from "../models/util";

export type CmdDocOptions = {
    input: string | undefined,
    output: string | undefined,
    ignore: string | undefined,
    verbose: boolean | undefined,
    config?: undefined
} | { config: TsrpcConfig }

export async function cmdDoc(options: CmdDocOptions) {
    if (options.config) {
        if (!options.config.proto) {
            throw new Error(i18n.missingConfigItem('proto'))
        }
        for (let conf of options.config.proto) {
            options.config.verbose && console.log(`Start to generate ${conf.output}...`);

            // // old
            // let old = await ProtoUtil.loadOldProtoByConfigItem(conf, options.config.verbose);

            // // new
            // await ProtoUtil.genProtoByConfigItem(conf, old, options.config.verbose, options.config.checkOptimizableProto)
        }
    }
    else {
        // 检查参数
        if (typeof options.input !== 'string') {
            throw error(i18n.missingParam, { param: 'input' });
        }
        if (typeof options.output !== 'string') {
            throw error(i18n.missingParam, { param: 'output' });
        }

        // Generate proto
        let { newProto } = await ProtoUtil.generateServiceProto({
            protocolDir: options.input,
            ignore: options.ignore,
            verbose: options.verbose,
            checkOptimize: false,
            keepComment: true
        });

        // Generate OpenAPI
        let openAPI = ApiDocUtil.toOpenAPI(newProto);

        // Output OpenAPI
        await fs.ensureDir(options.output);
        await fs.writeFile(path.join(options.output, 'openapi.json'), JSON.stringify(openAPI, null, 2), 'utf-8');
        console.log(chalk.bgGreen.white(i18n.success));
    }
}



async function generateOpenApi() {

}
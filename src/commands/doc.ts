import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { ServiceProto } from "tsrpc-proto";
import { i18n } from "../i18n/i18n";
import { ApiDocUtil } from "../models/ApiDocUtil";
import { ProtoUtil } from "../models/ProtoUtil";
import { TSAPI } from "../models/TSAPI";
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

        await generateOpenApi(newProto, options.output);
        let tsrpcAPI = await generateTSAPI(newProto, options.output);
        await generateMarkdown(tsrpcAPI, options.output);
        console.log(chalk.bgGreen.white(i18n.success));
    }
}

async function generateOpenApi(proto: ServiceProto, outputDir: string) {
    // Generate OpenAPI
    let openAPI = ApiDocUtil.toOpenAPI(proto);

    // Output OpenAPI
    await fs.ensureDir(outputDir);
    let outputPath = path.resolve(outputDir, 'openapi.json');
    await fs.writeFile(outputPath, JSON.stringify(openAPI, null, 2), 'utf-8');
    console.log(chalk.green('OpenAPI 已成成到：' + outputPath))
}

async function generateTSAPI(proto: ServiceProto, outputDir: string) {
    // Generate OpenAPI
    let tsrpcAPI = await ApiDocUtil.toTSAPI(proto);

    // Output OpenAPI
    await fs.ensureDir(outputDir);
    let outputPath = path.resolve(outputDir, 'tsapi.json');
    await fs.writeFile(outputPath, JSON.stringify(tsrpcAPI, null, 2), 'utf-8');

    console.log(chalk.green('TSAPI (JSON) 已成成到：' + outputPath))
    return tsrpcAPI;
}

async function generateMarkdown(api: TSAPI, outputDir: string) {
    let md = ApiDocUtil.toMarkdown(api);
    await fs.ensureDir(outputDir);
    let outputPath = path.resolve(outputDir, 'tsapi.md');
    await fs.writeFile(outputPath, md, 'utf-8');
    console.log(chalk.green('TSAPI (Markdown) 已成成到：' + outputPath))

}
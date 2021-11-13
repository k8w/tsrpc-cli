import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import { ServiceProto } from "tsrpc-proto";
import { i18n } from "../i18n/i18n";
import { ApiDocUtil } from "../models/ApiDocUtil";
import { ProtoUtil } from "../models/ProtoUtil";
import { TsrpcApi } from "../models/TsrpcApi";
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
        let tsrpcAPI = await generateTsrpcApi(newProto, options.output);
        await generateMarkdown(tsrpcAPI, options.output);
        console.log(chalk.bgGreen.white(i18n.success));
    }
}

async function generateOpenApi(proto: ServiceProto, outputDir: string) {
    // Generate OpenAPI
    let openAPI = ApiDocUtil.toOpenAPI(proto);

    // Output OpenAPI
    await fs.ensureDir(outputDir);
    await fs.writeFile(path.join(outputDir, 'openapi.json'), JSON.stringify(openAPI, null, 2), 'utf-8');
}

async function generateTsrpcApi(proto: ServiceProto, outputDir: string) {
    // Generate OpenAPI
    let tsrpcAPI = await ApiDocUtil.toTsrpcApi(proto);

    // Output OpenAPI
    await fs.ensureDir(outputDir);
    await fs.writeFile(path.join(outputDir, 'tsrpc-api.js'), 'var tsrpcAPI = ' + JSON.stringify(tsrpcAPI, null, 2), 'utf-8');

    return tsrpcAPI;
}

async function generateMarkdown(api: TsrpcApi, outputDir: string) {
    let md = `
TSRPC API
===

# ${api.servers.length > 1 ? 'Servers' : 'Server'}
${api.servers.map(v => `- ${v}`).join('\n')}

# APIs

${api.apis.map(api => `
## ${api.path}
${(api.title ?? '').trim() + (api.title ? '\n' : '')}
### Request

\`\`\`ts
${api.req.ts}
\`\`\`

### Response

\`\`\`ts
${api.res.ts}
\`\`\`

`.trim()).join('\n\n')}

# Schemas


    `.trim();

    await fs.ensureDir(outputDir);
    await fs.writeFile(path.join(outputDir, 'tsrpc-api.md'), md, 'utf-8');
}
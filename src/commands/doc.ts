import { i18n } from "../i18n/i18n";
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
            // options.config.verbose && console.log(`Start to generate ${conf.output}...`);

            // // old
            // let old = await ProtoUtil.loadOldProtoByConfigItem(conf, options.config.verbose);

            // // new
            // await ProtoUtil.genProtoByConfigItem(conf, old, options.config.verbose, options.config.checkOptimizableProto)
        }
    }
    else {
        // 检查参数
        if (!options.input) {
            throw error(i18n.missingParam, { param: 'input' });
        }
        if (!options.output) {
            throw error(i18n.missingParam, { param: 'output' });
        }

        // Generate proto
        let proto = await ProtoUtil.generateServiceProto({
            protocolDir: options.input,
            ignore: options.ignore,
            verbose: options.verbose,
            checkOptimize: false,
            keepComment: true
        });
    }
}



async function generateOpenApi() {

}
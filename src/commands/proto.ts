import { ServiceProto } from "tsrpc-proto";
import { i18n } from "../i18n/i18n";
import { ProtoUtil } from "../models/ProtoUtil";
import { TsrpcConfig } from "../models/TsrpcConfig";
import { error } from "../models/util";

export type CmdProtoOptions = {
    /** 默认当前文件夹 */
    input: string | undefined,
    output: string | undefined,
    /** 默认同 output */
    compatible: string | undefined,
    ugly: boolean | undefined,
    new: boolean | undefined,
    ignore: string[] | string | undefined,
    verbose: boolean | undefined,
    config: undefined
} | { config: TsrpcConfig }

export async function cmdProto(options: CmdProtoOptions) {
    if (options.config) {
        if (!options.config.proto) {
            throw new Error(i18n.missingConfigItem('proto'))
        }
        for (let conf of options.config.proto) {
            options.config.verbose && console.log(`Start to generate ${conf.output}...`);

            // old
            let oldProtoPath = conf.compatible ?? conf.output;
            let oldProto: ServiceProto<any> | undefined;
            if (oldProtoPath && !conf) {
                oldProto = await ProtoUtil.loadServiceProto(oldProtoPath, options.config.verbose ? console : undefined);
            }
            options.config.verbose && console.log(`oldProtoPath: ${oldProtoPath}, hasOldProto=${!!oldProto}`);

            // new
            let resGenProto = await ProtoUtil.generateServiceProto({
                protocolDir: conf.ptlDir,
                oldProto: oldProto ? {
                    proto: oldProto,
                    path: oldProtoPath!
                } : undefined,
                ignore: conf.ignore,
                verbose: options.config.verbose,
            })
            options.config.verbose && console.log(`Proto generated succ, start to write output file...`);

            // output
            await ProtoUtil.outputProto({
                protocolDir: conf.ptlDir,
                newProtoPath: conf.output,
                proto: resGenProto.newProto
            }, console)

            options.config.verbose && console.log(`Finish: ${conf.output}...`);
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

        // oldProto
        let oldProtoPath = options.compatible ?? options.output;
        let oldProto: ServiceProto<any> | undefined;
        if (oldProtoPath && !options.new) {
            oldProto = await ProtoUtil.loadServiceProto(oldProtoPath, options.verbose ? console : undefined);
        }

        // newProto
        let resGenProto = await ProtoUtil.generateServiceProto({
            protocolDir: options.input,
            oldProto: oldProto ? {
                proto: oldProto,
                path: oldProtoPath!
            } : undefined,
            ignore: options.ignore,
            verbose: options.verbose,
        });

        // output
        await ProtoUtil.outputProto({
            protocolDir: options.input,
            newProtoPath: options.output,
            ugly: options.ugly,
            proto: resGenProto.newProto
        }, console)
    }
}
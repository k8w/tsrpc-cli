import { error } from "console";
import fs from "fs";
import path from "path";
import { ApiServiceDef } from "tsrpc-proto";
import { i18n } from "../i18n/i18n";
import { ProtoUtil } from "../models/ProtoUtil";
import { formatStr } from "../models/util";

export interface CmdApiOptions {
    input: string | undefined,
    output: string | undefined
}

export async function cmdApi(options: CmdApiOptions) {
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

    let apis = proto.services.filter(v => v.type === 'api') as ApiServiceDef[];
    for (let api of apis) {
        let apiName = api.name.match(/\w+$/)![0];
        /** a/b/c/Test  apiName='Test' apiNamePath='a/b/c/' */
        let apiNamePath = api.name.substr(0, api.name.length - apiName.length);
        /** API src files dir */
        let apiDir = path.join(options.output, apiNamePath);
        /** API src .ts file pathname */
        let apiPath = path.join(apiDir, `Api${apiName}.ts`);
        /** Ptl src files dir */
        let ptlDir = path.join(path.dirname(options.input), apiNamePath);
        if (fs.existsSync(apiPath)) {
            continue;
        }
        if (!fs.existsSync(apiDir)) {
            fs.mkdirSync(apiDir, { recursive: true });
        }
        fs.writeFileSync(apiPath, `
import { ApiCall } from "tsrpc";
import { Req${apiName}, Res${apiName} } from "${path.relative(apiDir, ptlDir).replace(/\\/g, '/')}/Ptl${apiName}";

export async function Api${apiName}(call: ApiCall<Req${apiName}, Res${apiName}>) {
    
}        
        `.trim(), { encoding: 'utf-8' })

        console.log(formatStr(i18n.apiSucc, { apiPath: apiPath, apiName: apiName }).green);
    }
}
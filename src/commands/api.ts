import { error } from "console";
import fs from "fs";
import path from "path";
import { ApiServiceDef } from "tsrpc-proto";
import { i18n } from "../i18n/i18n";
import { ProtoUtil } from "../models/ProtoUtil";
import { formatStr } from "../models/util";

export async function api(input?: string, output?: string) {
    if (!input) {
        throw error(i18n.missingParam, { param: 'input' });
    }
    if (!output) {
        throw error(i18n.missingParam, { param: 'output' });
    }

    let proto = ProtoUtil.loadServiceProto(input);
    if (!proto) {
        throw error(i18n.protoParsedError, { file: input });
    }

    let apis = proto.services.filter(v => v.type === 'api') as ApiServiceDef[];
    for (let api of apis) {
        let apiName = api.name.match(/\w+$/)![0];
        /** a/b/c/Test  apiName='Test' apiNamePath='a/b/c/' */
        let apiNamePath = api.name.substr(0, api.name.length - apiName.length);
        /** API src files dir */
        let apiDir = path.join(output, apiNamePath);
        /** API src .ts file pathname */
        let apiPath = path.join(apiDir, `Api${apiName}.ts`);
        /** Ptl src files dir */
        let ptlDir = path.join(path.dirname(input), apiNamePath);
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
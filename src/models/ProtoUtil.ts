import { ServiceProto } from "tsrpc-proto";
import { i18n } from "../i18n/i18n";
import { error, formatStr } from "./util";
import fs from "fs";
import path from "path";

export class ProtoUtil {
    static loadServiceProto(filepath: string): ServiceProto<any> | undefined {
        let proto: ServiceProto;
        // 打开OldFile
        let fileContent: string;
        try {
            fileContent = fs.readFileSync(filepath).toString();
        }
        catch {
            return undefined;
        }

        try {
            if (filepath.endsWith('.ts')) {
                let match = fileContent.match(/export const serviceProto: ServiceProto<ServiceType> = (\{[\s\S]+\});/);
                if (match) {
                    proto = JSON.parse(match[1]);
                }
                else {
                    throw new Error(formatStr(i18n.protoParsedError, { file: path.resolve(filepath) }));
                }
            }
            else {
                proto = {
                    services: [],
                    types: JSON.parse(fileContent)
                };
            }
        }
        catch {
            throw new Error(formatStr(i18n.protoParsedError, { file: path.resolve(filepath) }));
        }

        return proto;
    }

    static parseProtoAndSchema(proto: string | undefined, schemaId: string | undefined) {
        // #region 解析Proto
        if (!proto) {
            throw error(i18n.missingParam, { param: '--proto' });
        }
        if (!schemaId) {
            throw error(i18n.missingParam, { param: '--schema' });
        }
        let serviceProto: ServiceProto | undefined;
        try {
            serviceProto = ProtoUtil.loadServiceProto(proto);
        }
        catch (e) {
            throw error(e.message);
        }

        if (!serviceProto) {
            throw error(i18n.fileOpenError, { file: path.resolve(proto) });
        }

        return { proto: serviceProto.types, schemaId: schemaId };
        // #endregion
    }
}
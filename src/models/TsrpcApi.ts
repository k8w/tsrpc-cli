export interface TsrpcApi {
    version: string,
    servers: string[],
    apis: {
        path: string,
        title?: string,
        req: {
            ts: string
        },
        res: {
            ts: string
        }
    }[],
    schemas: {
        [schemaId: string]: {
            ts: string
        }
    }
}
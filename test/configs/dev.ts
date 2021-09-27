import path from "path";
import { TsrpcConfig } from '../../src/models/TsrpcConfig';

const tsrpcConf: TsrpcConfig = {
    proto: [
        {
            ptlDir: path.resolve(__dirname, '../protocols'),
            output: path.resolve(__dirname, '../output/proto/serviceProto.ts'),
            apiDir: path.resolve(__dirname, '../output/api')
        }
    ],
    sync: [
        {
            from: path.resolve(__dirname, '../output/proto'),
            to: path.resolve(__dirname, '../output/sync/symlink'),
            type: 'symlink'
        },
        {
            from: path.resolve(__dirname, '../output/proto'),
            to: path.resolve(__dirname, '../output/sync/copy'),
            type: 'copy'
        }
    ],
    dev: {
        watch: [
            path.resolve(__dirname, '../output'),
            path.resolve(__dirname, '../protocols')
        ],
        command: `node -r ts-node/register "server.ts"`
    },
    // verbose: true
}
export default tsrpcConf;
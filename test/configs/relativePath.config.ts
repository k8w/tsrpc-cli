import { TsrpcConfig } from '../../src/models/TsrpcConfig';

const tsrpcConf: TsrpcConfig = {
    proto: [
        {
            input: 'protocols',
            output: 'output/proto/serviceProto.ts',
            api: 'api'
        },
        {
            input: 'protocols',
            ignore: 'protocols/a/**',
            output: 'output/proto/serviceProto1.ts',
            api: 'api'
        }
    ],
    sync: [
        {
            from: 'output/proto',
            to: 'output/sync/symlink',
            type: 'symlink'
        },
        {
            from: 'output/proto',
            to: 'output/sync/copy',
            type: 'copy'
        }
    ],
    // verbose: true
}
export default tsrpcConf;
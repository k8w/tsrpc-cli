import { TsrpcConfig } from '../../src/models/TsrpcConfig';

const tsrpcConf: TsrpcConfig = {
    proto: [
        {
            input: 'protocols',
            output: 'output/serviceProto.ts',
            api: 'api'
        },
        {
            input: 'protocols',
            ignore: 'protocols/a/**',
            output: 'output/serviceProto1.ts',
            api: 'api'
        }
    ],
    sync: [
        {
            from: 'protocols',
            to: 'protocols_link',
            type: 'symlink'
        },
        {
            from: 'protocols',
            to: 'protocols_copy',
            type: 'copy'
        }
    ],
    // verbose: true
}
export default tsrpcConf;
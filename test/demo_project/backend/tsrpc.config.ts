import { TsrpcConfig } from '../../../src/models/TsrpcConfig';

const tsrpcConf: TsrpcConfig = {
    proto: [
        {
            ptlDir: 'src/shared/protocols',
            output: 'src/shared/protocols/serviceProto.ts',
            apiDir: 'src/api'
        }
    ],
    sync: [
        {
            from: 'src/shared',
            to: '../frontend/shared_symlink',
            type: 'symlink'
        },
        {
            from: 'src/shared',
            to: '../frontend/shared_copy',
            type: 'copy',
            clean: true
        }
    ],
    dev: {
        watch: 'src',
        // entry: 'src/index.ts',
    },
    // verbose: true
}
export default tsrpcConf;
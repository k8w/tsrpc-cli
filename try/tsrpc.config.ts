import { TsrpcConfig } from '../src/models/TsrpcConfig';

const tsrpcConf: TsrpcConfig = {
    proto: [{
        input: 'src/shared/protocols',
        output: 'src/shared/protocols/serviceProto.ts',
        api: 'src/api'
    }],
    sync: [{
        from: 'src/shared',
        to: '../frontend/src/shared',
        type: 'symlink'
    }]
}
export default tsrpcConf;
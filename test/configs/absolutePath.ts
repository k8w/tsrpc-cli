import path from "path";
import { TsrpcConfig } from '../../src/models/TsrpcConfig';

const tsrpcConf: TsrpcConfig = {
    proto: [
        {
            input: path.resolve(__dirname, '../protocols'),
            output: path.resolve(__dirname, '../output/serviceProto.ts'),
            api: path.resolve(__dirname, '../api')
        },
        {
            input: path.resolve(__dirname, '../protocols'),
            ignore: path.resolve(__dirname, '../protocols/a/**'),
            output: path.resolve(__dirname, '../output/serviceProto1.ts'),
            api: path.resolve(__dirname, '../api')
        }
    ],
    sync: [
        {
            from: path.resolve(__dirname, '../output'),
            to: path.resolve(__dirname, '../output'),
            type: 'symlink'
        },
        {
            from: path.resolve(__dirname, '../output'),
            to: path.resolve(__dirname, '../output'),
            type: 'copy'
        }
    ],
    // verbose: true
}
export default tsrpcConf;
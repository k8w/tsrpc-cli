import replace from '@rollup/plugin-replace';
import typescript from 'rollup-plugin-typescript2';

export default {
    input: './src/index.ts',
    output: {
        format: 'cjs',
        file: './dist/index.js',
        banner: '#!/usr/bin/env node\n' + require('./scripts/copyright')
    },
    plugins: [
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    declaration: false,
                    declarationMap: false,
                    module: "ESNext"
                }
            },
            objectHashIgnoreUnknownHack: true,
            rollupCommonJSResolveHack: true
        }),
        replace({
            '__TSRPC_CLI_VERSION__': require('./package.json').version,
            'process.env.NODE_ENV': '"production"'
        })
    ],
    external: ['ts-node/register']
}
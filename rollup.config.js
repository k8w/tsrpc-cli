import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';

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
                    module: "ESNext"
                }
            },
            objectHashIgnoreUnknownHack: true,
            rollupCommonJSResolveHack: true
        }),
        nodeResolve(),
        commonjs(),
        json(),
        replace({
            '__TSRPC_CLI_VERSION__': require('./package.json').version
        }),
        terser({
            toplevel: true,
            mangle: {},
            format: {
                comments: /^!/
            }
        })
    ]
}
import typescript from 'rollup-plugin-typescript2';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: './index.ts',
    output: {
        format: 'cjs',
        file: './dist/index.js',
        banner: '#!/usr/bin/env node'
    },
    plugins: [
        typescript({
            tsconfigOverride: {
                compilerOptions: {
                    declaration: false,
                    module: "ESNext"
                }
            }
        }),
        uglify()

    ],
    external: ['tslib']
}
import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import progress from 'rollup-plugin-progress';
import cleanup from 'rollup-plugin-cleanup';
import pkg from './package.json';

const name = pkg.name
    .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
    .replace(/^\w/, m => m.toUpperCase())
    .replace(/-\w/g, m => m[1].toUpperCase());

export default {
    input: 'src/index.js',
    output: [
        {file: pkg.module, 'format': 'es'},
        {file: pkg.main, 'format': 'umd', name}
    ],
    plugins: [
        // https://github.com/rollup/plugins/tree/master/packages/alias
        alias({
            resolve: ['.js', '.ts', '.svelte'],
            entries: [
                // {
                //     find: 'utils',
                //     replacement: '../../../utils'
                // },
                // {
                //     find: 'batman-1.0.0',
                //     replacement: './joker-1.5.0'
                // }
                {find: '@/', replacement: './src/'}
            ]
        }),
        svelte(),
        resolve(),
        // https://github.com/rollup/plugins/tree/master/packages/typescript
        typescript({
            lib: ["es5", "es6", "dom"],
            target: "es6",
            cacheDir: '.rollup.tscache',
        }),
        // https://github.com/rollup/plugins/tree/master/packages/commonjs
        commonjs({
            include: /node_modules/
        }),
        // https://github.com/jkuri/rollup-plugin-progress
        progress({
            clearLine: false // default: true
        }),
        cleanup()
    ]
};

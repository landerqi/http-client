import babel from 'rollup-plugin-babel'
import typescript from 'rollup-plugin-typescript2'
import commonjs from '@rollup/plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve'
import { uglify } from 'rollup-plugin-uglify'
// import strip from '@rollup/plugin-strip'
import replace from 'rollup-plugin-replace'
import { version } from './package.json'
let defaults = { compilerOptions: { declaration: true } }
const isProduction = process.env.BUILD === 'production'

export default {
  input: 'src/index.ts',
  output: {
    file: isProduction ? `dist/http-client.min.js`: 'dist/http-client.js',
    format: 'umd',
    name: 'http-client'
  },
  plugins: [
    replace({
      VERSION: version,
      delimiters: ['{{', '}}']
    }),
    typescript({
      tsconfigDefaults: defaults,
      tsconfig: 'tsconfig.json',
    }),
    commonjs({ extensions: ['.js', '.ts'] }),
    resolve({
      mainFields: ['module', 'main', 'jsnext'], // Default: ['module', 'main']
      browser: true
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    isProduction && uglify(),
    // isProduction && strip({include: '**/*.ts'}),
  ]
};

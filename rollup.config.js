import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import sourceMaps from 'rollup-plugin-sourcemaps';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import camelCase from 'lodash/camelCase';
import pkg from './package.json';

const packageName = 'useful-storage';

const banner = '/*!\n'
          + ` * ${pkg.name} v${pkg.version}\n`
          + ` * (c) 2020-${new Date().getFullYear()} fe-useful-tools\n`
          + ' * Released under the MIT License.\n'
          + ' */';

const extensions = ['.js', '.ts'];

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true,
      banner,
    },
    {
      file: pkg.browser,
      format: 'umd',
      name: camelCase(packageName),
      sourcemap: true,
      banner,
    },
  ],
  // Indicate here external modules you don't wanna include in your bundle (i.e.: 'lodash')
  external: [],
  plugins: [
    // Compile TypeScript files
    typescript({ useTsconfigDeclarationDir: true }),
    babel({ extensions, include: ['src/**/*'], exclude: 'node_modules/**' }),
    // Allow node_modules resolution, so you can use 'external' to control
    // which external modules to include in the bundle
    // https://github.com/rollup/rollup-plugin-node-resolve#usage
    resolve({ extensions }),
    // Resolve source maps to the original source
    sourceMaps(),
    terser(),
  ],
};

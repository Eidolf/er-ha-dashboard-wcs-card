import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

const dev = process.env.ROLLUP_WATCH;

export default {
  input: 'src/waste-collection-schedule-card.ts',
  output: {
    dir: 'dist',
    format: 'es',
    sourcemap: dev ? 'inline' : false,
    exports: 'named',
  },
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
    }),
    commonjs(),
    json(),
    !dev && terser({
      format: {
        comments: false,
      },
    }),
  ],
};

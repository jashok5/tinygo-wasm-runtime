import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

export default {
  input: 'tinygo-wasm-runtime.ts',
  output: [
    {
      file: 'dist/tinygo-wasm-runtime.js',
      format: 'cjs',
      sourcemap: true
    },
    {
      file: 'dist/tinygo-wasm-runtime.esm.js',
      format: 'es',
      sourcemap: true
    },
    {
      file: 'dist/tinygo-wasm-runtime.min.js',
      format: 'umd',
      name: 'TinyGoWasmRuntime',
      sourcemap: true,
      plugins: [terser()]
    }
  ],
  plugins: [
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: './dist'
    })
  ]
}
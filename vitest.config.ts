// Utilities
import { defineConfig } from 'vitest/config';
import { defaultExclude } from 'vitest/config';

// https://vitejs.dev/config/
export default defineConfig({
  define: { 'process.env': {} },
  resolve: {
    extensions: [
      '.js',
      '.json',
      '.jsx',
      '.mjs',
      '.ts',
      '.tsx',
      '.vue',
    ],
  },
  server: {
    port: 5173,
  },
  test: {
    globals: true,
    coverage: {
      exclude: [
        ...defaultExclude,
        'docs/',
      ]
    }
  }
})

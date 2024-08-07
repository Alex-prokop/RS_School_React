import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    coverage: {
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/setupTests.ts',
        'src/types.ts',
        'src/**/__tests__/*.test.tsx',
        'vitest.config.ts',
        'next-env.d.ts',
        '.next/',
        '**/*.config.{js,ts}',
        '**/*.d.ts',
      ],
      include: ['src/**/*.{ts,tsx}'],
    },
  },
});

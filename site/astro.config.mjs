// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://adrianwedd.github.io',
  base: '/failure-first',
  outDir: '../docs',
  build: {
    assets: 'assets'
  }
});

import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://Mshahas786.github.io',
  base: '/malluscorner/',
  integrations: [tailwind()],
});

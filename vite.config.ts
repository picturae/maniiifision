import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const publicPath = env.NODE_ENV === 'production' ? '/maniiifision/' : ''

  let base = '/'
  if (publicPath) {
    base = publicPath
  }

  return {
    assetsDir: './assets',
    publicPath,
    base,
    plugins: [vue()],
  }
})

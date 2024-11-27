import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
// https://vitejs.dev/config/
import { viteMockServe } from 'vite-plugin-mock'
export default defineConfig(({ command }) => {
  return {
    plugins: [vue(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), './src/assets/icons')],
      symbolId: 'icon-[dir]-[name]',//svg图标的id前缀
    }),
    viteMockServe({
      mockPath: 'mock', // 相对路径，不需要加 "/"
      localEnabled: command === 'serve', // 确保开发阶段可以使用 Mock
    }),
    ],
    resolve: {
      alias: {
        '@': path.resolve('./src'),//相对路径别名配置，使用@代替./src
      }
    },
    
    //scss全局变量配置
    css: {
      preprocessorOptions: {
        scss: {
          javascriptEnabled: true,
          additionalData: '@import"./src/styles/variable.scss";',
        },
      },
    }
  }
})

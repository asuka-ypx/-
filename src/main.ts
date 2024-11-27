import { createApp } from 'vue'
import App from './App.vue'
//引入element-plus插件和样式
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { zhCn } from 'element-plus/es/locales.mjs'
//svg插件需要的配置代码
import 'virtual:svg-icons-register'
//引入全局样式

import './styles/index.scss'
import router from './router/index_router'
import pinia from './store/index_store.ts'
//引入自定义插件对象
import globalComponent from './components/index_components.ts'
//获取应用实例对象


const app = createApp(App)
//下载element-plus插件
app.use(ElementPlus, {
    locale: zhCn//国际化配置
})
app.use(router);
app.use(pinia);
app.use(globalComponent);
//引入路由鉴权文件
import './permisstion'

//将应用挂载到挂载点
app.mount('#app')
//package.json    "build": "vue-tsc -b && vite build",
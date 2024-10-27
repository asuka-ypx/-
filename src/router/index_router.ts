//通过vue-router插件实现模板路由配置
import { createRouter, createWebHashHistory } from 'vue-router';
import { constantRoute } from './routers';
//创建路由器
const router = createRouter({
    history: createWebHashHistory(),
    routes: constantRoute,
    //滚动行为
    scrollBehavior() {
        return {
            top: 0,
            left: 0,
        }
    }
})

export default router;
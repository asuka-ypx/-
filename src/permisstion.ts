//路由鉴权：项目当中路由能不能被访问的设置
import router from '../src/router/index_router.ts';
import nprogress from 'nprogress'
import "nprogress/nprogress.css"
import useUserStore from './store/medules/user.ts';
import pinia from './store/index_store.ts';
const userStore = useUserStore(pinia);
nprogress.configure({ showSpinner: false });

//全局前置守卫
router.beforeEach(async (to, from, next) => {
    //to:你将要访问哪个路由
    //from：你从哪个路由而来
    //next：路由的放行函数
    document.title = '多智能体调度优化平台——' + to.meta.title
    nprogress.start();

    const token = userStore.token;
    const username = userStore.username;
    if (token) {
        if (to.path == '/login') {
            next({ path: 
                '/' })
        } else {
            if (username) {
                next();
            } else {
                try {
                    await userStore.userInfo();
                    next();
                } catch (error) {
                    userStore.userLogout()
                    next({ path: '/login' });
                }
            }

        }
    } else {
        if (to.path == '/login') {
            next();
        } else {
            next({ path: '/login' });
        }
    }
    // 访问某一个路由之前守卫

})
//全局后置守卫
router.afterEach((to, from) => {
    nprogress.done();
})
//登录未成功只能访问login登录成功除了login都可以访问
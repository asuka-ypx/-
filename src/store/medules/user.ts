
//创建用户相关小仓库
import { defineStore } from 'pinia';
//引入接口
import { reqLogin, reqUserInfo } from '../../api/user';
//引入数据类型
import type { loginForm, loginResponseData } from '../../api/user/types';
import type { UserState } from './types/types';
import { SET_TOKEN, GET_TOKEN,REMOVE_TOKEN } from '../../utils/token';
//引入路由（常量路由）
import { constantRoute } from '../../router/routers';

const useUserStore = defineStore('User', {
    //小仓库存储数据的地方
    state: (): UserState => {
        return {
            token: GET_TOKEN(),//用户的唯一标识
            // token: '',
            menuRoutes: constantRoute,
            username: '',
            avatar: '',
        }
    },
    //异步|逻辑的地方
    actions: {
        //用户登录方法
        async userLogin(data: loginForm) {
            const result: loginResponseData = await reqLogin(data);
            //成功200->token
            //失败201->登录失败的错误信息
            if (result.code === 200) {
                this.token = (result.data.token as string);
                //本地化存储持久存储一份
                SET_TOKEN(result.data.token as string)
                //能保证当前async函数返回一个成功的promise
                return 'ok';
            } else {
                return Promise.reject(new Error(result.data.message));
            }
        },
        async userInfo() {
            const result = await reqUserInfo();
            console.log(result)
            if (result.code === 200) {
                this.username = result.data.username ;
                this.avatar = result.data.avatar;
            }
        },
        //退出登录
        userLogout(){
            this.token = '';
            this.username = '';
            this.avatar = '';
            REMOVE_TOKEN();
            //跳转到登录页面
            console.log(this.token)
        },
        getters: {

        }
    }
})

export default useUserStore;
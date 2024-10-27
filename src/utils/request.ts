//对axios经行二次封装，使用请求与相应拦截器
import axios from "axios";
import { ElMessage } from "element-plus";
//引入用户相关的仓库
import useUserStore from "../store/medules/user";
//第一步：使用axios的create方法，去创建axios实例（其他配置：基础路径、超时的时间）
const request = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_API, // 基础路径
    timeout: 5000, // 超时时间
})
//第二步：给axios实例添加请求和响应拦截器
request.interceptors.request.use((config) => {
    //获取用户相关的小仓库：获取仓库内部token，登录成功后
    const userStore =useUserStore();
    if(userStore.token) {
        config.headers.token = userStore.token; // 加入token到headers中
    }
    // config配置对象，headers属性请求头
    return config;
})
//第三步：响应拦截器
request.interceptors.response.use((response) => {
    // 成功
    return response.data;
}, (error) => {
    //失败处理http网络错误
    let message = '';
    const status = error.response.status;
    switch (status) {
        case 401:
            message = 'token已过期';
            break;
        case 403:
            message = '无权访问';
            break;
        case 404:
            message = '请求路径错误';
            break;
        case 500:
            message = '服务器出错';
            break;
        default:
            message = '未知错误';
            break;
    }
    ElMessage({
        type: 'error',
        message
    });
    return Promise.reject(error);
})
//对外暴露
export default request;
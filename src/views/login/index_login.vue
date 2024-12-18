<template>
    <div class="login_container">
        <el-row>
            <el-col :span="12" :xs="0"></el-col>
            <el-col :span="12" :xs="24">
                <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
                    <h1>Hello</h1>
                    <h2>欢迎来到多智能体调度优化引擎</h2>
                    <el-form-item prop="username">
                        <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password" :prefix-icon="Lock" v-model="loginForm.password"
                            show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" size="default" class="login_btn" @click="login">登 录</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElNotification } from 'element-plus';
//引入用户相关的小仓库
import useUserStore from '../../store/medules/user';
//引入时间
import { getTime } from '../../utils/time';

let userStore = useUserStore();
let $router = useRouter();
//收集表单数据
let loginForm = reactive({ username: 'admin', password: '111111' })
//登录按钮
let loginForms = ref();
const login = async () => {
    //等待表单校验通过再发送请求
    await loginForms.value.validate();
    //通知仓库发登录请求
    try {
        await userStore.userLogin(loginForm);
        $router.push('/');
        //登录成功返回信息
        ElNotification({
            type: 'success',
            message: '登陆成功',
            title: `Hi!,${getTime()}`,
        })
    } catch (error) {
        ElNotification({
            type: 'error',
            message: (error as Error).message,
        })
    }
    const result = userStore.userLogin(loginForm);
    console.log(result);
}
const rules = {
    username: [
        { required: true, min: 5, message: "账号长度至少5位", trigger: 'change' },
    ],
    password: [
        { required: true, min: 6, message: "密码长度至少6位", trigger: 'change' },
    ],
}
</script>

<style scoped lang="scss">
.login_container {
    width: 100%;
    height: 100vh;
    background: url('@/assets/images/主楼线稿-侧.png') no-repeat;
    background-size: cover;

    .login_form {
        position: relative;
        width: 75%;
        top: 30vh;
        // background: url("@/assets/images/background_form.jpg") no-repeat;
        background-color: #326ce5;
        background-size: cover;
        padding: 40px;
        opacity: 90%;
        border-radius: 15px;

        h1 {
            color: white;
            font-size: 40px;
        }

        h2 {
            color: white;
            font-size: 20px;
            margin: 20px 0px;
        }

        .login_btn {
            width: 100%;
        }
    }
}
</style>
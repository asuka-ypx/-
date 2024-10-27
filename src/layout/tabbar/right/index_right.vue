<template>
    <el-button size="small" icon="Refresh" circle @click="refresh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullscreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img src="../../../../public/logo.svg" style="width: 24px;height: 24px;margin: 10px 10px">
    <!-- 下拉菜单 -->
    <el-dropdown>
        <span class="el-dropdown-link">
            {{ userStore.username }}
            <el-icon class="el-icon--right">
                <arrow-down />
            </el-icon>
        </span>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import useLayOutSettingStore from '../../../store/medules/setting';
import useUserStore from '../../../store/medules/user';
let userStore = useUserStore();
let LayOutSettingStore = useLayOutSettingStore();
let $router = useRouter();
const refresh = () => {
    LayOutSettingStore.refresh=!LayOutSettingStore.refresh;
}
const fullscreen = () => {
    //dom的一个属性盘判断当前是否为全屏
    let full = document.fullscreenElement;
    if(!full){
        document.documentElement.requestFullscreen();
    }else {
        document.exitFullscreen();
    }
}
const logout = () => {
    //向服务器发请求\
    userStore.userLogout();

    $router.push('/login');
};
</script>

<style scoped></style>
<template>
    <el-button size="small" icon="Refresh" circle @click="refresh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullscreen"></el-button>
    <el-button size="small" icon="Setting" circle @click = "storeSetting"></el-button>
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
import axios from 'axios'
import useLayOutSettingStore from '../../../store/medules/setting';
import useUserStore from '../../../store/medules/user';

//导入pinia仓库中数据
import { useNodeStore, NodeData } from '../../../store/medules/nodeStore';
import { usePodStore, PodData } from '../../../store/medules/podStore';

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
//更新仓库信息
const storeSetting = async() => {
    localStorage.clear();
    const nodeStore = useNodeStore();
    const apiUrl = import.meta.env.VITE_APP_SERVER_URL; // Vite 的用法
    const Nodes = await axios.get(apiUrl+"/nodes");
    const allNodes = Object.values(Nodes.data.nodes);
    allNodes.forEach((newNode) => {
            nodeStore.addNode(newNode);  // 如果节点不存在，则添加到 Pinia 中
    });

}
const logout = () => {
    //向服务器发请求\
    userStore.userLogout();

    $router.push('/login');
};
</script>

<style scoped></style>
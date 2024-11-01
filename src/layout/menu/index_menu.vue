<!-- eslint-disable @typescript-eslint/no-explicit-any -->
<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable vue/no-unused-vars -->
<template>
        <template v-for="(item, index) in menuList" :key="item.path">
            <!-- 没有子路由 -->
            <template v-if="!item.children">
                <el-menu-item v-if="!item.meta.hidden" :index="item.path" @click="goRoute">
                    <el-icon color="red">
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <template #title>
                        <span>{{ item.meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>

            <!-- 一个子路由 -->
            <template v-if="item.children && item.children.length == 1">
                <el-menu-item v-if="!item.children[0].meta.hidden" :index="item.path" @click="goRoute">
                    <el-icon color="red">
                        <component :is="item.children[0].meta.icon"></component>
                    </el-icon>
                    <template #title>
                        <span>{{ item.children[0].meta.title }}</span>
                    </template>
                </el-menu-item>
            </template>

            <!-- 有子路由且大于一个 -->
            <el-sub-menu :index="item.path" v-if="item.children && item.children.length > 1">
                <template #title>
                    <el-icon>
                        <component :is="item.meta.icon"></component>
                    </el-icon>
                    <span>{{ item.meta.title }}</span>
                </template>
                <!-- 递归组件 -->
                <Menu :menuList="item.children"></Menu>
            </el-sub-menu>
        </template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
//获取父组件传递过来的全部路由数组
defineProps(['menuList'])

let $router = useRouter();
// const goRoute = (vc: any) => {
//     //路由跳转
//     $router.push(vc.index);
// }
const goRoute = (vc: { index?: string }) => {
  // 确保vc.index存在且为字符串
  if (vc?.index) {
    $router.push(vc.index);
  } else {
    console.warn("无效的路由目标：", vc);
  }
};

</script>
<script lang="ts">
export default {
    name: 'Menu',
}
</script>

<style scoped></style>
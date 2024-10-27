<template>
    <!-- 左侧图标 -->
    <el-icon style="margin-right: 10px;" @click="changeIcon">
        <component :is="LayOutSettingStore.fold ? 'Fold' : 'Expand'"></component>
    </el-icon>
    <!-- 左侧面包屑 -->
    <el-breadcrumb separator-icon="ArrowRight">
        <el-breadcrumb-item v-for="(item, index) in $route.matched" :key="index" v-show="item.meta.title" :to="item.path">
            <el-icon style="margin: 0px 5px;">
                <component :is="item.meta.icon"></component>
            </el-icon>
            <span>{{ item.meta.title }}</span>

        </el-breadcrumb-item>
    </el-breadcrumb>
</template>

<script setup lang="ts">

import useLayOutSettingStore from '../../../store/medules/setting';
import { useRoute } from 'vue-router';
let LayOutSettingStore = useLayOutSettingStore();
let $route = useRoute();
const changeIcon = () => {
    LayOutSettingStore.fold = !LayOutSettingStore.fold

}
</script>

<style scoped></style>
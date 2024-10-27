<template>
    <!-- 路由组件出口位置 -->
    <router-view v-slot="{ Component }">
        <transition name="fade">
            <component :is="Component" v-if="flag" />
        </transition>
    </router-view>
</template>

<script setup lang="ts">
import { watch, nextTick, ref } from 'vue';
import useLayOutSettingStore from '../../store/medules/setting';

let LayOutSettingStore = useLayOutSettingStore();
let flag = ref(true);
//监听仓库内部数据是否发生变化，如果发生变化说明点击了刷新按钮
watch(() => LayOutSettingStore.refresh, () => {
    flag.value = false;
    nextTick(() => {
        flag.value = true;
    })
});
</script>

<style scoped>

</style>
<template>
    <div>
        <h1>我是一级路由展示登录成功的数据</h1>
    </div>
</template>

<script setup lang="ts">
//引入组合式API函数
import { onMounted } from 'vue';
import useUserStore from '../../store/medules/user';
let userStore = useUserStore();
onMounted(()=>{
    userStore.userInfo();
})
//获取仓库

</script>

<style scoped>

</style>
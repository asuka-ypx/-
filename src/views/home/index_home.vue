<template>
    <el-card style="height: 100%;">

    </el-card>
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
<template>
    <div class="logo">
        <img src="../../../public/logo.svg" alt="">
            <p v-if="!LayOutSettingStore.fold">多智能体调度优化引擎</p>
    </div>
</template>

<script setup lang="ts">
import useLayOutSettingStore from '../../store/medules/setting';
let LayOutSettingStore = useLayOutSettingStore();
</script>

<style scoped lang="scss">
.logo {
    width: 100%;
    height: $base-menu-logo-height;
    color: white;
    display: flex;
    align-items: center;
    padding: 13px;

    img {
        width: 40px;
        height: 40px;
    }

    p {
        font-size: $base-logo-title-fontSize;
        margin-left: 20px;
    }
}
</style>
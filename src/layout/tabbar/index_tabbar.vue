<template>
    <div class="tabbar">
        <div class="tabbar_left">
            <Left></Left>
        </div>
        <div class="tabbar_right">
           <Right></Right>
        </div>
    </div>
</template>

<script setup lang="ts">
import Left from "./left/index_left.vue"
import Right from "./right/index_right.vue"
</script>

<style scoped lang="scss">
.tabbar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;

    .tabbar_left {
        display: flex;
        align-items: center;
        margin-left: 20px;
    }
    .tabbar_right {
        display: flex;
        align-items: center;

    }
}
</style>
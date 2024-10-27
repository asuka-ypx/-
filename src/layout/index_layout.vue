<template>
    <div class="layout_container">
        <!--左侧菜单 -->
        <div class="layout_sider" :class="{ fold: LayOutSettingStore.fold }">
            <Logo></Logo>
            <!--展示菜单  -->
            <el-scrollbar class="scrollbar">
                <el-menu :collapse="LayOutSettingStore.fold" :default-active="$route.path" background-color="rgb(180, 180, 180)"
                    active-text-color="lightblue">
                    <Menu :menuList="userStore.menuRoutes">
                    </Menu>
                </el-menu>
            </el-scrollbar>
        </div>
        <!-- 顶部导航 -->
        <div class="layout_tabbar" :class="{ fold: LayOutSettingStore.fold }">
            <Tabbar></Tabbar>
        </div>
        <!-- 内容展示区 -->
        <div class="layout_main" :class="{ fold: LayOutSettingStore.fold }">
            <Main></Main>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useRoute } from "vue-router";
import Logo from "./logo/index_logo.vue";
import Menu from "./menu/index_menu.vue";
import useUserStore from '../store/medules/user';
import Main from "./main/index_main.vue"
import Tabbar from "./tabbar/index_tabbar.vue"
import useLayOutSettingStore from "../store/medules/setting";
let LayOutSettingStore = useLayOutSettingStore();

let userStore = useUserStore();
let $route = useRoute();

</script>

<style scoped lang="scss">
.layout_container {
    width: 100%;
    height: 100vh;

    .layout_sider {
        width: $base-menu-width;
        height: 100vh;
        background-color: $base-menu-background;
        transition: all 0.3s;

        .scrollbar {
            width: 100%;
            height: calc(100vh - $base-menu-logo-height);

            .el-menu {
                border-right: none;
                background-color: $base-menu-background;
            }
        }

        &.fold {
            width: $base-menu-fold-width;
        }
    }

    .layout_tabbar {
        position: fixed;
        width: calc(100% - $base-menu-width);
        height: $base-tabbar-height;
        background-color: white;
        top: 0px;
        left: $base-menu-width;
        transition: all 0.3s;
        &.fold {
            width: calc(100% - $base-menu-fold-width);
            left: $base-menu-fold-width;
        }
    }

    .layout_main {
        position: absolute;
        width: calc(100% - $base-menu-width);
        height: calc(100vh - $base-tabbar-height);
        background-color: #eeeeee;
        left: $base-menu-width;
        top: $base-tabbar-height;
        padding: 20px;
        overflow: auto;
        transition: all 0.3s;
        &.fold {
            width: calc(100% - $base-menu-fold-width);
            left: $base-menu-fold-width;
        }
    }
}
</style>
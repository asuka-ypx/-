<template>
    <el-card body-class="background">
        <el-card shadow="hover" class="cpu" :data="tableData" >
            <template #header>
                <div class="card-header">
                    <span>CPU 信息</span>
                    <el-dropdown style="float: right;">
                        <span class="el-dropdown-link">
                            切换节点
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-item v-for="(node, index) in tableData" :key="index" @click="change(node)">
                                {{ node.nodename }}
                            </el-dropdown-item>
                        </template>
                    </el-dropdown>
                </div>
            </template>
            <el-progress type="circle" :percentage="37" />
            <el-descriptions title="CPU">
                <el-descriptions-item label="Name">{{ cpuInfo.nodename }}</el-descriptions-item>
                <el-descriptions-item label="ID">{{ cpuInfo.nodeID }}</el-descriptions-item>
                <el-descriptions-item label="cpu可用容量">{{ cpuInfo.cpu }}</el-descriptions-item>
                <el-descriptions-item label="Remarks">
                    <el-tag size="small">{{ cpuInfo.nodestatus }}</el-tag>
                </el-descriptions-item>

            </el-descriptions>
        </el-card>

        <el-card shadow="hover" class="memory">
            <template #header>
                <div class="card-header">
                    <span>内存 信息</span>
                    <el-dropdown style="float: right;">
                        <span class="el-dropdown-link">
                            切换节点
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-item v-for="(node, index) in tableData" :key="index" @click="change(node)">
                                {{ node.nodename }}
                            </el-dropdown-item>
                        </template>
                    </el-dropdown>
                </div>
            </template>
            <el-progress type="circle" :percentage="37" />
            <el-descriptions title="内存">
                <el-descriptions-item label="Name">{{ cpuInfo.nodename }}</el-descriptions-item>
                <el-descriptions-item label="ID">{{ cpuInfo.nodeID }}</el-descriptions-item>
                <el-descriptions-item label="memory可用容量">{{ cpuInfo.memory }}</el-descriptions-item>
                <el-descriptions-item label="Remarks">
                    <el-tag size="small">{{ cpuInfo.nodestatus }}</el-tag>
                </el-descriptions-item>

            </el-descriptions>
        </el-card>
        <el-card shadow="hover" class="net">
            <template #header>
                <div class="card-header">
                    <span>网络 信息</span>
                </div>
                <el-dropdown style="float: right;">
                        <span class="el-dropdown-link">
                            切换节点
                            <el-icon class="el-icon--right">
                                <arrow-down />
                            </el-icon>
                        </span>
                        <template #dropdown>
                            <el-dropdown-item v-for="(node, index) in tableData" :key="index" @click="change(node)">
                                {{ node.nodename }}
                            </el-dropdown-item>
                        </template>
                    </el-dropdown>
            </template>

            <el-progress type="circle" :percentage="37" />
            <el-descriptions title="网络">
                <el-descriptions-item label="Name">{{ cpuInfo.nodename }}</el-descriptions-item>
                <el-descriptions-item label="ID">{{ cpuInfo.nodeID }}</el-descriptions-item>
                <el-descriptions-item label="网络">{{ cpuInfo.net }}</el-descriptions-item>
                <el-descriptions-item label="Remarks">
                    <el-tag size="small">{{ cpuInfo.nodestatus }}</el-tag>
                </el-descriptions-item>

            </el-descriptions>
        </el-card>

        <el-card style="width: 100%;padding: 10px" height="350" class="node">
            <el-table :data="tableData" height="250" style="width: 100%">
                <el-table-column prop="nodename" label="节点名称" width="180" />
                <el-table-column prop="nodeID" label="节点ID" width="180" />
                <el-table-column prop="nodestatus" label="节点状态" width="180" />
                <el-table-column prop="cpu" label="cpu可用量" width="180" />
                <el-table-column prop="memory" label="内存可用量" width="180" />
                <el-table-column prop="conditions" label="节点健康状况" width="180"/>
                <el-table-column prop="description" label="节点描述" />
            </el-table>
        </el-card>
    </el-card>



</template>

<script setup lang="ts">
import { ref } from 'vue';
import { tableData, NodeData } from '../../../data/data_node';
const cpuInfo = ref<NodeData>(tableData[0]);
// 定义 `tableData` 的类型

const change = (node: NodeData) => {
console.log(node)
cpuInfo.value = node; // 更新 `cpuInfo` 为点击的节点数据
}
</script>

<style scoped lang="scss">
.background {
    display: flex; // 使用 flex 布局
    flex-wrap: wrap; // 允许换行
    justify-content: space-between; // 控制卡片之间的间距

    .cpu,
    .memory,
    .net {
        flex-basis: 100%; // 每个卡片占父容器 23% 的宽度，确保在一行内排列
        // 防止宽度过大
        box-sizing: border-box;
        padding: 10px;
    }

    .node {
        width: 100%; // 独占整行
        padding-top: 20px;
    }
}
</style>
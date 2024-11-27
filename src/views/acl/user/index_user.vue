<template>
  <!-- 节点信息 -->
  <el-card body-class="background">
    <!-- CPU 卡片 -->
    <el-card shadow="hover" class="cpu" style="margin: 10px;">
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
              <el-dropdown-item v-for="(node, index) in nodeStore.nodes" :key="index" @click="change(node)">
                {{ node.name }}
              </el-dropdown-item>
            </template>
          </el-dropdown>
        </div>
      </template>
      <el-progress type="circle" :percentage="cpuUsage" />
      <el-descriptions title="CPU" border>
        <el-descriptions-item label="Name">{{ nodeInfo?.name }}</el-descriptions-item>
        <el-descriptions-item label="CPU 总容量">{{ nodeInfo?.total_cpu }}</el-descriptions-item>
        <el-descriptions-item label="CPU 已分配容量">{{ nodeInfo?.allocated_cpu }}</el-descriptions-item>

        <el-descriptions-item label="状态">
          <el-tag size="small">{{ nodeInfo?.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="节点注释">{{ nodeInfo?.annotations }}</el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 内存卡片 -->
    <el-card shadow="hover" class="memory" style="margin: 10px;">
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
              <el-dropdown-item v-for="(node, index) in nodeStore.nodes" :key="index" @click="change(node)">
                {{ node.name }}
              </el-dropdown-item>
            </template>
          </el-dropdown>
        </div>
      </template>
      <el-progress type="circle" :percentage="memoryUsage" />
      <el-descriptions title="内存" border>
        <el-descriptions-item label="Name">{{ nodeInfo?.name }}</el-descriptions-item>
        <el-descriptions-item label="内存总容量">{{ MemoryInMB(nodeInfo?.total_memory) }}MB</el-descriptions-item>
        <el-descriptions-item label="内存已分配容量">{{ MemoryInMB(nodeInfo?.allocated_memory) }}MB</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag size="small">{{ nodeInfo?.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="节点注释">{{ nodeInfo?.annotations }}</el-descriptions-item>

      </el-descriptions>
    </el-card>

    <!-- 网络卡片 -->
    <el-card shadow="hover" class="net" style="margin: 10px;">
      <template #header>
        <div class="card-header">
          <span>GPU 信息</span>
          <el-dropdown style="float: right;">
            <span class="el-dropdown-link">
              切换节点
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-item v-for="(node, index) in nodeStore.nodes" :key="index" @click="change(node)">
                {{ node.name }}
              </el-dropdown-item>
            </template>
          </el-dropdown>
        </div>
      </template>
      <el-progress type="circle" :percentage="netUsage" />
      <el-descriptions title="网络" border>
        <el-descriptions-item label="Name">{{ nodeInfo?.name }}</el-descriptions-item>
        <el-descriptions-item label="网络总量">{{ nodeInfo?.total_net }}</el-descriptions-item>
        <el-descriptions-item label="网络已分配">{{ nodeInfo?.allocated_net }}</el-descriptions-item>
        <el-descriptions-item label="状态">
          <el-tag size="small">{{ nodeInfo?.status }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="节点注释">{{ nodeInfo?.annotations }}</el-descriptions-item>

      </el-descriptions>
    </el-card>

    <!-- 节点表格 -->
    <el-card style="width: 100%; padding: 10px;margin: 10px;" height="350" class="node">
      <el-table :data="nodeStore.nodes" height="250" style="width: 100%">
        <el-table-column prop="name" label="节点名称" width="180" />
        <el-table-column prop="total_gpu" label="GPU 可用量" width="180" />
        <el-table-column prop="total_cpu" label="CPU 可用量" width="180" />
        <el-table-column prop="total_memory" label="内存可用量" width="180" />
        <el-table-column prop="total_io" label="I/O可用量" width="180" />
        <el-table-column prop="status" label="节点健康状况" width="180" />
        <el-table-column prop="annotations" label="节点描述" />
      </el-table>
    </el-card>
  </el-card>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { useNodeStore, NodeData } from '../../../store/medules/nodeStore';

const nodeStore = useNodeStore();

// 定义 nodeInfo，初始值为第一个节点或 null
const nodeInfo = ref<NodeData | null>(null);

// 初始化时，只有在没有节点信息时才赋值
if (nodeStore.nodes.length > 0 && !nodeInfo.value) {
  nodeInfo.value = nodeStore.nodes[0];
}

// 计算属性，将字节转换为 MB
const MemoryInMB = ((data) => {
  return (data / (1024 * 1024)).toFixed(2);
});

// 监听节点数据的变化，更新 nodeInfo
watch(
  () => nodeStore.nodes,
  (newNodes) => {
    if (!nodeInfo.value && newNodes.length > 0) {
      nodeInfo.value = newNodes[0];
    }
  },
  { deep: false }
);

// 切换节点时更新 nodeInfo
const change = (node: NodeData) => {
  // 只有在节点不同于当前选中节点时才更新
  if (nodeInfo.value?.name !== node.name) {
    nodeInfo.value = node;
  }
};

// 假设有 CPU、内存和网络的使用率数据
const cpuUsage = ref(0);
const memoryUsage = ref(0);
const netUsage = ref(0);


if (nodeInfo.value) {
  cpuUsage.value = calculateUsage(nodeInfo.value.total_cpu, nodeInfo.value.allocated_cpu);
  memoryUsage.value = calculateUsage(nodeInfo.value.total_memory, nodeInfo.value.allocated_memory);
  netUsage.value = calculateUsage(nodeInfo.value.total_net, nodeInfo.value.allocated_net);
}

// 示例的使用率计算函数
function calculateUsage(value, allocatedValue): number {
  // 根据实际数据格式计算，这里返回一个示例值
  return (allocatedValue / value) * 100;
}

</script>

<style scoped lang="scss">
.background {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .cpu,
  .memory,
  .net {
    flex-basis: 100%;
    box-sizing: border-box;
    padding: 10px;
  }

  .node {
    width: 100%;
    padding-top: 20px;
  }
}
</style>
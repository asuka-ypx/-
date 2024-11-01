<template>
    <el-card body-class="background">
      <!-- CPU 卡片 -->
      <el-card shadow="hover" class="cpu">
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
                <el-dropdown-item
                  v-for="(node, index) in nodeStore.nodes"
                  :key="index"
                  @click="change(node)"
                >
                  {{ node.nodename }}
                </el-dropdown-item>
              </template>
            </el-dropdown>
          </div>
        </template>
        <el-progress type="circle" :percentage="cpuUsage" />
        <el-descriptions title="CPU">
          <el-descriptions-item label="Name">{{ cpuInfo?.nodename }}</el-descriptions-item>
          <el-descriptions-item label="ID">{{ cpuInfo?.nodeID }}</el-descriptions-item>
          <el-descriptions-item label="CPU 可用容量">{{ cpuInfo?.cpu }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag size="small">{{ cpuInfo?.nodestatus }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
  
      <!-- 内存卡片 -->
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
                <el-dropdown-item
                  v-for="(node, index) in nodeStore.nodes"
                  :key="index"
                  @click="change(node)"
                >
                  {{ node.nodename }}
                </el-dropdown-item>
              </template>
            </el-dropdown>
          </div>
        </template>
        <el-progress type="circle" :percentage="memoryUsage" />
        <el-descriptions title="内存">
          <el-descriptions-item label="Name">{{ cpuInfo?.nodename }}</el-descriptions-item>
          <el-descriptions-item label="ID">{{ cpuInfo?.nodeID }}</el-descriptions-item>
          <el-descriptions-item label="内存可用容量">{{ cpuInfo?.memory }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag size="small">{{ cpuInfo?.nodestatus }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
  
      <!-- 网络卡片 -->
      <el-card shadow="hover" class="net">
        <template #header>
          <div class="card-header">
            <span>网络 信息</span>
            <el-dropdown style="float: right;">
              <span class="el-dropdown-link">
                切换节点
                <el-icon class="el-icon--right">
                  <arrow-down />
                </el-icon>
              </span>
              <template #dropdown>
                <el-dropdown-item
                  v-for="(node, index) in nodeStore.nodes"
                  :key="index"
                  @click="change(node)"
                >
                  {{ node.nodename }}
                </el-dropdown-item>
              </template>
            </el-dropdown>
          </div>
        </template>
        <el-progress type="circle" :percentage="netUsage" />
        <el-descriptions title="网络">
          <el-descriptions-item label="Name">{{ cpuInfo?.nodename }}</el-descriptions-item>
          <el-descriptions-item label="ID">{{ cpuInfo?.nodeID }}</el-descriptions-item>
          <el-descriptions-item label="网络">{{ cpuInfo?.net }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag size="small">{{ cpuInfo?.nodestatus }}</el-tag>
          </el-descriptions-item>
        </el-descriptions>
      </el-card>
  
      <!-- 节点表格 -->
      <el-card style="width: 100%; padding: 10px" height="350" class="node">
        <el-table :data="nodeStore.nodes" height="250" style="width: 100%">
          <el-table-column prop="nodename" label="节点名称" width="180" />
          <el-table-column prop="nodeID" label="节点ID" width="180" />
          <el-table-column prop="nodestatus" label="节点状态" width="180" />
          <el-table-column prop="cpu" label="CPU 可用量" width="180" />
          <el-table-column prop="memory" label="内存可用量" width="180" />
          <el-table-column prop="conditions" label="节点健康状况" width="180" />
          <el-table-column prop="description" label="节点描述" />
        </el-table>
      </el-card>
    </el-card>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue';
  import { useNodeStore, NodeData } from '../../../store/medules/nodeStore';
  
  const nodeStore = useNodeStore();
  
  // 定义 cpuInfo，初始值为第一个节点或 null
  const cpuInfo = ref<NodeData | null>(
    nodeStore.nodes.length > 0 ? nodeStore.nodes[0] : null
  );
  
  // 监听节点数据的变化，更新 cpuInfo
  watch(
    () => nodeStore.nodes,
    (newNodes) => {
      if (!cpuInfo.value && newNodes.length > 0) {
        cpuInfo.value = newNodes[0];
      }
    },
    { deep: true }
  );
  
  // 切换节点时更新 cpuInfo
  const change = (node: NodeData) => {
    cpuInfo.value = node;
  };
  
  // 假设有 CPU、内存和网络的使用率数据
  const cpuUsage = ref(0);
  const memoryUsage = ref(0);
  const netUsage = ref(0);
  
  // 如果有对应的数据，可以计算使用率
  if (cpuInfo.value) {
    cpuUsage.value = calculateUsage(cpuInfo.value.cpu);
    memoryUsage.value = calculateUsage(cpuInfo.value.memory);
    netUsage.value = calculateUsage(cpuInfo.value.net);
  }
  
  // 示例的使用率计算函数
  function calculateUsage(value: string): number {
    // 根据实际数据格式计算，这里返回一个示例值
    return 37;
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
  
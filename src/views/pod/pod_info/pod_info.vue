<template>
  <el-card body-class="background">
    <!-- 容器启动情况卡片 -->
    <el-card shadow="hover" class="cpu" style="margin: 10px;">
      <template #header>
        <div class="card-header">
          <span>CPU使用率</span>

        </div>
      </template>

      <el-progress type="circle" :percentage="calculateCpuUsage()" />
      <!-- <el-progress type="circle" :percentage="calculateMemoryUsage()" /> -->

      <el-dropdown style="float: right;">
        <span class="el-dropdown-link">
          切换 Pod
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-item v-for="(pod, index) in podStore.pods" :key="index" @click="changepod(pod)">
            {{ pod.metadata.name }}
          </el-dropdown-item>
        </template>
      </el-dropdown>

      <el-descriptions :title="podInfo?.metadata.name" border>
        <el-descriptions-item label="Pod Name">
          {{ podInfo?.metadata.name }}
        </el-descriptions-item>
        <el-descriptions-item label="Namespace">
          {{ podInfo?.metadata.namespace }}
        </el-descriptions-item>
        <el-descriptions-item label="Restart Policy">
          {{ podInfo?.spec.restartPolicy }}
        </el-descriptions-item>
        <el-descriptions-item label="Containers">
          <el-table :data="podInfo?.spec.containers || []" style="width: 100%; margin-top: 10px;" size="small">
            <el-table-column prop="name" label="Container Name" width="180" />
            <el-table-column prop="image" label="Image" width="200" />
            <el-table-column label="Resources">
              <template #default="scope">
                <div>
                  <strong>Requests:</strong><br />
                  CPU: {{ scope.row.resources.requests.cpu }}<br />
                  Memory: {{ scope.row.resources.requests.memory }}<br />
                  GPU: {{ scope.row.resources.requests['nvidia.com/gpu'] || '0' }}<br />
                  <strong>Limits:</strong><br />
                  CPU: {{ scope.row.resources.limits.cpu }}<br />
                  Memory: {{ scope.row.resources.limits.memory }}<br />
                  GPU: {{ scope.row.resources.limits['nvidia.com/gpu'] || '0' }}
                </div>
              </template>
            </el-table-column>
            <el-table-column label="Ports">
              <template #default="scope">
                <div v-if="scope.row.ports">
                  <div v-for="(port, index) in scope.row.ports" :key="index">
                    {{ port.containerPort }}
                  </div>
                </div>
                <div v-else>None</div>
              </template>
            </el-table-column>
          </el-table>
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 其他信息卡片 -->
    <el-card shadow="hover" class="memory" style="margin: 10px;">
      <template #header>
        <div class="card-header">
          <span>Pod 资源使用情况</span>
          <el-dropdown style="float: right;">
            <span class="el-dropdown-link">
              切换 Pod
              <el-icon class="el-icon--right">
                <arrow-down />
              </el-icon>
            </span>
            <template #dropdown>
              <el-dropdown-item v-for="(pod, index) in podStore.pods" :key="index" @click="changepod(pod)">
                {{ pod.metadata.name }}
              </el-dropdown-item>
            </template>
          </el-dropdown>
        </div>
      </template>
      <el-descriptions :title="podInfo?.metadata.name" border>
        <el-descriptions-item label="Total CPU Requests">
          {{ totalCpuRequests }} m
        </el-descriptions-item>
        <el-descriptions-item label="Total CPU Limits">
          {{ totalCpuLimits }} m
        </el-descriptions-item>
        <el-descriptions-item label="Total Memory Requests">
          {{ totalMemoryRequests }} MiB
        </el-descriptions-item>
        <el-descriptions-item label="Total Memory Limits">
          {{ totalMemoryLimits }} MiB
        </el-descriptions-item>
        <el-descriptions-item label="Total GPU Requests">
          {{ totalGpuRequests }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>

    <!-- 节点表格 -->
    <el-card style=" margin: 10px;" height="350" class="node">
      <!-- 表格数据源改为 podStore.pods，展示所有 Pods -->
      <el-table :data="podStore.pods" height="250" style="width: 100%">
        <el-table-column prop="metadata.name" label="Pod 名称" width="180" />
        <el-table-column prop="metadata.namespace" label="命名空间" width="180" />
        <el-table-column prop="spec.restartPolicy" label="重启策略" width="180" />
        <el-table-column label="Pod状态" width="180">
          <template #default="scope">
            <el-tag :type="getStatusTagType(scope.row.status?.phase)">
              {{ scope.row.status?.phase || 'Unknown' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="容器列表" min-width="200">
          <template #default="scope">
            <div v-for="(container, index) in scope.row.spec.containers" :key="index">
              Name: {{ container.name }}, Image: {{ container.image }}
            </div>
          </template>
        </el-table-column>
        <!-- 可根据需要添加更多列 -->
      </el-table>
    </el-card>
  </el-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useNodeStore, NodeData } from '../../../store/medules/nodeStore';
import { usePodStore, PodData } from '../../../store/medules/podStore';

const nodeStore = useNodeStore();
const podStore = usePodStore();

// 初始化 cpuInfo，默认选择第一个节点
const cpuInfo = ref<NodeData | null>(null);

// 初始化 podInfo
const podInfo = ref<PodData | null>(null);

// // 根据选定节点过滤对应的 Pods
// const filteredPods = computed(() => {
//   if (cpuInfo.value) {
//     return podStore.pods.filter(
//       // 使用 pod.spec.nodeName 进行过滤
//       (pod) => pod.spec.nodeName === cpuInfo.value?.nodename
//     );
//   }
//   return [];
// });

// 当 filteredPods 或 cpuInfo 变化时，更新 podInfo
// watch(
//   [filteredPods, cpuInfo],
//   () => {
//     if (filteredPods.value.length > 0) {
//       podInfo.value = filteredPods.value[0];
//     } else {
//       podInfo.value = null;
//     }
//   },
//   { immediate: true }
// );

// 默认选择第一个 Pod
watch(() => podStore.pods, (pods) => {
  if (pods.length > 0) {
    podInfo.value = pods[0];
  }
}, { immediate: true });


// 切换 Pod
const changepod = (pod: PodData) => {
  podInfo.value = pod;
};

// 计算总的 CPU 请求和限制
const totalCpuRequests = computed(() => {
  if (podInfo.value) {
    return podInfo.value.spec.containers.reduce((total, container) => {
      const cpuRequest = parseCpu(container.resources.requests.cpu);
      return total + cpuRequest;
    }, 0);
  }
  return 0;
});

const totalCpuLimits = computed(() => {
  if (podInfo.value) {
    return podInfo.value.spec.containers.reduce((total, container) => {
      const cpuLimit = parseCpu(container.resources.limits.cpu);
      return total + cpuLimit;
    }, 0);
  }
  return 0;
});

// 计算总的内存请求和限制
const totalMemoryRequests = computed(() => {
  if (podInfo.value) {
    return podInfo.value.spec.containers.reduce((total, container) => {
      const memRequest = container.resources.requests.memory;
      return total + parseMemory(memRequest);
    }, 0);
  }
  return 0;
});

const totalMemoryLimits = computed(() => {
  if (podInfo.value) {
    return podInfo.value.spec.containers.reduce((total, container) => {
      const memLimit = container.resources.limits.memory;
      return total + parseMemory(memLimit);
    }, 0);
  }
  return 0;
});

// 计算总的 GPU 请求
const totalGpuRequests = computed(() => {
  if (podInfo.value) {
    return podInfo.value.spec.containers.reduce((total, container) => {
      const gpuRequest = parseInt(container.resources.requests.gpu || '0', 10);
      return total + gpuRequest;
    }, 0);
  }
  return 0;
});

// 解析 CPU，支持 "500m" 和 "1" 等格式，返回毫核（m）
function parseCpu(cpu: string): number {
  if (cpu.endsWith('m')) {
    return parseInt(cpu.slice(0, -1), 10);
  }
  return parseFloat(cpu) * 1000;
}

// 解析内存，支持 "256Mi" 和 "1Gi" 等格式，返回 MiB
function parseMemory(memory: string): number {
  if (memory.endsWith('Mi')) {
    return parseInt(memory.slice(0, -2), 10);
  }
  if (memory.endsWith('Gi')) {
    return parseInt(memory.slice(0, -2), 10) * 1024;
  }
  return 0;
}

// 计算 CPU 使用率（示例，实际需要根据节点资源来计算）
function calculateCpuUsage(): number {
  if (podInfo.value?.spec.nodename) {
    const node = nodeStore.nodes.find(node => node.name === podInfo.value?.spec.nodename);
    
    if (node && totalCpuRequests.value) {
      const totalNodeCpu = parseFloat(node.total_cpu) * 1000; // 假设节点的可分配 CPU 是以核为单位
      return (totalCpuRequests.value / totalNodeCpu) * 100;
    }
  }
  return 0;
}

// 计算内存使用率（示例，实际需要根据节点资源来计算）
function calculateMemoryUsage(): number {
  if (totalMemoryRequests.value && cpuInfo.value) {
    const totalNodeMemory = parseMemory(cpuInfo.value.memory);
    return (totalMemoryRequests.value / totalNodeMemory) * 100;
  }
  return 0;
}
//获取status相应的tag
function getStatusTagType(phase: string | undefined): string {
  switch (phase) {
    case 'Running':
      return 'success';
    case 'Pending':
      return 'info';
    case 'Failed':
      return 'danger';
    case 'Succeeded':
      return 'success';
    case 'Unknown':
    default:
      return 'warning';
  }
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
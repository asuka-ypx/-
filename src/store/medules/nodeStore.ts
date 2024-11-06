// store/nodeStore.ts
import { defineStore } from 'pinia';
import { ref, watch, computed } from 'vue';
import { PodData } from './podStore';
export interface NodeData {
  name: string;  // 节点名称
  ip_address: string;  // 节点 IP 地址
  total_cpu: number;  // 总 CPU 数量
  total_memory: number;  // 总内存（单位：MB）
  total_gpu: number;  // 总 GPU 数量
  total_io: number;  // 总 I/O 带宽（单位：MB/s）
  total_net: number;  // 总网络带宽（单位：Mbps）
  allocated_cpu: number;  // 已分配的 CPU 数量
  allocated_memory: number;  // 已分配的内存（单位：MB）
  allocated_gpu: number;  // 已分配的 GPU 数量
  allocated_io: number;  // 已分配的 I/O 带宽（单位：MB/s）
  allocated_net: number;  // 已分配的网络带宽（单位：Mbps）
  cpu_usage_ratio: number;  // CPU 使用率
  memory_usage_ratio: number;  // 内存使用率
  pods?: PodData[];  // 节点上运行的 Pods 名称数组
  status: string;  // 节点状态，例如 "Ready"
  labels?: { [key: string]: string };  // 标签，键值对形式
  annotations?: { [key: string]: string };  // 注解，键值对形式
}


export const useNodeStore = defineStore('nodeStore', () => {
  // 使用 ref 定义响应式节点数据
  const nodes = ref<NodeData[]>([]);

  // 从 localStorage 加载节点数据（如果存在）
  const storedNodes = localStorage.getItem('nodeStore');
  if (storedNodes) {
    nodes.value = Object.values(JSON.parse(storedNodes));
  }

  // 监听 nodes 的变化，并在每次变化时保存到 localStorage
  watch(
    nodes,
    (newNodes) => {
      localStorage.setItem('nodeStore', JSON.stringify(newNodes));
    },
    { deep: true }
  );

  // 定义添加节点的 action
  const addNode = (newNode: NodeData) => {
    nodes.value.push(newNode);
  };

  // 根据 nodeID 删除节点的函数
  const removeNode = (nodeName: string) => {
    nodes.value = nodes.value.filter((node) => node.name !== nodeName);
  };

  // 新增：计算节点数量的计算属性
  const nodeCount = computed(() => nodes.value.length);

  // 返回数据和方法
  return { nodes, addNode, removeNode, nodeCount };
});

// store/nodeStore.ts
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { PodData } from './podStore';
export interface NodeData {
  nodename: string;
  nodeID: string;
  nodestatus: string;
  cpu: string;
  memory: string;
  gpu: string;
  pods?: PodData[];
  conditions: string;
  description?: string;
}

export const useNodeStore = defineStore('nodeStore', () => {
  // 使用 ref 定义响应式节点数据
  const nodes = ref<NodeData[]>([]);

  // 从 localStorage 加载节点数据（如果存在）
  const storedNodes = localStorage.getItem('nodeStore');
  if (storedNodes) {
    nodes.value = JSON.parse(storedNodes);
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
  const removeNode = (nodeID: string) => {
    nodes.value = nodes.value.filter((node) => node.nodeID !== nodeID);
  };

  // 返回数据和方法
  return { nodes, addNode, removeNode };
});

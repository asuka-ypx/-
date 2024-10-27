// store/nodeStore.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';

export interface NodeData {
    nodename: string;
    nodeID: string;
    nodestatus: string;
    cpu: string;
    memory: string;
    conditions: string;
    description?: string;
}

export const useNodeStore = defineStore('nodeStore', () => {
    // 使用 ref 定义响应式节点数据
    const nodes = ref<NodeData[]>([]);

    // 定义添加节点的 action
    const addNode = (newNode: NodeData) => {
        nodes.value.push(newNode);
    };
    // 根据 nodeID 删除节点的函数
    const removeNode = (nodeID: string) => {
        nodes.value = nodes.value.filter(node => node.nodeID !== nodeID);
    };
    // 返回数据和方法
    return { nodes, addNode, removeNode };
});

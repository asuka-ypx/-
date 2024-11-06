// store/podStore.ts
import { defineStore } from 'pinia';
import { ref, watch,computed } from 'vue';
import { useNodeStore } from './nodeStore';
// 定义 PodData 接口（保持不变）
export interface PodData {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    nodename?: string;  // 添加 nodeName 属性
    containers: Array<{
      name: string;
      image: string;
      resources: {
        requests: {
          cpu: string;
          memory: string;
          gpu?: string;
        };
        limits: {
          cpu: string;
          memory: string;
          gpu?: string;
        };
      };
      ports?: Array<{
        containerPort: number;
      }>;
    }>;
    restartPolicy: string;
  };
  status?: {
    phase: string;
    // 可以添加其他状态字段，如 conditions、hostIP 等
  };
}

// 定义 podStore
export const usePodStore = defineStore('podStore', () => {
  // 初始化 pods 数据
  const pods = ref<PodData[]>([]);
  const nodeStore = useNodeStore();

  // 从 localStorage 加载已存储的 Pods
  const loadPods = () => {
    const storedPods = localStorage.getItem('pods');
    if (storedPods) {
      try {
        pods.value = JSON.parse(storedPods);
      } catch (error) {
        console.error('从 localStorage 解析 pods 失败', error);
      }
    } else {
      // 如果没有存储的 pods，则使用默认的 pods
      pods.value = [
        {
          apiVersion: "v1",
          kind: "Pod",
          metadata: {
            name: "example-pod",
            namespace: "default"
          },
          spec: {
            nodename: "test",  // 确保与节点的 nodename 匹配
            containers: [
              // 容器列表
            ],
            restartPolicy: "Always"
          }
        },
        // 可以添加更多 Pods
      ];
    }
  };

  loadPods(); // 初始化时加载数据

  // 监听 pods 的变化，并保存到 localStorage
  watch(
    pods,
    (newPods) => {
      localStorage.setItem('pods', JSON.stringify(newPods));
    },
    { deep: true }
  );

  // 添加和删除 Pod 的方法（保持不变）
  const addPod = (newPod: PodData) => {
    if (!newPod.status) {
      newPod.status = { phase: 'Pending' }; // 设置默认状态为 Pending
    }
    pods.value.push(newPod);
  };

  const removePod = (podName: string) => {
    pods.value = pods.value.filter((pod) => pod.metadata.name !== podName);
  };

  // 更新 Pod 的节点名
  // const updatePodNode = (podName: string, nodeName: string) => {
  //   const pod = pods.value.find(p => p.metadata.name === podName);
  //   const node = nodeStore.nodes.find(n => n.nodename === nodeName);

  //   if (pod) {
  //     if (node) { // 检查 node 是否存在
  //       node.pods = node.pods || []; // 确保 node.pods 存在
  //       node.pods.push(pod); // 将 pod 添加到节点的 pods 列表中
  //     } else {
  //       console.warn(`Node with name ${nodeName} not found.`);
  //     }

  //     pod.spec.nodename = nodeName; // 更新 Pod 的节点名
  //   } else {
  //     console.warn(`Pod with name ${podName} not found.`);
  //   }
  // };
  // 获取 Pod 的数量
  const getPodCount = computed(() => pods.value.length);
 
  // 返回数据和方法
  return { pods, addPod, removePod, getPodCount };
});

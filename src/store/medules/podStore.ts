// store/podStore.ts
import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

// 定义 PodData 接口（保持不变）
export interface PodData {
  apiVersion: string;
  kind: string;
  metadata: {
    name: string;
    namespace: string;
  };
  spec: {
    nodeName: string;  // 添加 nodeName 属性
    containers: Array<{
      name: string;
      image: string;
      resources: {
        requests: {
          cpu: string;
          memory: string;
          'nvidia.com/gpu'?: string;
        };
        limits: {
          cpu: string;
          memory: string;
          'nvidia.com/gpu'?: string;
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
            nodeName: "test",  // 确保与节点的 nodename 匹配
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

  // 返回数据和方法
  return { pods, addPod, removePod };
});

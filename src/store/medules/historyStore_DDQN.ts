import { defineStore } from "pinia";
import { ref } from "vue";

// 定义 scheduleHistory 数据的接口
export interface ScheduleItem__DDQN {
  pod_name: string;
  node_name: string;
  reward: number;
  timestamp: string;
}

export const useHistoryStore_DDQN = defineStore("historyStore_DDQN", () => {
  // 定义响应式数据
  const scheduleHistory = ref<ScheduleItem__DDQN[]>([]);

  // Action: 更新历史数据
  const setHistory = (data: ScheduleItem__DDQN[]) => {
    scheduleHistory.value = data;
  };

  // Getter: 获取历史数据
  const getHistory = () => scheduleHistory.value;

  return {
    scheduleHistory,
    setHistory,
    getHistory,
  };
});

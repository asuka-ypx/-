<template>
  <div>
    <!-- DDQN Reward 折线图 -->
    <div id="chartDDQN" style="width: 100%; height: 600px;"></div>
    <p></p><p></p><p></p><p></p>
    <!-- Kube Reward 折线图 -->
    <div id="chartKube" style="width: 100%; height: 600px;"></div>
    <p></p><p></p><p></p><p></p>
    <!-- 奖励总和柱状图 -->
    <div id="chartRewardSum" style="width: 100%; height: 400px;"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watchEffect } from "vue";
import * as echarts from "echarts";
import { useHistoryStore_DDQN } from '../store/medules/historyStore_DDQN'
import { useHistoryStore_kube } from '../store/medules/historyStore_kube'
import { watch } from "vue";// 定义数据接口
interface ScheduleHistoryItem {
  pod_name: string;
  node_name: string;
  reward: number;
  timestamp: string;
}

export default defineComponent({
  name: "DynamicLineCharts",
  setup() {
    // 定义 ECharts 实例
    const chartDDQN = ref<echarts.ECharts | null>(null);
    const chartKube = ref<echarts.ECharts | null>(null);
    const chartRewardSum = ref<echarts.ECharts | null>(null);

    // 从 Pinia Store 获取数据
    const historyStore_DDQN = useHistoryStore_DDQN();
    const historyStore_kube = useHistoryStore_kube();

    // 使用 ref 存储数据
    const scheduleHistory_DDQN = ref<ScheduleHistoryItem[]>(historyStore_DDQN.getHistory());
    const scheduleHistory_kube = ref<ScheduleHistoryItem[]>(historyStore_kube.getHistory());

    // 获取时间戳和奖励值的函数
    const timestamps = (history: ScheduleHistoryItem[]) => history.map(item => item.timestamp);
    const rewards = (history: ScheduleHistoryItem[]) => history.map(item => item.reward);

    // 计算奖励总和
    const totalReward = (history: ScheduleHistoryItem[]) => {
      return history.reduce((sum, item) => sum + item.reward, 0);
    };
    // 更新图表数据
    const updateChartDDQN = () => {
      if (!chartDDQN.value) return;
      chartDDQN.value.setOption({
        xAxis: {
          data: timestamps(scheduleHistory_DDQN.value), // 时间戳来自 DDQN 数据
        },
        series: [
          {
            name: "DDQN Reward",
            type: "line",
            data: rewards(scheduleHistory_DDQN.value),
            smooth: true,
            areaStyle: {},
          },
        ],
      });
    };

    const updateChartKube = () => {
      if (!chartKube.value) return;
      chartKube.value.setOption({
        xAxis: {
          data: timestamps(scheduleHistory_kube.value), // 时间戳来自 Kube 数据
        },
        series: [
          {
            name: "Kube Reward",
            type: "line",
            data: rewards(scheduleHistory_kube.value),
            smooth: true,
            areaStyle: {},
          },
        ],
      });
    };
    // 更新奖励总和柱状图
    const updateChartRewardSum = () => {
      if (!chartRewardSum.value) return;
      const totalDDQN = totalReward(scheduleHistory_DDQN.value);
      const totalKube = totalReward(scheduleHistory_kube.value);

      chartRewardSum.value.setOption({
        xAxis: {
          type: "category",
          data: ["DDQN", "Kube"],
        },
        yAxis: {
          type: "value",
          name: "Reward 总和",
          min: 30,
        },
        series: [
          {
            name: "Reward Sum",
            type: "bar",
            data: [totalDDQN, totalKube],
            itemStyle: {
              color: '#73C9E5', // 设置柱状图颜色
            },
          },
        ],
      });
    };

    // 初始化图表
    const initCharts = () => {
      const chartDomDDQN = document.getElementById("chartDDQN");
      const chartDomKube = document.getElementById("chartKube");
      const chartDomRewardSum = document.getElementById("chartRewardSum");

      if (!chartDomDDQN || !chartDomKube || !chartDomRewardSum) return;

      chartDDQN.value = echarts.init(chartDomDDQN);
      chartKube.value = echarts.init(chartDomKube);
      chartRewardSum.value = echarts.init(chartDomRewardSum);

      // 设置图表的初始配置
      const optionDDQN: echarts.EChartsOption = {
        title: {
          text: "DDQN Reward 动态变化折线图",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          // formatter: (params) => {
          //   if (!Array.isArray(params) || params.length === 0) return "";
          //   const { dataIndex } = params[0];
          //   const historyDDQN = scheduleHistory_DDQN.value[dataIndex];
          //   return `
          //     时间: ${historyDDQN.timestamp}<br>
          //     Pod 名称: ${historyDDQN.pod_name}<br>
          //     节点: ${historyDDQN.node_name}<br>
          //     DDQN 奖励: ${historyDDQN.reward}
          //   `;
          // },
          show: true,
        },
        xAxis: {
          type: "category",
          data: timestamps(scheduleHistory_DDQN.value), // 时间戳来自 DDQN 数据
          name: "时间",
          axisLabel: {
            rotate: 45, // 避免时间戳重叠
          },
          axisPointer: {
            type: "line" // 坐标轴��影
          },
        },
        yAxis: {
          type: "value",
          name: "Reward",
          min: 1.1,   // 设置Y轴的最小值
          max: 1.6,   // 设置Y轴的最大值
        },
        series: [
          {
            name: "DDQN Reward",
            type: "line",
            data: rewards(scheduleHistory_DDQN.value),
            smooth: true,
            areaStyle: {},
            encode: {
              x: 'Times',
              y: 'Reward',
              itemName: 'Pod',
              tooltip: ['Reward']
            }
          },

        ],
      };

      const optionKube: echarts.EChartsOption = {
        title: {
          text: "Kube Reward 动态变化折线图",
          left: "center",
        },
        tooltip: {
          trigger: "axis",
          // formatter: (params) => {
          //   if (!Array.isArray(params) || params.length === 0) return "";
          //   const { dataIndex } = params[0];
          //   const historyDDQN = scheduleHistory_DDQN.value[dataIndex];
          //   return `
          //     时间: ${historyDDQN.timestamp}<br>
          //     Pod 名称: ${historyDDQN.pod_name}<br>
          //     节点: ${historyDDQN.node_name}<br>
          //     DDQN 奖励: ${historyDDQN.reward}
          //   `;
          // },
        },

        xAxis: {
          type: "category",
          data: timestamps(scheduleHistory_kube.value), // 时间戳来自 Kube 数据
          name: "时间",
          axisLabel: {
            rotate: 45, // 避免时间戳重叠
          },
        },
        yAxis: {
          type: "value",
          name: "Reward",
          min: 1.1,   // 设置Y轴的最小值
          max: 1.6,   // 设置Y轴的最大值
        },
        series: [
          {
            name: "Kube Reward",
            type: "line",
            data: rewards(scheduleHistory_kube.value),
            smooth: true,
            areaStyle: {},
          },
        ],
      };

      // 设置图表选项
      chartDDQN.value.setOption(optionDDQN);
      chartKube.value.setOption(optionKube);
      updateChartRewardSum();  // 初始化时更新柱状图
    };

    // 使用 watchEffect 或者 watch 来监听数据变化
    watch(
      () => historyStore_DDQN.getHistory(),
      (newHistory) => {
        scheduleHistory_DDQN.value = newHistory;
        updateChartDDQN();  // 更新图表
      }
    );

    watch(
      () => historyStore_kube.getHistory(),
      (newHistory) => {
        scheduleHistory_kube.value = newHistory;
        updateChartKube();  // 更新图表
      }
    );

    watch(
      () => scheduleHistory_kube.value,
      () => {
        updateChartKube();  // 更新 Kube 折线图
        updateChartRewardSum();  // 更新柱状图
      }
    );

    // 在组件挂载后初始化图表
    onMounted(() => {
      initCharts();
    });

    return {};
  },
});
</script>

<style scoped>
#chartDDQN,
#chartKube {
  margin: 0 auto;
  width: 100%;
  height: 400px;
  /* 设置为更大的高度 */
}
</style>

<template>
    <el-card style="height: 100%;">
        <!-- 展示登录信息 -->
        <!-- 柱状图展示数据 -->

        <div class="show">
            <p style="font-size: 40px;padding: 20px 0px;">欢迎使用多智能体调度优化引擎</p>
            <div class="user_info" style="display: flex; ">
                <img src="../../../public/logo.svg" class="user_img">
                <div style="padding: 10px;">
                    <p class="username" style="font-size: 20px;padding: 5px;"><el-icon>
                            <User />
                        </el-icon>用户名：{{ userStore.username }}
                    </p>
                    <p class="currenttime" style="font-size: 20px;padding: 5px;">登录时间：{{ now }}</p>
                </div>
            </div>
            <div class="echart" id="mychart" :style="myChartStyle"></div>
        </div>
    </el-card>
</template>

<script setup lang="ts">
//引入组合式API函数
import { onMounted, ref } from 'vue';
import useUserStore from '../../store/medules/user';
import { currentTime } from '../../utils/currentTime';
import { useNodeStore } from '../../store/medules/nodeStore';
import { usePodStore } from '../../store/medules/podStore';
import * as echarts from "echarts";

let userStore = useUserStore();

let now = currentTime()
const myChartStyle = ref<{ [key: string]: string }>({
    float: "left",
    width: "30%",
    height: "400px"
}); // 图表样式


let nodecount = useNodeStore().nodeCount;
let podcount = usePodStore().getPodCount;

onMounted(() => {
    userStore.userInfo();
    initEcharts();
    setInterval(() => {
        now = currentTime(); // 每秒更新一次时间
    }, 1000);
})
// ECharts初始化函数
const initEcharts = () => {
    const myChart = echarts.init(document.getElementById('mychart') as HTMLElement);
    const option: echarts.EChartOption = {
        xAxis: {
            data: ["已经创建的节点", "已创建的Pod"]
        },
        yAxis: {},
        series: [
            {
                type: "bar", // 图表类型：柱状图
                data: [nodecount, podcount]
            }
        ]
    };
    myChart.setOption(option);

    // 响应式调整图表
    window.addEventListener('resize', () => {
        myChart.resize();
    });
};
//获取仓库

</script>

<style scoped>
.show{
    margin-top: 50px;
    margin-left: 150px;
}
.user_img {
    width: 100px;
    height: 100px;
    padding: 10px;
    padding-top: 15px;
}

.user_info {
    margin: 10px;
}

.now {
    margin: 10px;
}
</style>
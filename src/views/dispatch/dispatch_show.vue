<template>
    <el-card >
        <p>调度详情</p>
        <el-button @click="setting" type="primary">调度模拟</el-button>
        <el-dialog v-model="show" title="调度模拟">
            <main>
                <p>模拟25个pod调度到10个node上</p>
            </main>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="show = false">Cancel</el-button>
                    <el-button type="primary" @click="confirm"> Confirm </el-button>
                </span>
            </template>
        </el-dialog>
        <el-card>
            <DynamicLineChart  />
        </el-card>

    </el-card>
</template>

<script setup>
import { defineComponent } from "vue";
import DynamicLineChart from "../../utils/ECharts.vue";
import { useHistoryStore_DDQN } from '../../store/medules/historyStore_DDQN'
import { useHistoryStore_kube } from '../../store/medules/historyStore_kube'
import axios from 'axios';

import { ref } from 'vue';
const result = ref(false)
const show = ref(false)
const historyStore_DDQN = useHistoryStore_DDQN();
const historyStore_kube = useHistoryStore_kube();
const setting = () => {
    show.value = true;
}
const confirm = async () => {
    //点击按钮后获取测试后返回的数据
    const apiUrl = import.meta.env.VITE_APP_SERVER_URL;
    const result_DDQN = await axios.get(apiUrl + '/DDQN_schedule_history')
    const result_kube = await axios.get(apiUrl + '/kube_schedule_history')
    console.log(result_DDQN.data.schedule_history)
    historyStore_DDQN.setHistory(result_DDQN.data.schedule_history)
    historyStore_kube.setHistory(result_kube.data.schedule_history)

    show.value = false;
    //获取信息
    result.value = true; // 算法测试结果
}




</script>

<style lang="scss" scoped>
</style>
<template>
    <el-card>
        <el-timeline style="max-width: 600px;left:50px" center="true">
            <el-timeline-item :timestamp="currentTime()" placement="top" center="true">
                <el-card>
                    <h4>向服务器发送调度请求</h4>
                    <p>{{ stepMessages.step1 }} </p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item :timestamp="currentTime()" placement="top" center="true">
                <el-card>
                    <h4>调度进行中</h4>
                    <p>{{ stepMessages.step2 }} </p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item :timestamp="currentTime()" placement="top" center="true">
                <el-card>
                    <h4>返回结果</h4>
                    <p>{{ stepMessages.step3 }} </p>
                </el-card>
            </el-timeline-item>
        </el-timeline>
        <el-button type="primary" size="larger" @click="click = true">open a dialog</el-button>
        <el-dialog v-model="click" title="测试" style="width: 500px;">
            <el-form :model="form" style="max-width: 800px">
                <el-form-item label="调度任务">
                    <el-select v-model="form.pod" placeholder="选择需要执行的任务" multiple>
                        <el-option v-for="(pod, index) in pendingPods" :key="index" :label="pod.metadata.name"
                            :value="pod.metadata.name" />
                    </el-select>
                </el-form-item>
                <el-form-item label="调度方法">
                    <el-select v-model="form.function" placeholder="调度方法">
                        <el-option label="DDQN_scheduler" value="function1" />
                        <el-option label="kube_scheduler" value="function2" />
                        <el-option label="random_scheduler" value="function3" />
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="click = false">Cancel</el-button>
                    <el-button type="primary" @click="submitForm"> Confirm </el-button>
                </span>
            </template>
        </el-dialog>

    </el-card>

</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { currentTime } from '../../utils/currentTime';
import { usePodStore } from '../../store/medules/podStore';
import axios from 'axios';

//获取podStore
const podStore = usePodStore();
//筛选pods
const pendingPods = computed(() => {
    return podStore.pods.filter(pod => pod.status?.phase === 'Pending');
});
// 定义为响应式变量
const form = reactive({
    pod: '',
    function: '',
    //
})
const click = ref(false)

// 定义一个响应式变量用于存储调度结果
const scheduleResult = ref('');

// 定义一个响应式变量用于追踪步骤
const currentStep = ref(0);

const stepMessages = reactive({
    step1: '正在向服务器发送请求...',
    step2: '调度任务正在进行中...',
    step3: '',
});

// 提交调度任务函数
const submitForm = async () => {
    try {
        // 第一步：发送请求
        currentStep.value = 1;
        const responseStep1 = await axios.post('http://localhost:8000/api/schedule', {
            pod: form.pod,
            function: form.function,
        });

        stepMessages.step1 = responseStep1.data.message || '服务器已接收到调度请求';
        console.log('调度请求成功：', responseStep1.data);

        // 第二步：调度进行中
        currentStep.value = 2;
        const responseStep2 = await axios.get('http://localhost:8000/api/schedule/progress', {
            params: {
                pod: form.pod,
            },
        });

        stepMessages.step2 = responseStep2.data.progress || '调度任务进行中...';
        console.log('调度进行中：', responseStep2.data);

        // 第三步：返回结果
        currentStep.value = 3;
        const responseStep3 = await axios.get('http://localhost:8000/api/schedule/result', {
            params: {
                pod: form.pod,
            },
        });

        stepMessages.step3 = responseStep3.data.result || '调度成功';
        console.log('调度结果：', responseStep3.data);
        click.value = false; // 关闭对话框
    } catch (error) {
        console.error('调度请求失败：', error);
        stepMessages.step3 = '调度请求失败，请重试'; // 更新调度结果信息
        currentStep.value = 3; // 即使失败也将步骤设置为3以显示结果
    }
};

</script>

<style scoped>
h4 {
    font-size: larger;
}
</style>
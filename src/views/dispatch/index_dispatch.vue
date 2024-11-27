<template>
    <!-- 调度管理 -->
    <el-card>

        <!-- 调度过程卡片 -->
        <el-card style="margin: 10px;" shadow="hover">
            <el-timeline style="max-width: 600px;left:50px" center="true">
                <el-timeline-item :timestamp="currentTime()" placement="top" center="true">
                    <el-card>
                        <h4>向服务器发送调度请求</h4>
                        <p>{{ stepMessages.step1 }} </p>
                    </el-card>
                </el-timeline-item>
                <el-timeline-item :timestamp="currentTime()" placement="top" center="true">
                    <el-card>
                        <h4>调度进程</h4>
                        <el-progress :percentage="progress1" :indeterminate="indeterminate1" :status="status1" />
                    </el-card>
                </el-timeline-item>
                <el-timeline-item :timestamp="currentTime()" placement="top" center="true">
                    <el-card>
                        <h4>返回结果</h4>
                        <p>{{ stepMessages.step3 }} </p>
                    </el-card>
                </el-timeline-item>
            </el-timeline>
            <el-button type="primary" size="larger" @click="click = true">调度设置</el-button>
        </el-card>
        <!-- 调度设置弹窗 -->
        <el-dialog v-model="click" title="测试" style="width: 500px;">
            <el-form :model="form" style="max-width: 800px">
                <el-form-item label="调度任务">
                    <el-select v-model="form.pod" placeholder="选择需要执行的任务" multiple>
                        <el-option v-for="(pod, index) in podStore.pods" :key="index" :label="pod.metadata.name"
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
        <!-- 调度结果卡片 -->
        <el-card style="margin: 10px;" shadow="hover">
            <h4>调度结果</h4>
            <el-card v-for="(node, index) in nodeStore.nodes " :key="index" shadow="hover" style="margin: 10px;">
                <h5>{{ node.name }}节点</h5>
                <el-card v-for="(pod, index) in node.pods" :key="index" shadow="hover" style="width:60%">
                    <el-collapse>
                        <el-collapse-item :title="pod?.metadata.name">
                            <el-descriptions border>
                                <el-descriptions-item label="Pod Name">
                                    {{ pod?.metadata.name }}
                                </el-descriptions-item>
                                <el-descriptions-item label="Namespace">
                                    {{ pod?.metadata.namespace }}
                                </el-descriptions-item>
                                <el-descriptions-item label="Restart Policy">
                                    {{ pod?.spec.restartPolicy }}
                                </el-descriptions-item>
                                <el-descriptions-item label="Containers">
                                    <el-table :data="pod?.spec.containers || []" style="width: 100%; margin-top: 10px;"
                                        size="small">
                                        <el-table-column prop="name" label="Container Name" width="180" />
                                        <el-table-column prop="image" label="Image" width="200" />
                                        <el-table-column label="Resources">
                                            <template #default="scope">
                                                <div>
                                                    <strong>Requests:</strong><br />
                                                    CPU: {{ scope.row.resources.requests.cpu }}<br />
                                                    Memory: {{ scope.row.resources.requests.memory }}<br />
                                                    GPU: {{ scope.row.resources.requests['nvidia.com/gpu'] || '0'
                                                    }}<br />
                                                    <strong>Limits:</strong><br />
                                                    CPU: {{ scope.row.resources.limits.cpu }}<br />
                                                    Memory: {{ scope.row.resources.limits.memory }}<br />
                                                    GPU: {{ scope.row.resources.limits['nvidia.com/gpu'] || '0' }}
                                                </div>
                                            </template>
                                        </el-table-column>
                                        <el-table-column label="Ports">
                                            <template #default="scope">
                                                <div v-if="scope.row.ports">
                                                    <div v-for="(port, index) in scope.row.ports" :key="index">
                                                        {{ port.containerPort }}
                                                    </div>
                                                </div>
                                                <div v-else>None</div>
                                            </template>
                                        </el-table-column>
                                    </el-table>
                                </el-descriptions-item>
                            </el-descriptions>
                        </el-collapse-item>
                    </el-collapse>
                </el-card>
            </el-card>
        </el-card>
    </el-card>


</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from 'vue';
import { currentTime } from '../../utils/currentTime';
import { usePodStore } from '../../store/medules/podStore';
import { useNodeStore } from '../../store/medules/nodeStore';
import axios from 'axios';

let intervalId = null;

//获取podStore
const podStore = usePodStore();
//获取nodeStore
const nodeStore = useNodeStore();
//筛选pods
// const pendingPods = computed(() => {
//     return podStore.pods.filter(pod => pod.metadata.status === 'Pending');
// });
// 定义为响应式变量
const form = reactive({
    pod: [] as string[], // 初始化为字符串数组
    function: '',
    //
})

const click = ref(false)

// 定义一个响应式变量用于存储调度结果
const scheduleResult = ref('');

// 定义一个响应式变量用于追踪步骤
const currentStep = ref(0);

let progress1 = ref(0)
let status1 = ref("warrning")
let indeterminate1 = ref(true)
const stepMessages = reactive({
    step1: '正在向服务器发送请求...',
    step2: '调度任务正在进行中...',
    step3: '',
});


// 提交调度任务函数
const submitForm = async () => {
    click.value = false;
    try {
        console.log(form.pod)
        // 第一步：发送请求
        currentStep.value = 1;

        // 获取选中的 pod 信息并格式化
        const selectedPods = form.pod.map(podName => {
            const pod = podStore.pods.find(p => p.metadata.name === podName);
            if (pod) {
                return {
                    apiVersion: "v1",
                    kind: "Pod",
                    metadata: {
                        name: pod.metadata.name,
                        namespace: pod.metadata.namespace || "default",
                        status: pod.metadata.status || "pending"
                    }
                };
            }
            return null;
        }).filter(pod => pod !== null);

        console.log(selectedPods)

        // 向服务器发送 POST 请求，提交任务
        const apiUrl = import.meta.env.VITE_APP_SERVER_URL; // Vite 的用法
        console.log("apiurl",apiUrl)
        const responseStep1 = await axios.post(apiUrl+'/DDQN_schedule', selectedPods
            // function: form.function,
        );
        console.log("结果返回", responseStep1)

        // stepMessages.step1 = responseStep1.data.message || '服务器已接收到调度请求';
        // console.log('调度请求成功：', responseStep1.data);


    } catch (error) {
        clearInterval(intervalId); // 清除定时器
        console.error('调度请求失败：', error);
        stepMessages.step3 = '调度请求失败，请重试'; // 更新调度结果信息
        currentStep.value = 3; // 即使失败也将步骤设置为3以显示结果
    }
};


onUnmounted(() => {
    if (intervalId) {
        clearInterval(intervalId);
    }
});

</script>

<style scoped>
h4 {
    font-size: larger;
}
</style>
<template>
    <!-- 节点管理 -->
    <el-card>
        <el-table :data="nodeStore.nodes" style="width: 100%" shadow="hover">
            <el-table-column label="节点名称" prop="name" />
            <el-table-column label="节点状态" prop="status" />
            <el-table-column label="节点cpu容量" prop="total_cpu" />
            <el-table-column label="节点内存容量" prop="total_memory" />
            <el-table-column align="right">
                <template #header>
                    <el-button plain @click="open = true">添加节点</el-button>
                    <el-dialog v-model="open" title="添加节点" :append-to-body="true" style="width: 600px;">
                        <div>
                            <span>节点名称</span>
                            <el-input v-model="requestParams.name" placeholder="请输入节点名字"
                                style="width:80%;margin: 15px;" />
                        </div>
                        <div>
                            <span>节点地址</span>
                            <el-input v-model="requestParams.ip_address" placeholder="请输入节点IP"
                                style="width:80%;margin: 15px;"></el-input>
                        </div>

                        <template #footer>
                            <span class="dialog-footer">
                                <el-button @click="open = false">Cancel</el-button>
                                <el-button type="primary" @click="addnode"> Confirm </el-button>
                            </span>
                        </template>
                    </el-dialog>
                </template>

                <template #default="scope">
                    <el-button size="small" type="danger" @click="handleDelete(scope.row)">
                        Delete
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
//导入pinia仓库中数据
import { useNodeStore, NodeData } from '../../../store/medules/nodeStore';

const nodeStore = useNodeStore();

const open = ref(false)

// 输入信息的数据模型
const requestParams = ref({
    name: '',
    ip_address: '',
    labels: {
    },
    annotations: {
    }
});

setTimeout(async () => {
    nodeStore.$reset();
    const apiUrl = import.meta.env.VITE_APP_SERVER_URL; // Vite 的用法
    const Nodes = await axios.get(apiUrl + "/nodes");
    console.log("获取所有节点的信息", Nodes)
    
    // 获取 Pinia 中已存在的节点
    const existingNodes = nodeStore.nodes;
    // 将服务器返回的节点对象转换为数组
    const allNodes = Object.values(Nodes.data.nodes);

    console.log(allNodes)

    // 将从服务器获取的节点添加到 Pinia 中，但只添加没有的节点
    allNodes.forEach((newNode) => {
        const exists = existingNodes.some((node) => node.name === newNode.name);
        if (!exists) {
            nodeStore.addNode(newNode);  // 如果节点不存在，则添加到 Pinia 中
        }
    });
}, 1500)

const addnode = async () => {

    const requestData = JSON.stringify(requestParams.value);
    console.log("发送的节点信息", requestData);
    const apiUrl = import.meta.env.VITE_APP_SERVER_URL; // Vite 的用法
    const response = await axios.post(apiUrl + "/nodes", requestData);
    //URL为服务器地址 @app.route('/nodes', methods=['POST'])
    //结果返回为return response.json({'message': f"Node '{name}' added successfully."}, status=201)
    console.log("post后返回的response", response)
    //获取所有节点信息  @app.route('/nodes', methods=['GET'])
    const Nodes = await axios.get(apiUrl + "/nodes");
    console.log("获取所有节点的信息", Nodes)

    // 获取 Pinia 中已存在的节点
    const existingNodes = nodeStore.nodes;
    // 将服务器返回的节点对象转换为数组
    const allNodes = Object.values(Nodes.data.nodes);

    console.log(allNodes)

    // 将从服务器获取的节点添加到 Pinia 中，但只添加没有的节点
    allNodes.forEach((newNode) => {
        const exists = existingNodes.some((node) => node.name === newNode.name);
        if (!exists) {
            nodeStore.addNode(newNode);  // 如果节点不存在，则添加到 Pinia 中
        }
    });

    // 打印 Pinia 中当前的节点信息
    console.log("节点小仓库信息", nodeStore.nodes);
    open.value = false;
}

const handleDelete = (node: NodeData) => {
    ElMessageBox.confirm(`确定要删除节点 ${node.name} 吗？`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(async () => {
        nodeStore.removeNode(node.name);
        const apiUrl = import.meta.env.VITE_APP_SERVER_URL; // Vite 的用法
        const deletenode = await axios.delete(apiUrl + `/nodes/${node.name}`);
        console.log("删除节点的返回结果", deletenode);
        ElMessage({
            type: 'success',
            message: '节点已成功删除',
        });
    }).catch(() => {
        ElMessage({
            type: 'info',
            message: '取消删除',
        });
    });

}
</script>



<style scoped></style>
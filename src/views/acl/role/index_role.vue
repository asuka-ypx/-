<template>
    <el-card>
        <el-table :data="nodeStore.nodes" style="width: 100%" shadow="hover">
            <el-table-column label="节点名称" prop="nodename" />
            <el-table-column label="节点ID" prop="nodeID" />
            <el-table-column label="节点状态" prop="nodestatus" />
            <el-table-column label="节点cpu容量" prop="cpu" />
            <el-table-column label="节点内存容量" prop="memory" />
            <el-table-column align="right">
                <template #header>
                    <el-button plain @click="open">添加节点</el-button>
                    <el-dialog title="输入请求信息" v-model="showRequestForm">
                        <el-form :model="requestParams">
                            <el-form-item label="节点名称">
                                <el-input v-model="requestParams.nodename" />
                            </el-form-item>
                            <el-form-item label="节点类型">
                                <el-input v-model="requestParams.nodeType" />
                            </el-form-item>
                            <!-- 其他必要的输入项 -->
                        </el-form>
                        <template #footer>
                            <el-button @click="showRequestForm = false">取消</el-button>
                            <el-button type="primary" @click="fetchNodeInfo">确定</el-button>
                        </template>
                    </el-dialog>
                </template>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">
                        Edit
                    </el-button>
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
import { tableData } from '../../../data/data_node';
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
//导入pinia仓库中数据
import { useNodeStore, NodeData } from '../../../store/medules/nodeStore';

const nodeStore = useNodeStore();


// 输入信息的数据模型
const requestParams = ref({
    nodename: '',
    nodeType: ''
});
const open = async () => {
    ElMessageBox.prompt('请输入节点的IP地址', '添加节点', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        // inputPattern:
        //   /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        // inputErrorMessage: 'Invalid Email',
    })
        .then(async ({ value }) => {
            try {
                // 假设后端请求地址为 /api/get-node-info
                const response = await axios.post(value, requestParams.value);

                // 假设后端返回的数据结构为 { data: { nodename, nodeID, ... } }
                const newNode: NodeData = response.data.data;

                // 将新节点数据添加到表格数据中
                nodeStore.addNode(newNode);
                console.log(nodeStore.nodes);

            } catch (error) {
                console.error("获取节点信息失败:", error);
            }
            ElMessage({
                type: 'success',
                message: `节点添加成功，地址为:${value}`,
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Input canceled',
            })
        })
}
const handleEdit = () => {
    console.log('editing')
}
const handleDelete = (node: NodeData) => {
    ElMessageBox.confirm(`确定要删除节点 ${node.nodename} 吗？`, '确认删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
    }).then(() => {
        nodeStore.removeNode(node.nodeID);
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
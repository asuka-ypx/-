<template>
  <el-card>
    <el-table :data="pods" style="width: 100%" shadow="hover">
      <el-table-column label="Pod名称" prop="metadata.name" />
      <el-table-column label="Pod UID" prop="metadata.uid" />
      <el-table-column label="命名空间" prop="metadata.namespace" />
      <el-table-column label="容器列表">
        <template #default="scope">
          <div v-for="(container, index) in scope.row.spec.containers" :key="index">
            {{ container.name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Pod状态" prop="status.phase" />
      <el-table-column align="right">
        <template #header>
          <el-button plain type="primary" @click="openDialog">添加Pod</el-button>
          <el-dialog v-model="open" title="添加Pod" width="500" :modal="true" z-index="2000" :append-to-body="true">
            <el-form :model="form">
              <el-form-item label="Pod (YAML 格式)" :label-width="formLabelWidth">
                <el-input v-model="form.yamlContent" style="width: 100%" :rows="20" type="textarea"
                  placeholder="请输入 YAML 格式的 Pod 配置" />
              </el-form-item>
            </el-form>

            <template #footer>
              <div class="dialog-footer">
                <el-button @click="open = false">取消</el-button>
                <el-button type="primary" @click="confirm">确认</el-button>
              </div>
            </template>
          </el-dialog>
        </template>
        <template #default="scope">
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import YAML from 'js-yaml';
import { usePodStore } from '../../../store/medules/podStore';
import { ElMessage, ElMessageBox } from 'element-plus';
import axios from 'axios';

// 控制对话框显示
const formLabelWidth = '140px';
const open = ref(false);

// 使用 Pinia podStore
const podStore = usePodStore();
const pods = podStore.pods; // 直接使用 podStore.pods，保持响应性

// 打开对话框函数
const openDialog = () => {
  open.value = true;
  form.yamlContent = ''; // 清空之前的输入
};

const form = reactive({
  yamlContent: '',
});

// 添加 Pod
const confirm = async () => {
  try {
    // 将 YAML 字符串解析为对象
    const parsedData = YAML.load(form.yamlContent);
    
    // 检查是否存在 status 字段
    if (!parsedData.status) {
      parsedData.status = { phase: 'Pending' }; // 设置默认状态
    }
    // 发送请求到后端（根据需要）
    const response = await axios.post('http://localhost:8000/pod', parsedData);

    if (response.status === 200) {
      ElMessage.success('Pod 添加成功');
      open.value = false; // 关闭对话框
      // 更新显示数据
      podStore.addPod(parsedData);
    } else {
      ElMessage.error('Pod 添加失败');
    }
  } catch (error) {
    ElMessage.error('请输入正确的 YAML 格式');
    console.error('发送请求时出错', error);
  }
};

// 删除 Pod
const handleDelete = async (pod) => {
  try {
    // 确认删除
    await ElMessageBox.confirm(
      `确定要删除 Pod ${pod.metadata.name} 吗？`,
      '删除确认',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }
    );

    // 从 store 中移除 Pod
    podStore.removePod(pod.metadata.name);
    ElMessage.success('Pod 删除成功');
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败');
      console.error('删除 Pod 时出错', error);
    }
  }
};
</script>

<style scoped>
.el-dialog {
  z-index: 2000 !important;
  /* 提高对话框的 z-index */
}
</style>

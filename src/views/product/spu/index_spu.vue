<template>
    <div>
        <input type="file" @change="handleFileChange" />
        <button @click="uploadFile">上传文件</button>
    </div>

</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义选中文件的类型
const selectedFile = ref<File | null>(null);

// 处理文件选择
const handleFileChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    if (target.files && target.files.length > 0) {
        selectedFile.value = target.files[0];
    }
};

// 文件上传函数
const uploadFile = async () => {
    if (!selectedFile.value) {
        alert("请先选择文件");
        return;
    }

    const formData = new FormData();
    formData.append("file", selectedFile.value);

    try {
        const response = await fetch("http://your-server-api/upload", {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            alert("文件上传成功");
        } else {
            alert("文件上传失败");
        }
    } catch (error) {
        console.error("上传文件时出错", error);
    }
};
</script>

<style scoped></style>
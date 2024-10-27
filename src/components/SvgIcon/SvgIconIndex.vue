<template>
    <div>
        <svg>
            <use :xlink:href="prefix + name" :fill="color"></use>
        </svg>
    </div>
</template>

<script setup lang="ts">
defineProps({
    prefix: {
        type: String,
        default: '#icon-'
    },
    name: {
        type: String,
    },
    color: {
        type: String,
        default: '#000'
    }
}) 
</script>

<style scoped></style>
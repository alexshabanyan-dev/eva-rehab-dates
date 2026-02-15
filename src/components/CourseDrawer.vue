<template>
  <el-drawer
    :model-value="isOpen"
    @update:model-value="onClose"
    title="I am the title"
    direction="rtl"
  >
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Course } from "../courses";

interface Props {
  courses: Course[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  close: [];
}>();

const isOpen = computed(() => props.courses.length > 0);

function onClose(value: boolean) {
  if (!value) emit("close");
}
</script>

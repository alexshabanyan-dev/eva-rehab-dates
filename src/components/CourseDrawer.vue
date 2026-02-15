<template>
  <el-drawer
    :model-value="isOpen"
    @update:model-value="onClose"
    direction="rtl"
    size="90%"
  >
    <div class="course-list">
      <CourseDrawerItem
        v-for="(course, i) in courses"
        :key="i"
        :course="course"
      />
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Course } from "../types";
import CourseDrawerItem from "./CourseDrawerItem.vue";

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

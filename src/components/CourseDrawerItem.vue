<template>
  <el-card shadow="hover" class="course-card">
    <div class="course-header">
      <el-text tag="b" class="center-name">
        {{ centerLabel }}
      </el-text>
    </div>
    <el-text class="date-range" type="info">
      {{ dateRange }}
    </el-text>
    <el-divider />
    <div class="specialists">
      <div
        v-for="(item, i) in course.specialists"
        :key="i"
        class="specialist-row"
      >
        <el-tag effect="plain" round>
          {{ getSpecialistLabel(item.specialist) }}
        </el-tag>
        <el-text class="specialist-time">{{ item.time }}</el-text>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { Course, CourseSpecialist } from "../types";
import { REHAB_CENTER_LABELS, SPECIALIST_LABELS } from "../types";
import { formatDateRu } from "../helpers";

interface Props {
  course: Course;
}

const props = defineProps<Props>();

const centerLabel = computed(() => REHAB_CENTER_LABELS[props.course.center] ?? props.course.center);

const dateRange = computed(
  () =>
    `${formatDateRu(props.course.dateFrom)} — ${formatDateRu(props.course.dateTo)}`
);

function getSpecialistLabel(s: CourseSpecialist) {
  return SPECIALIST_LABELS[s] ?? s;
}
</script>

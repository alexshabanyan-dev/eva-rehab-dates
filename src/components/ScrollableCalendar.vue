<template>
  <div class="calendar-wrapper">
    <el-scrollbar height="100%" class="calendar-scroll">
      <div
        v-for="(monthDate, index) in months"
        :key="index"
        class="month-block"
      >
        <el-text tag="b" class="month-title">{{
          getMonthLabel(monthDate)
        }}</el-text>
        <Calendar
          :initial-page="pageAddress(monthDate)"
          :min-page="pageAddress(monthDate)"
          :max-page="pageAddress(monthDate)"
          :rows="1"
          :columns="1"
          expanded
          transparent
          borderless
          :first-day-of-week="2"
          :attributes="calendarAttributes"
          disable-page-swipe
          @dayclick="onDateSelect"
        >
          <template #header-title />
        </Calendar>
      </div>
    </el-scrollbar>

    <CourseDrawer :courses="selectedCourses" @close="selectedCourses = []" />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { Calendar } from "v-calendar";
import { MONTHS_TO_SHOW } from "../constants";
import { getMonthLabel, findCoursesByDate, pageAddress } from "../helpers";
import { COURSES } from "../courses/courses";
import { CourseStatus, type Course } from "../types";
import CourseDrawer from "./CourseDrawer.vue";

const selectedCourses = ref<Course[]>([]);

// Атрибуты: PAST — красный, FUTURE — синий (дефолт)
const calendarAttributes = computed(() =>
  COURSES.map((course, i) => ({
    key: `course-${i}`,
    ...(course.status === CourseStatus.PAST
      ? { dot: { color: "red" } }
      : { highlight: { fillMode: "light" as const } }),
    dates: [{ start: course.dateFrom, end: course.dateTo }],
  })),
);

const months = computed(() => {
  const result: Date[] = [];
  const now = new Date();

  for (let i = 0; i < MONTHS_TO_SHOW; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    result.push(date);
  }

  return result;
});

function onDateSelect(day: { date: Date }) {
  const courses = findCoursesByDate(day.date, COURSES);
  if (!courses.length) return;
  selectedCourses.value = courses;
}
</script>

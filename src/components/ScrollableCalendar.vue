<template>
  <div class="calendar-wrapper">
    <el-scrollbar height="100%" class="calendar-scroll">
      <div
        v-for="(monthDate, index) in months"
        :key="index"
        class="month-block"
      >
        <el-text tag="b" class="month-title">{{ getMonthLabel(monthDate) }}</el-text>
        <Calendar
          :initial-page="pageAddress(monthDate)"
          :min-page="pageAddress(monthDate)"
          :max-page="pageAddress(monthDate)"
          :rows="1"
          :columns="1"
          expanded
          transparent
          borderless
          :first-day-of-week="1"
          :attributes="calendarAttributes"
          disable-page-swipe
          @dayclick="onDateSelect"
        >
          <template #header-title />
        </Calendar>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { Calendar } from "v-calendar";
import { MONTHS_TO_SHOW } from "../constants";
import { getMonthLabel } from "../helpers";
import { COURSES, type Course } from "../courses";

function isDateInRange(date: Date, from: Date, to: Date): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const f = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const t = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return d >= f && d <= t;
}

// Атрибуты: в каждом храним целиком объект курса — по клику достаём его
const calendarAttributes = computed(() =>
  COURSES.map((course, i) => ({
    key: `course-${i}`,
    course,
    highlight: { fillMode: "light" as const },
    dates: [{ start: course.dateFrom, end: course.dateTo }],
  })),
);

function pageAddress(date: Date) {
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

// Генерируем массив месяцев начиная с текущего
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
  const date = day.date;
  const clickedCourses = calendarAttributes.value.filter(
    (attr) =>
      "course" in attr &&
      attr.dates[0] &&
      isDateInRange(date, attr.dates[0].start, attr.dates[0].end),
  ) as Array<{ course: Course }>;

  const courses = clickedCourses.map((a) => a.course);
  if (courses.length > 0) {
    console.log(courses.length === 1 ? courses[0] : courses);
  }
}
</script>

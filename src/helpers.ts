import { monthNames } from "./constants";

export function getMonthLabel(date: Date): string {
  return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}

export function pageAddress(date: Date) {
  return {
    month: date.getMonth() + 1,
    year: date.getFullYear(),
  };
}

export function isDateInRange(date: Date, from: Date, to: Date): boolean {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const f = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const t = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return d >= f && d <= t;
}

export function findCoursesByDate<T extends { dateFrom: Date; dateTo: Date }>(
  date: Date,
  courses: T[]
): T[] {
  return courses.filter((c) => isDateInRange(date, c.dateFrom, c.dateTo));
}

export function formatDateRu(date: Date): string {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Парсит дату из формата DD.MM.YYYY */
export function parseDateRu(str: string): Date {
  const [d, m, y] = str.split(".").map(Number);
  return new Date(y, m - 1, d);
}
import { parseDateRu } from "../helpers";
import {
  CourseStatus,
  CourseSpecialist,
  RehabCenter,
  type Course,
  type CourseRaw,
} from "../types";
import { PAST_COURSES_RAW } from "./past-courses";

const COURSES_RAW: CourseRaw[] = [
  {
    dateFrom: "16.02.2026",
    dateTo: "20.02.2026",
    center: RehabCenter.VMESTE_SILA,
    specialists: [{ specialist: CourseSpecialist.SHLYAKHOVA, time: "11:00" }],
    status: CourseStatus.FUTURE,
  },
  {
    dateFrom: "16.03.2026",
    dateTo: "28.03.2026",
    center: RehabCenter.VMESTE_SILA,
    specialists: [{ specialist: CourseSpecialist.DRIGA, time: "10:00" }],
    status: CourseStatus.FUTURE,
  },
  {
    dateFrom: "13.04.2026",
    dateTo: "26.04.2026",
    center: RehabCenter.VMESTE_SILA,
    specialists: [
      { specialist: CourseSpecialist.GABDRAKHMANOVA, time: "11:00" },
      { specialist: CourseSpecialist.SHLYAKHOVA, time: "12:00" },
    ],
    status: CourseStatus.FUTURE,
  },
];

export const COURSES: Course[] = [
  ...COURSES_RAW,
  ...PAST_COURSES_RAW
].map((c) => ({
  ...c,
  dateFrom: parseDateRu(c.dateFrom),
  dateTo: parseDateRu(c.dateTo),
}));

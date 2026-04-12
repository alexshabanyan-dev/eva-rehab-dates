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
    dateFrom: "13.04.2026",
    dateTo: "26.04.2026",
    center: RehabCenter.VMESTE_SILA,
    specialists: [
      { specialist: CourseSpecialist.GABDRAKHMANOVA, time: "11:00", price: 43000 },
      { specialist: CourseSpecialist.SHLYAKHOVA, time: "12:00", price: 40000 },
    ],
    status: CourseStatus.FUTURE,
  },
  {
    dateFrom: "18.05.2026",
    dateTo: "22.05.2026",
    center: RehabCenter.RAZVITIE,
    specialists: [
      { specialist: CourseSpecialist.BERNATSKY, time: "11:00" },
      { specialist: CourseSpecialist.SARVAROVA, time: "12:30" },
    ],
    status: CourseStatus.FUTURE,
  },
  {
    dateFrom: "25.05.2026",
    dateTo: "29.05.2026",
    center: RehabCenter.RAZVITIE,
    specialists: [
      { specialist: CourseSpecialist.BERNATSKY, time: "11:00" },
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

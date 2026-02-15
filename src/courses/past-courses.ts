import { CourseRaw, RehabCenter, CourseSpecialist, CourseStatus } from "../types";

export const PAST_COURSES_RAW: CourseRaw[] = [
    {
        dateFrom: "09.02.2026",
        dateTo: "13.02.2026",
        center: RehabCenter.VMESTE_SILA,
        specialists: [{ specialist: CourseSpecialist.SHLYAKHOVA, time: "12:00" }],
        status: CourseStatus.PAST,
    },
];
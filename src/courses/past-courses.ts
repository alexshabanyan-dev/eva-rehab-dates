import { CourseRaw, RehabCenter, CourseSpecialist, CourseStatus } from "../types";

export const PAST_COURSES_RAW: CourseRaw[] = [
    {
        dateFrom: "09.02.2026",
        dateTo: "13.02.2026",
        center: RehabCenter.VMESTE_SILA,
        specialists: [{ specialist: CourseSpecialist.SHLYAKHOVA, time: "12:00" }],
        status: CourseStatus.PAST,
    },
    {
        dateFrom: "16.02.2026",
        dateTo: "20.02.2026",
        center: RehabCenter.VMESTE_SILA,
        specialists: [{ specialist: CourseSpecialist.SHLYAKHOVA, time: "11:00" }],
        status: CourseStatus.FUTURE,
    },
];
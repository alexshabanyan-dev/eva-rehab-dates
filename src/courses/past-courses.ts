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
        status: CourseStatus.PAST,
    },
    {
        dateFrom: "16.03.2026",
        dateTo: "27.03.2026",
        center: RehabCenter.VMESTE_SILA,
        specialists: [{ specialist: CourseSpecialist.DRIGA, time: "10:00", price: 38000 }],
        status: CourseStatus.PAST,
    },
    {
        dateFrom: "30.03.2026",
        dateTo: "12.04.2026",
        center: RehabCenter.DCP_CENTR,
        specialists: [
            { specialist: CourseSpecialist.GORYACHEVA, time: "11:00", price: 41500 },
        ],
        status: CourseStatus.PAST,
    },
];
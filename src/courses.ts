export enum RehabCenter {
    VMESTE_SILA = 'VMESTE_SILA',
}

export enum CourseSpecialist {
    DRIGA = 'DRIGA',
    SHLYAKHOVA = 'SHLYAKHOVA',
    GABDRAKHMANOVA = 'GABDRAKHMANOVA',
}

export const REHAB_CENTER_LABELS: Record<RehabCenter, string> = {
    [RehabCenter.VMESTE_SILA]: 'Вместе Сила',
};

export const SPECIALIST_LABELS: Record<CourseSpecialist, string> = {
    [CourseSpecialist.DRIGA]: 'Максим Дрига',
    [CourseSpecialist.SHLYAKHOVA]: 'Светлана Шляхова',
    [CourseSpecialist.GABDRAKHMANOVA]: 'Александра Габдрахманова',
};

export interface CourseItem {
    specialist: CourseSpecialist,
    time: string,
}

export enum CourseStatus {
    PAST = 'PAST',
    FUTURE = 'FUTURE',
}

export interface Course {
    dateFrom: Date;
    dateTo: Date;
    center: RehabCenter;
    specialists: CourseItem[];
    status: CourseStatus
}

import { parseDateRu } from "./helpers";

const COURSES_RAW: Array<Omit<Course, "dateFrom" | "dateTo"> & { dateFrom: string; dateTo: string }> = [
    {
        dateFrom: '09.02.2026',
        dateTo: '13.02.2026',
        center: RehabCenter.VMESTE_SILA,
        specialists: [
            { specialist: CourseSpecialist.SHLYAKHOVA, time: "12:00" },
        ],
        status: CourseStatus.PAST,
    },
    {
        dateFrom: '16.02.2026',
        dateTo: '20.02.2026',
        center: RehabCenter.VMESTE_SILA,
        specialists: [
            { specialist: CourseSpecialist.SHLYAKHOVA, time: "11:00" },
        ],
        status: CourseStatus.FUTURE,
    },
    {
        dateFrom: "16.03.2026",
        dateTo: "28.03.2026",
        center: RehabCenter.VMESTE_SILA,
        specialists: [
            { specialist: CourseSpecialist.DRIGA, time: "10:00" },
        ],
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

export const COURSES: Course[] = COURSES_RAW.map((c) => ({
    ...c,
    dateFrom: parseDateRu(c.dateFrom),
    dateTo: parseDateRu(c.dateTo),
}));

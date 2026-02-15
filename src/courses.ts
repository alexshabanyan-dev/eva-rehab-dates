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

export interface Course {
    dateFrom: Date;
    dateTo: Date;
    center: RehabCenter,
    specialists: CourseItem[]
}

export const COURSES: Course[] = [
    {
        dateFrom: new Date(2026, 2, 16),
        dateTo: new Date(2026, 2, 28),
        center: RehabCenter.VMESTE_SILA,
        specialists: [
            {
                specialist: CourseSpecialist.DRIGA,
                time: '10:00'
            }
        ]
    },
];

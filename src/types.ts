export enum RehabCenter {
  VMESTE_SILA = "VMESTE_SILA",
  DCP_CENTR = 'DCP_CENTR',
}

export enum CourseSpecialist {
  DRIGA = "DRIGA",
  SHLYAKHOVA = "SHLYAKHOVA",
  GABDRAKHMANOVA = "GABDRAKHMANOVA",
  VAKHTANG = 'VAKHTANG',
  GORYACHEVA = 'GORYACHEVA'
}

export const REHAB_CENTER_LABELS: Record<RehabCenter, string> = {
  [RehabCenter.VMESTE_SILA]: "Вместе Сила",
  [RehabCenter.DCP_CENTR]: 'ДЦП Центр'
};

export const SPECIALIST_LABELS: Record<CourseSpecialist, string> = {
  [CourseSpecialist.DRIGA]: "Максим Дрига",
  [CourseSpecialist.SHLYAKHOVA]: "Светлана Шляхова",
  [CourseSpecialist.GABDRAKHMANOVA]: "Александра Габдрахманова",
  [CourseSpecialist.VAKHTANG]: "Вахтанг Прохоров",
  [CourseSpecialist.GORYACHEVA]: 'Женя Горячева'
};

export interface CourseSpecialistItem {
  specialist: CourseSpecialist;
  time: string;
}

export enum CourseStatus {
  PAST = "PAST",
  FUTURE = "FUTURE",
}

export interface Course {
  dateFrom: Date;
  dateTo: Date;
  center: RehabCenter;
  specialists: CourseSpecialistItem[];
  status: CourseStatus;
}

export type CourseRaw = Omit<Course, "dateFrom" | "dateTo"> & {
  dateFrom: string;
  dateTo: string;
};

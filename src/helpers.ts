import { monthNames } from "./constants";

export function getMonthLabel(date: Date): string {
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
}
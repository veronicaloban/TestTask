import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap";

export function changeClass(element: HTMLElement, classToRemove: string, classToAdd: string): void {
    element.classList.remove(classToRemove);
    element.classList.add(classToAdd);
}

export function formatDate(dateToFormat: NgbDateStruct): string {
    const { year, month, day } = dateToFormat;

    const date = new Date(year, month - 1, day);

    return date.toISOString();
}

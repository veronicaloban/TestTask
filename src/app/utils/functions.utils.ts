export function changeClass(element: HTMLElement, classToRemove: string, classToAdd: string): void {
    element.classList.remove(classToRemove);
    element.classList.add(classToAdd);
}

export function formatDate(dateToFormat: {day: number, month: number, year: number}) {
    const { year, month, day } = dateToFormat;

    const date = new Date(year, month - 1, day);

    return date.toISOString();
}
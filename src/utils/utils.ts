export function getIsoDate(date: Date | string | null): string {
    if (!date) return new Date().toISOString().split('T')[0];
    return date instanceof Date ? date.toISOString().split('T')[0] : date;
}

export function getTomorrowDate(): Date {
    const tomorrow = new Date();
    tomorrow.setDate(new Date().getDate() + 1)
    return tomorrow;
}
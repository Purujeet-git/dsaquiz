  /**
   * Normalize a date to midnight (local time)
   */
  export function normalizeDate(date) {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  /**
   * Check if two dates are on the same calendar day
   */
  export function isSameDay(date1, date2) {
    if (!date1 || !date2) return false;

    const d1 = normalizeDate(date1);
    const d2 = normalizeDate(date2);

    return d1.getTime() === d2.getTime();
  }

  /**
   * Check if `date1` is exactly yesterday relative to `today`
   */
  export function isYesterday(date1, today) {
    if (!date1 || !today) return false;

    const d1 = normalizeDate(date1);
    const d2 = normalizeDate(today);

    const diff =
      (d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24);

    return diff === 1;
  }

export function formatDate(date: Date) {
  if (!(date instanceof Date)) {
    throw new TypeError("Argument must be a Date object");
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}

export function formatPeriod(dates: Date[]) {
  return dates.map(value => formatDate(value));
}
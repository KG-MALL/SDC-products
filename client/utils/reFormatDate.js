export function reFormatDate(dateStr) {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const date = new Date(dateStr);
  return `${months[date.getMonth()]} ${date.getUTCDate()}, ${date.getFullYear()}`;
}

export default reFormatDate;

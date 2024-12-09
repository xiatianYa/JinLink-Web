import dayjs from 'dayjs';

export function isMoreThanTwoHours(dateTimeStr: string, format = 'YYYY/MM/DD HH:mm:ss') {
  const dateTime = dayjs(dateTimeStr, format);
  return dateTime.isBefore(dayjs().subtract(2, 'hour'));
}

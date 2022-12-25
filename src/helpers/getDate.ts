import dayjs from "dayjs";
import weekday from "dayjs/plugin/weekday";
import type { Dayjs } from "dayjs";

dayjs.extend(weekday);

export const getResetCurrentMonth = () => dayjs();
export const getNextMonth = (date: Dayjs) => dayjs(date).add(1, 'month');
export const getPrevMonth = (date: Dayjs) => dayjs(date).subtract(1, 'month');

export const getDate = () => {
  const dayContext = dayjs();
  const monthDate = dayContext.startOf('month');
  return [...Array(monthDate.daysInMonth())].map((_, i) => monthDate.clone().add(i, 'day').format('D.MM.Y'));
}

export const getDateEquality = (day: Dayjs) => {
  return dayjs().isSame(day, 'day');
}

export const getEmptyDays = (initialDate: Dayjs): number => {
  const currentDate = initialDate.get('date');
  let emptyDaysCount = dayjs(initialDate).subtract((currentDate), 'days').weekday() + 1;
  if (emptyDaysCount === 7) emptyDaysCount = 0;
  return emptyDaysCount;
}

export const getDaysArr = (initialDate: Dayjs) => {
  const monthDate = initialDate.startOf('month');
  return [...Array(monthDate.daysInMonth())].map((_, i) => monthDate.clone().add(i, 'day'));
}

export const getDateRange = (start, end, repeatParams, date) => {
  // есть начальная дата и конечная.
  // если дата из промежутка, тогда ставим челлендж в ячейку
  // для начала выведем подряд все дни челленджа без параметров


  if (date >= start && date <= end)
    console.log(date + 'УРА!');

}
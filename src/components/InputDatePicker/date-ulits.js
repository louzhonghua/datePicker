import { lastDayOfMonth, getDate, setDate } from "date-fns";
import format from "date-fns/format";

//将日期按照'yyyy-MM-dd'格式转换为字符串
export function formatDate(date) {
  return date ? format(date, "yyyy-MM-dd") : "";
}

//通过用户输入的日期格式字符串，返回对应输入情况下应该转化为日期格式和对应年月日

function getDateRegexp(dateFormat) {
  const dateRegexp = dateFormat
    .replace(/[A-Za-z]{4}/g, "([0-9]{4})")
    .replace(/[A-Za-z]{2}/g, "([0-9]{2})")
    .replace(/[A-Za-z]{4}/g, "([0-9]{2})");
  return {
    regexp: new RegExp(`^\\s*${dateRegexp}\\s*$`),
    partsOrder: dateFormat.split(/[^A-Za-z]/),
  };
}
function DatePickerException(message) {
  this.message = message;
  this.name = "DatePickerException";
}

//将用户输入的日期字符串转换为指定的日期格式
export function parseDate(dateString, dateFormat='yyyy-MM-dd') {
  const { regexp, partsOrder } = getDateRegexp(dateFormat);
  const match = dateString.match(regexp);
  //错误提示代码
  const dateErrors = [];
  if (!match) {
    dateErrors.push(new DatePickerException("Invalid date format"));
    throw dateErrors;
  }
  const yearIndex = partsOrder.indexOf("yyyy");
  const monthIndex = partsOrder.indexOf("MM");
  const dayIndex = partsOrder.indexOf("dd");

  const yearString = match[yearIndex + 1];
  const monthString = match[monthIndex + 1];
  const dayString = match[dayIndex + 1];

  const month = parseInt(monthString, 10);
  if(month < 1 || month > 12) {
    dateErrors.push(new DatePickerException("Invalid month"));
  }
  const day = parseInt(dayString, 10);
  if(day === 0) {
    dateErrors.push(new DatePickerException("Invalid day"));
  }

  const year = parseInt(yearString, 10);
  const firstDayOfMonth = new Date(year, month - 1);
  const lastDay = lastDayOfMonth(firstDayOfMonth);
  if(day > getDate(lastDay)) {
    dateErrors.push(new DatePickerException("Invalid day of month"));
  }
  if(dateErrors.length > 0) {
    throw dateErrors;
  }
  return setDate(firstDayOfMonth, day);
}

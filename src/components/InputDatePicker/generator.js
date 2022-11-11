import { chunk } from "lodash";
import startOfWeek from 'date-fns/startOfWeek'
import { addDays, format } from "date-fns";
import { setDay } from "date-fns/esm";

//按周生成日历数据
export const generateCalendarByWeek = (year, monthIndex) => {
    // 获取某年某月的第一天
    const firstDay = new Date(year, monthIndex);
    // 一周的开始日期
    const firstDayOfWeek = startOfWeek(firstDay, { weekStartsOn: 1 });
    const weeks = new Array(6 * 7).fill(0).map((_, i) => addDays(firstDayOfWeek, i));
    return chunk(weeks, 7);
}

//将一周七天的数据转换为日历数据
export function buildDayNames(weekStartsOn) {
    return new Array(7).fill(0).map((_, i) => (i + weekStartsOn) % 7)
        .map(dayOfWeek => {
            const day = setDay(new Date(0), dayOfWeek);
            return format(day, "EEEEEE");
        });
}
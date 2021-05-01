interface serializeTime {
  calendar: string;
  time: string;
  wholeTime: string;
}

/**
 * 给单数时间补 0
 * @param {String | Number} val 时间
 * @returns String 补 0 后的值
 */
const _addZero2Time = (val) => {
  const res = String(val);
  return res.length > 1 ? res : 0 + res;
};

/**
 * 转换 Date 实例值为正常时间显示
 * @param {Date} date Date 实例
 * @returns String
 */
const getTimeFromDate: (string) => serializeTime = (date) => {
  const year = date.getFullYear();
  const month = _addZero2Time(date.getMonth() + 1);
  const day = _addZero2Time(date.getDate());

  const calendar = year + '.' + month + '.' + day;

  const hour = _addZero2Time(date.getHours());
  const minute = _addZero2Time(date.getMinutes());
  const second = _addZero2Time(date.getSeconds());

  const time = hour + ':' + minute + ':' + second;

  return {
    calendar,
    time,
    wholeTime: calendar + '  ' + time,
  };
};

const timeUtils = {
  getTimeFromDate,
};
export default timeUtils;

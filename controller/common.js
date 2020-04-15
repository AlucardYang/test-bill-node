
/**
 * @description 随机生成uuid
 */
function guid() {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + S4() + S4() + S4() + S4() + S4() + S4())
}

/**
 * @description 时间格式化
 */
function formatDate (time, fromat) {
  let date = new Date(time);
  let fm = fromat ? fromat : 'yyyy-MM-dd hh:mm';
  // 日期格式化
  function format(date, fmt) {
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    let o = {
      'M+': date.getMonth() + 1,
      'd+': date.getDate(),
      'h+': date.getHours(),
      'm+': date.getMinutes(),
      's+': date.getSeconds()
    };
    for (let k in o) {
      if (new RegExp(`(${k})`).test(fmt)) {
        let str = o[k] + '';
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : ('00' + str).substr(str.length));
      }
    }
    return fmt;
  }
  return format(date, fm);
}

/**
 * 获取对应年月当月的天数
 * @param {*} year 年份
 * @param {*} month 月份
 * import { getDaysInMonth } from "@/common/tools/date.js";
 */
function getDaysInMonth(year, month) {
  var d = new Date(year, month, 0);
  return d.getDate();
}

module.exports = {
  guid,
  formatDate,
  getDaysInMonth,
}
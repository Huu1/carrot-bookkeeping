import { Base64 } from "js-base64";

export const repairZero = (month) => {
  return month <= 9 && +month.length === 1 ? '0' + month : month;
}

export const dateFormat = (date, fmt) => {
  let ret;
  const opt = {
    "Y+": date.getFullYear().toString(),        // 年
    "m+": (date.getMonth() + 1).toString(),     // 月
    "d+": date.getDate().toString(),            // 日
    "H+": date.getHours().toString(),           // 时
    "M+": date.getMinutes().toString(),         // 分
    "S+": date.getSeconds().toString()          // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  };
  for (let k in opt) {
    ret = new RegExp("(" + k + ")").exec(fmt);
    if (ret) {
      fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
    };
  };
  return fmt;
}

// 节流
export function throttle(fun, delay) {
  let last, deferTimer
  return function (args) {
    let that = this
    let _args = arguments
    let now = +new Date()
    if (last && now < last + delay) {
      clearTimeout(deferTimer)
      deferTimer = setTimeout(function () {
        last = now
        fun.apply(that, _args)
      }, delay)
    } else {
      last = now
      fun.apply(that, _args)
    }
  }
}

export function debounce(fun, delay) {
  return function (args) {
    let that = this
    let _args = args
    clearTimeout(fun.id)
    fun.id = setTimeout(function () {
      fun.call(that, _args)
    }, delay)
  }
}


/**
 * [x,x,...] => [[x,x,x,x],[x,x,x,x],....]
 * @returns 
 */
export const splitLineGroup = (Items, lineItem: number = 4) => {
  const result = [];
  const origin = Object.keys(Items);
  let temp = [];
  origin.forEach((key, index) => {
    temp.push(key);
    if (temp.length === lineItem) {
      result.push([...temp]);
      temp = [];
    }
  })
  result.push([...temp]);
  temp = null;
  return result;
}


export function encodeToken(token: string) {
  const base64 = Base64.encode(token + ':');
  // console.log(result)
  return 'Basic ' + base64;
}

export function setMonthValue(list = []) {
  const set = new Set();
  for (const item of list) {
    set.add(item.day);
  }
  const result = [];
  for (const day of set) {
    result.push({
      date: day,
      all: list.reduce((pre, cur) => pre += (+cur.value), 0).toFixed(2),
      list: list.filter(i => i.day === day)
    })
  }
  return result;
}
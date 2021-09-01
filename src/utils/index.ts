export const formatDate = (time) => {
  // 此时的date是我们传入的时间戳
  if (typeof time === 'number') {
    time = new Date(time);
  }
  const year = time.getFullYear().toString() //年
  let month = (time.getMonth() + 1).toString() //月
  const date = time.getDate().toString() //日
  // const hh = DateTime.getHours().toString() //时
  // const mm = DateTime.getMinutes().toString() //分
  // const ss = DateTime.getSeconds().toString() //秒
  return `${year}-${month}`
}

export const repairZero = (month) => {
  return month <= 9 && +month.length === 1 ? '0' + month : month;
}
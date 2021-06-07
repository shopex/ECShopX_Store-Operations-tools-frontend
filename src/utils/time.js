//计算起始时间戳
export function calculateTimestamp(type) {
  switch (type) {
    case 'today':
  }
}

function complete(number) {
  if (!number) {
    return ''
  }
  if (String(number).length === 1) {
    return `0${number}`
  }
  return number
}

//上一天
const getLastDay = (date) => {
  const { year, month, day } = useDate(date)

  //如果是元旦
  if (day === '01' && month === '01') {
    return `${Number(year) - 1}-12-`
  }

  return `${year + 1}-${Number(month) - 1}-${day}`
}

/**
 * 传进来一个date对象或者一个时间字符串
 * @param {}} date
 */
function useDate(date) {
  //如果date是字符串 如果date是日期对象
  const newDate =
    date && typeof date === 'string'
      ? new Date(date)
      : date && date instanceof Date
      ? date
      : new Date()

  let year = newDate.getFullYear()
  let month = complete(newDate.getMonth() + 1)
  let day = complete(newDate.getDate())
  let week = newDate.getDay()
  let monthday = `${month}-${day}`
  let startOfMonth = `${year}-${month}-01`
  let endOfMonth = `${year}-${month}-${new Date(year, month, 0).getDate()}`
  let daysOfMonth = `${new Date(year, month, 0).getDate()}`

  let completeDay = `${year}-${month}-${day}`

  let nowTime = newDate.getTime()
  let todayStartTime = new Date(`${completeDay} 00:00:00`).getTime()

  return {
    date: newDate,
    fullDate: `${year}-${month}-${day}`,
    //现在的时间戳
    nowTime: nowTime,
    //今天0点开始的时间戳
    todayStartTime: todayStartTime,
    year: year,
    month: month,
    day: day,
    week: week,
    monthday: monthday,
    //每月的第一天
    startOfMonth: startOfMonth,
    //每月的最后一天
    endOfMonth: endOfMonth,
    //每个月的天数
    daysOfMonth: daysOfMonth
  }
}

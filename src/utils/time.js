//计算不同时间区间的起始时间戳
export function calculateTimestamp(type) {
  let timeArr = []
  switch (type) {
    case 'today':
      timeArr = [getTimetampFrom(`${getDay(0)} 00:00:00`), getTimetampFrom()]
      break
    case 'yesterday':
      timeArr = [
        getTimetampFrom(`${getDay(-1)} 00:00:00`),
        getTimetampFrom(`${getDay(0)} 00:00:00`)
      ]
      break
    case 'recently7':
      timeArr = [getTimetampFrom(`${getDay(-7)} 00:00:00`), getTimetampFrom()]
      break
    case 'recently30':
      timeArr = [getTimetampFrom(`${getDay(-30)} 00:00:00`), getTimetampFrom()]
      break
    default:
      timeArr = []
      break
  }
  //配合后端返回对应值
  return timeArr.map((time) => time / 1000)
}

function getDay(day) {
  console.log('getDay', day)

  var today = new Date()

  var targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day

  console.log('targetday_milliseconds', targetday_milliseconds)

  today.setTime(targetday_milliseconds) //注意，这行是关键代码

  var tYear = today.getFullYear()

  var tMonth = today.getMonth()

  var tDate = today.getDate()

  console.log('today', tYear, tMonth, tDate)

  tMonth = doHandleMonth(tMonth + 1)

  tDate = doHandleMonth(tDate)

  console.log('return ', tYear + '-' + tMonth + '-' + tDate)

  return tYear + '-' + tMonth + '-' + tDate
}

function doHandleMonth(month) {
  console.log('doHandleMonth', month)

  var m = month
  if (month.toString().length == 1) {
    m = '0' + month
  }

  return m
}

//得出时间戳
function getTimetampFrom(day) {
  console.log('getTimetampFrom', day)

  if (!day) {
    return new Date().getTime()
  }
  return new Date(day).getTime()
}

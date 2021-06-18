import Taro, { getCurrentInstance } from '@tarojs/taro'
import classNames from 'classnames'
import styleNames from 'stylenames'
import qs from 'qs'
import S from '@/spx'
import _pickBy from 'lodash/pickBy'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import log from './log'
import defaultTheme from './theme'
import validate from './validate'
import qwsdk from './qwsdk'

const isPrimitiveType = (val, type) => Object.prototype.toString.call(val) === type

export function isFunction(val) {
  return isPrimitiveType(val, '[object Function]')
}

export function isNumber(val) {
  return isPrimitiveType(val, '[object Number]')
}

export function isObject(val) {
  return isPrimitiveType(val, '[object Object]')
}

export function navigateTo(url, isRedirect) {
  if (isObject(isRedirect)) {
    isRedirect = false
  }
  if (isRedirect) {
    return Taro.redirectTo({ url })
  }
  return Taro.navigateTo({ url })
}

export function getCurrentRoute() {
  const { path, params: origParams } = getCurrentInstance().router
  const params = _pickBy(origParams, (val) => val !== '')
  const fullPath = `${path}${Object.keys(params).length > 0 ? '?' + qs.stringify(params) : ''}`
  return {
    path,
    fullPath,
    params
  }
}

export function getThemeStyle() {
  let systemTheme = S.get('SYSTEM_THEME')
  if (!systemTheme) {
    systemTheme = {
      ...defaultTheme
    }
  }
  const { colorPrimary, colorSecondary, colorText } = systemTheme
  return {
    '--color-primary': colorPrimary,
    '--color-senondary': colorSecondary,
    '--color-text': colorText
  }
}
// 格式化金钱
export function formatNum(number) {
  return number.toFixed(2).toLocaleString()
}
// 时间戳转日期格式
export function timestampToTime(timestamp) {
  var date = new Date(timestamp * 1000) //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-'
  var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  var D = date.getDate() + ' '
  var h = date.getHours() + ':'
  var m = date.getMinutes() + ':'
  var s = date.getSeconds()
  return Y + M + D + h + m + s
}

// 计算字符长度 一个中文算两个字符
export function strLength(val) {
  var len = 0
  for (var i = 0; i < val.length; i++) {
    var a = val.charAt(i)
    if (a.match(/[^\x00-\xff]/gi) != null) {
      len += 2
    } else {
      len += 1
    }
  }
  return len
}

export function showToast(title) {
  Taro.showToast({
    title,
    icon: 'none'
  })
}

// 复制到粘贴板
export function copyContent(content) {
  Taro.setClipboardData({
    data: content,
    success: () => {
      Taro.showToast({
        title: '复制成功',
        icon: 'success',
        duration: 1500
      })
    }
  })
}

async function requestCallback(
  func,
  successText,
  successCallback = () => {},
  failCallback = () => {}
) {
  let result = 1

  let res

  try {
    res = await func()
    if (res) {
      S.toast(successText)
    }
  } catch (e) {
    console.log('请求错误', e)
    result = 0
  }

  if (result !== 0) {
    successCallback(res)
  }

  if (result == 0) {
    failCallback()
  }
}

function range(num, min, max) {
  return Math.min(Math.max(num, min), max)
}

function calcTimer(totalSec) {
  let remainingSec = totalSec
  const dd = Math.floor(totalSec / 24 / 3600)
  remainingSec -= dd * 3600 * 24
  const hh = Math.floor(remainingSec / 3600)
  remainingSec -= hh * 3600
  const mm = Math.floor(remainingSec / 60)
  remainingSec -= mm * 60
  const ss = Math.floor(remainingSec)

  return {
    dd,
    hh,
    mm,
    ss
  }
}

export { classNames, log, debounce, throttle, validate, requestCallback, range, calcTimer, qwsdk }

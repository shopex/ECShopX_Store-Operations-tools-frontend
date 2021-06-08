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
  return number.toLocaleString()
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

async function requestCallback(func, successText, successCallback) {
  let result = 1

  try {
    const res = await func()
    if (res) {
      S.toast(successText)
    }
  } catch (e) {
    console.log('请求错误', e)
    result = 0
  }

  if (result !== 0) {
    successCallback()
  }
}

export { classNames, log, debounce, throttle, validate, requestCallback }

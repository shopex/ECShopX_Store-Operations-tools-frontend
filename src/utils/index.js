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

export function navigateTo (url, isRedirect) {
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
  let systemTheme = S.get( 'SYSTEM_THEME' )
  console.log(defaultTheme, systemTheme)
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

export function showToast(title) {
  Taro.showToast({
    title,
    icon: 'none'
  })
}

export {
  classNames,
  log,
  debounce,
  throttle,
  validate
}

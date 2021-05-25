import Taro, { getCurrentInstance } from '@tarojs/taro'
import classNames from 'classnames'
import styleNames from 'stylenames'
import qs from 'qs'
import S from '@/spx'
import _pickBy from 'lodash/pickBy'
import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import log from './log'

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

export {
  classNames,
  log,
  debounce,
  throttle
}

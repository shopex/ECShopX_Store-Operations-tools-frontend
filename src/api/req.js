import Taro, { getCurrentInstance } from '@tarojs/taro'
import S from '@/spx'
import qs from 'qs'
import { showToast } from '@/utils'

function addQuery(url, query) {
  return url + (url.indexOf('?') >= 0 ? '&' : '?') + query
}

class API {
  constructor(options = {}) {
    let { baseURL = '/' } = options
    if (!/\/$/.test(baseURL)) {
      baseURL = baseURL + '/'
    }

    // const { company_id } = getCurrentInstance().router
    // console.log(company_id)
    // if ( company_id ) {
    //   options.company_id = company_id
    // }
    // options.company_id = APP_COMPANY_ID;
    // if (process.env.TARO_ENV === "weapp") {
    //   const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {};
    //   options.appid = extConfig.appid;
    //   if (extConfig.company_id) {
    //     options.company_id = extConfig.company_id;
    //   }
    // }

    this.options = options
    this.baseURL = baseURL
    this.genMethods(['get', 'post', 'delete', 'put'])
  }

  genMethods(methods) {
    methods.forEach((method) => {
      this[method] = (url, data, config = {}) =>
        this.makeReq({
          ...config,
          method,
          url,
          data
        })
    })
  }

  errorToast(data) {
    const errMsg =
      data.msg || data.err_msg || (data.error && data.error.message) || '操作失败，请稍后重试'
    let newText = ''
    if (errMsg.length > 11) {
      newText = errMsg.substring(0, 11) + '\n' + errMsg.substring(11)
    } else {
      newText = errMsg
    }
    setTimeout(() => {
      Taro.showToast({
        icon: 'none',
        title: newText
      })
    }, 200)
  }

  makeReq(config) {
    const { url, data, header = {}, method = 'GET', showLoading, showError = true } = config

    const methodIsGet = method.toLowerCase() === 'get'

    let reqUrl = /^http/.test(url) ? url : `${this.baseURL}${url.replace(/^\//, '')}`
    const query = !data || typeof data === 'string' ? qs.parse(data) : data
    if (!methodIsGet) {
      header['content-type'] = header['content-type'] || 'application/x-www-form-urlencoded'
    }
    const token = S.getAuthToken()
    if (token) {
      header['Authorization'] = `Bearer ${token}`
    }
    // header[
    //   'Authorization'
    // ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9lY3Nob3B4Mi5zaG9wZXgxMjMuY29tXC9hcGlcL29wZXJhdG9yXC9sb2dpbiIsImlhdCI6MTYyMjc3NzM0OSwiZXhwIjoxNjIyNzk1MzQ5LCJuYmYiOjE2MjI3NzczNDksImp0aSI6ImpOc1NYdWpCMzFiY09LOGMiLCJzdWIiOiJCbU1EWTFRNkRUc0RmMUIzVUR4V05sWThWQ3dCUEZ3M0JITUZhbFJ3VWprRE5sTXpVeTFZWlZKM1Z6Z0hJbG95VURWVk5WWWdYU1pVYmxOc1UyRlFid1lnQTJKVWV3MDdBemRRTmxBOFZpWldNVlJyQVdkY1lBUXpCV1ZVWUZKbUEyUlRiVk0yV0dWU05GY3pCekJhTUZBMVZUOVdNbDB4VkROVFlWTm1VRGNHTndOcVZEd05NQU0xVUQxUU5WWm5WaVJVTlFFbyIsInBydiI6IjkxNWVmM2IxNDU3OTdkOTYzNmU2Njc4NjYwODljNmJiMWZlMzJlMWMiLCJpZCI6IkJtTURZMVE2RFRzRGYxQjNVRHhXTmxZOFZDd0JQRnczQkhNRmFsUndVamtETmxNelV5MVlaVkozVnpnSElsb3lVRFZWTlZZZ1hTWlVibE5zVTJGUWJ3WWdBMkpVZXcwN0F6ZFFObEE4VmlaV01WUnJBV2RjWUFRekJXVlVZRkptQTJSVGJWTTJXR1ZTTkZjekJ6QmFNRkExVlQ5V01sMHhWRE5UWVZObVVEY0dOd05xVkR3Tk1BTTFVRDFRTlZablZpUlVOUUVvIiwiY29tcGFueV9pZCI6IjQzIiwibW9iaWxlIjoiMTM5MTgwODc0MzAiLCJvcGVyYXRvcl90eXBlIjoiYWRtaW4iLCJpc19hdXRob3JpemVyIjpmYWxzZSwibG9naW50eXBlIjoiYWRtaW4iLCJsaWNlbnNlX2F1dGhvcml6ZSI6ImV5SjJZV3hwWkNJNkluUnlkV1VpTENKbGVIQnBjbVZrUVhRaU9pSXlPRGM0TXpZeU56Y3lJaXdpWkdWell5STZJbHgxT0dKa05WeDFOelV5T0NKOSJ9.X8_v660OcVkKdbbvuAmwfSy_fVALr1zJuxr-aDSoWx4`

    // const { company_id, appid } = this.options;
    const company_id = Taro.getStorageSync('company_id')

    const options = {
      ...config,
      url: reqUrl,
      data: query,
      method: method.toUpperCase(),
      header: header
    }

    if (showLoading) {
      Taro.showLoading({
        mask: true
      })
    }

    // TODO: update taro version
    // if (this.options.interceptor && Taro.addInterceptor) {
    //   Taro.addInterceptor(this.options.interceptor)
    // }
    options.data = {
      ...(options.data || {}),
      company_id
    }
    if (options.method === 'GET') {
      options.url = addQuery(options.url, qs.stringify(options.data))
      delete options.data
    } else {
      // nest data
      options.data = qs.stringify(options.data)
    }

    return Taro.request(options)
      .then((res) => {
        return res.data
      })
      .catch((error) => {
        return error.json()
      })
      .then((res) => {
        const { data, error } = res
        if (data) {
          return data
        } else {
          const { message, status_code } = error
          if (status_code == 401) {
            S.logout()
            S.login()
            return Promise.reject()
          }
          if (showError) {
            showToast(message)
          }
          return Promise.reject()
        }
      })
  }

  reqError(res, msg = '') {
    const data = res.message || res.data
    const errMsg = data.message || data.err_msg || msg
    const err = new Error(errMsg)
    err.res = res
    return err
  }
}

export default new API({
  baseURL: APP_BASE_URL
})

export { API }

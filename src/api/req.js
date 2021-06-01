import Taro from '@tarojs/taro'
import S from '@/spx'
import qs from 'qs'

function addQuery(url, query) {
  return url + (url.indexOf('?') >= 0 ? '&' : '?') + query
}

class API {
  constructor(options = {}) {
    let { baseURL = '/' } = options
    if (!/\/$/.test(baseURL)) {
      baseURL = baseURL + '/'
    }
    // options.company_id = APP_COMPANY_ID;
    if (process.env.TARO_ENV === 'weapp') {
      const extConfig = wx.getExtConfigSync ? wx.getExtConfigSync() : {}
      options.appid = extConfig.appid
      if (extConfig.company_id) {
        options.company_id = extConfig.company_id
      }
    }

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

    // const token = S.getAuthToken();
    // if (token) {
    header[
      'Authorization'
    ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9lY3Nob3B4Mi5zaG9wZXgxMjMuY29tXC9hcGlcL3Rva2VuXC9yZWZyZXNoIiwiaWF0IjoxNjIyMTY5OTIyLCJleHAiOjE2MjI0NjUzMjcsIm5iZiI6MTYyMjQ0NzMyNywianRpIjoibHB2MDIwYVFyWXRTTG1PTiIsInN1YiI6IkJtTUVaQVpvRGpoU0xnZ3ZCMnNIWjFNNUJIeFRibG94QUhkUlBnWWlEV1lLUHdSa1ZTc0xObFZ3VUQ5ZGVBSnFCbU1FWkZFbkRIY0lNbFpwQlRkU2JRWWdCR1VHS1E0NFVtWUliZ2RyQjNkVE5BUTdVelZhWmdBM1VURUdNZzA1Q20wRU9sVXdDelpWTTFBMFhXb0NhQVpqQkc1Uk5ReGdDRzlXWkFVd1VqVUdOd1J0Qm00T00xSmtDR1VIWWdjMlV5RUVaVk42IiwicHJ2IjoiOTE1ZWYzYjE0NTc5N2Q5NjM2ZTY2Nzg2NjA4OWM2YmIxZmUzMmUxYyIsImlkIjoiQm1NRVpBWm9EamhTTGdndkIyc0haMU01Qkh4VGJsb3hBSGRSUGdZaURXWUtQd1JrVlNzTE5sVndVRDlkZUFKcUJtTUVaRkVuREhjSU1sWnBCVGRTYlFZZ0JHVUdLUTQ0VW1ZSWJnZHJCM2RUTkFRN1V6VmFaZ0EzVVRFR01nMDVDbTBFT2xVd0N6WlZNMUEwWFdvQ2FBWmpCRzVSTlF4Z0NHOVdaQVV3VWpVR053UnRCbTRPTTFKa0NHVUhZZ2MyVXlFRVpWTjYiLCJjb21wYW55X2lkIjoiNDMiLCJtb2JpbGUiOiIxMzkxODA4NzQzMCIsIm9wZXJhdG9yX3R5cGUiOiJhZG1pbiIsImlzX2F1dGhvcml6ZXIiOmZhbHNlLCJsb2dpbnR5cGUiOiJhZG1pbiIsImxpY2Vuc2VfYXV0aG9yaXplIjoiZXlKMllXeHBaQ0k2SW5SeWRXVWlMQ0psZUhCcGNtVmtRWFFpT2lJeU9EYzRNell5TnpjeUlpd2laR1Z6WXlJNklseDFPR0prTlZ4MU56VXlPQ0o5In0.Yu8lQjz4BPEzOTY1vrA-SAI5v1arl2uKIw0UM12khVc`
    // }

    const { company_id, appid } = this.options
    if (process.env.TARO_ENV === 'weapp') {
      if (appid) {
        header['authorizer-appid'] = appid
      }
    }

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
    const workEnv = S.get('workEnv', true)
    let ba_params = S.get('ba_params', true)

    if (workEnv && workEnv.environment === 'wxwork') {
      //企业微信

      let guide_code = options.data.guide_code
        ? options.data.guide_code
        : ba_params
        ? ba_params.guide_code
        : null
      options.data.guide = true
      options.data.guide_code = guide_code
      console.log('======导购端请求参数====')

      console.log(ba_params)
    }
    let resData = {}
    return Taro.request(options)
      .then((res) => {
        resData = res
      })
      .catch((err) => {
        resData.statusCode = err.status

        resData.header = {}

        err.headers.forEach((val, key) => {
          resData.header[key] = val
        })

        if (config.responseType === 'arraybuffer') {
          return err.arrayBuffer()
        }

        if (config.dataType === 'json' || typeof config.dataType === 'undefined') {
          return err.json()
        }

        if (config.responseType === 'text') {
          return err.text()
        }

        return Promise.resolve(null)
      })
      .then((res) => {
        // 如果有错误则为错误信息
        if (res) {
          resData.data = res
        }
        // eslint-disable-next-line
        const { data, statusCode, header } = resData
        if (showLoading) {
          Taro.hideLoading()
        }

        if (statusCode >= 200 && statusCode < 300) {
          if (data.data !== undefined) {
            if (options.url.indexOf('token/refresh') >= 0) {
              data.data.token = resData.header.Authorization.replace('Bearer ', '')
            }
            return data.data
          } else {
            if (showError) {
              this.errorToast(data)
            }
            return Promise.reject(this.reqError(resData))
          }
        }

        if (statusCode === 401) {
          if (data.error && data.error.code === 401002) {
            this.errorToast({
              msg: '帐号已被禁用'
            })
            return Promise.reject(this.reqError(resData, '帐号已被禁用'))
          }
          S.logout()
          S.login(this, true)
          return Promise.reject(this.reqError(resData))
        }

        if (statusCode >= 400) {
          if (showError && data.error.message !== '当前余额不足以支付本次订单费用，请充值！') {
            this.errorToast(data)
          }
          return Promise.reject(this.reqError(resData))
        }

        return Promise.reject(this.reqError(resData, `API error: ${statusCode}`))
      })
  }

  reqError(res, msg = '') {
    const data = res.data.error || res.data
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

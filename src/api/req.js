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
    // debugger
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
    // if (token) {
    //   header['Authorization'] = `Bearer ${token}`
    // }
    header[
      'Authorization'
    ] = `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9lY3Nob3B4Mi5zaG9wZXgxMjMuY29tXC9hcGlcL3Rva2VuXC9yZWZyZXNoIiwiaWF0IjoxNjIyNjg1Mjg4LCJleHAiOjE2MjI3MjA5ODksIm5iZiI6MTYyMjcwMjk4OSwianRpIjoia0o4QjRsV3YxRXJCTE1VRiIsInN1YiI6IkJXQUhaMVE2RHprSGV3UWpVejhDWWxRK0IzOVZhQWxpVlNJR2FRWWlCbTBBTlZBd1ZDb1BNZ1VnQm1sVGRsUThBV1FCWVZZZ1dTSUdQRnBsQXpFRU93VWpCMlpVZXc4NUJ6TUVZbE1cL0FuSlVNd2M0VlRNSk5WVmlCbVlHTWdZeUFHZFFibFF4RHpJRll3WmlVMlJVUGdGa0FXdFdNbGsxQm1GYWFBTTJCR01GTkFkdVZEd1BNZ2N4QkdsVE5nSXpWQ1lIWmxWOCIsInBydiI6IjkxNWVmM2IxNDU3OTdkOTYzNmU2Njc4NjYwODljNmJiMWZlMzJlMWMiLCJpZCI6IkJXQUhaMVE2RHprSGV3UWpVejhDWWxRK0IzOVZhQWxpVlNJR2FRWWlCbTBBTlZBd1ZDb1BNZ1VnQm1sVGRsUThBV1FCWVZZZ1dTSUdQRnBsQXpFRU93VWpCMlpVZXc4NUJ6TUVZbE1cL0FuSlVNd2M0VlRNSk5WVmlCbVlHTWdZeUFHZFFibFF4RHpJRll3WmlVMlJVUGdGa0FXdFdNbGsxQm1GYWFBTTJCR01GTkFkdVZEd1BNZ2N4QkdsVE5nSXpWQ1lIWmxWOCIsImNvbXBhbnlfaWQiOiI0MyIsIm1vYmlsZSI6IjEzOTE4MDg3NDMwIiwib3BlcmF0b3JfdHlwZSI6ImFkbWluIiwiaXNfYXV0aG9yaXplciI6ZmFsc2UsImxvZ2ludHlwZSI6ImFkbWluIiwibGljZW5zZV9hdXRob3JpemUiOiJleUoyWVd4cFpDSTZJblJ5ZFdVaUxDSmxlSEJwY21Wa1FYUWlPaUl5T0RjNE16WXlOemN5SWl3aVpHVnpZeUk2SWx4MU9HSmtOVngxTnpVeU9DSjkifQ.YnEvBqzv1towjGfLeQoqfeg0ddTUVPKPOn3K0In-3FI`

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
    // .catch(err => {
    //   if (
    //     config.dataType === "json" ||
    //     typeof config.dataType === "undefined"
    //   ) {
    //     // console.log(err.json())
    //     return err.json();
    //   }
    //   return Promise.resolve(null);
    // })
    // .then(res => {
    //   // 如果有错误则为错误信息
    //   const { message, status_code } = res
    //   if ( status_code == 400 ) {
    //     // if(showError)
    //     showToast( message )
    //     return Promise.reject(this.reqError(resData));
    //   }
    //   // eslint-disable-next-line
    //   // const { data, statusCode, header } = resData;
    //   if (showLoading) {
    //     Taro.hideLoading();
    //   }

    //   // if (statusCode >= 200 && statusCode < 300) {
    //   //   if (data.data !== undefined) {
    //   //     if (options.url.indexOf("token/refresh") >= 0) {
    //   //       data.data.token = resData.header.Authorization.replace(
    //   //         "Bearer ",
    //   //         ""
    //   //       );
    //   //     }
    //   //     return data.data;
    //   //   } else {
    //   //     if (showError) {
    //   //       this.errorToast(data);
    //   //     }
    //   //     return Promise.reject(this.reqError(resData));
    //   //   }
    //   // }

    //   // if (statusCode === 401) {
    //   //   if (data.error && data.error.code === 401002) {
    //   //     this.errorToast({
    //   //       msg: "帐号已被禁用"
    //   //     });
    //   //     return Promise.reject(this.reqError(resData, "帐号已被禁用"));
    //   //   }
    //   //   S.logout();
    //   //   S.login(this, true);
    //   //   return Promise.reject(this.reqError(resData));
    //   // }

    //   // if (statusCode >= 400) {
    //   //   if (
    //   //     showError &&
    //   //     data.error.message !== "当前余额不足以支付本次订单费用，请充值！"
    //   //   ) {
    //   //     this.errorToast(data);
    //   //   }
    //   //   return Promise.reject(this.reqError(resData));
    //   // }

    //   return Promise.reject(
    //     this.reqError(resData, `API error: ${statusCode}`)
    //   );
    // });
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

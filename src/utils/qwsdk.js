import api from '@/api'
import { reject } from 'lodash'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { isIos } from '@/utils'
/**
 * 安卓端兼容webView 相关文档:
 * https://developers.weixin.qq.com/community/develop/doc/0004ac1eb98950c61c3b073985ec00?_at=1616587626673
 * https://blog.csdn.net/Gage__/article/details/105820461
 *  */

class QWSDK {
  static getQwsdk() {
    if (window.__qwsdk) return window.__qwsdk
    else {
      window.__qwsdk = new QWSDK()
    }
    return window.__qwsdk
  }
  constructor() {
    this.init()
  }
  set(key, val) {
    this[key] = val
    console.log('QWSDK.set', this)
  }
  init() {
    this._isWebView = false
    this._url = ''
    this._isAndroid = !isIos()
  }
  async register({ url }) {
    console.log('QWSDK:register:url', url)
    console.log('QWSDK:register:webView-url', this._url)
    console.log('this._isWebView && this._isAndroid', this._isWebView, this._isAndroid)
    if (this._isWebView && this._isAndroid) url = this._url //location.href.split('#')[0]
    console.log('QWSDK:register:post-url', url)
    const jssdkConfig = await api.auth.getQwJsSdkConfig({
      url
    })
    console.log('QWSDK:register:jssdkConfig2', jssdkConfig)
    const { appId, timestamp, nonceStr, signature } = jssdkConfig
    wx.config({
      beta: true, // 必须这么写，否则wx.invoke调用形式的jsapi会有问题
      debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
      appId, // 必填，企业微信的corpID
      timestamp, // 必填，生成签名的时间戳
      nonceStr, // 必填，生成签名的随机串
      signature, // 必填，签名，见 附录-JS-SDK使用权限签名算法
      jsApiList: ['scanQRCode'] // 必填，需要使用的JS接口列表，凡是要调用的接口都需要传进来
    })

    wx.ready(function () {
      console.log('wx sdk ready')
      // console.log('wx sdk ready:wx', wx)
    })

    wx.error(function (res) {
      console.log('wx sdk error:', res)
      // console.log('wx sdk error:wx', wx)
    })
  }
  scanQRCode() {
    return new Promise((resolve, reject) => {
      wx.scanQRCode({
        desc: 'scanQRCode desc',
        needResult: 1, // 默认为0，扫描结果由企业微信处理，1则直接返回扫描结果，
        scanType: ['qrCode', 'barCode'], // 可以指定扫二维码还是条形码（一维码），默认二者都有
        success: function (res) {
          if (res.errMsg == 'scanQRCode:ok') {
            resolve(res.resultStr)
          } else {
            reject(res)
          }
        },
        error: function (res) {
          if (res.errMsg.indexOf('function_not_exist') > 0) {
            alert('版本过低请升级')
          }
          reject(res)
        }
      })
    })
  }
}

export default QWSDK.getQwsdk()

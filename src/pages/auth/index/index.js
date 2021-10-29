import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import api from '@/api'
import { showToast, isIos, qwsdk } from '@/utils'
import S from '@/spx'
import FtLogo from '../comps/ft-logo'
import { SpToast } from '@/components'
import './index.scss'

export default class Index extends Component {
  state = {
    ...this.state,
    OAuthUrl: ''
  }

  async componentDidMount() {
    const { href } = window.location
    const that = this
    console.log('page_index:componentDidMount:qwsdk.register', href)
    qwsdk.register({
      url: href
    })
    console.log('auto:handleOnScanQRCode1')
    try {
      setTimeout(async () => {
        const res = await qwsdk.scanQRCode()
        console.log('auto:handleOnScanQRCode2', res)
      }, 500)

      setTimeout(() => that.init(), 300)
    } catch (e) {
      console.log('auth :componentDidMount:catch', e)
    }
  }
  init() {
    const { params } = getCurrentInstance().router
    const { code, company_id, token, entryCode } = params
    if (token) {
      Taro.setStorageSync('isWebView', true)
      console.log('isIos()', isIos())
      if (!isIos()) {
        Taro.setStorageSync('wxConfigSignUrl', location.href.split('#')[0])
      } else {
        Taro.setStorageSync('wxConfigSignUrl', '')
      }
      this.getUserInfo(token)
    } else {
      if (code) {
        this.workwechatOauthLogin(code, company_id)
      } else {
        this.getAuthorizeUrl()
      }
    }
  }

  async getUserInfo(token) {
    S.setAuthToken(token)
    const userInfo = await api.operator.getUserInfo()
    S.set('user_info', userInfo, true)
    Taro.redirectTo({ url: `/pages/planSelection/index` })
  }

  async workwechatOauthLogin(code, company_id) {
    const { status, work_userid, check_token, token } = await api.auth.workwechatOauthLogin({
      company_id,
      code
    })
    if (status == 'success') {
      this.getUserInfo(token)
      // S.setAuthToken(token)
      // const userInfo = await api.operator.getUserInfo()

      // S.set('user_info', userInfo, true)
      // Taro.redirectTo({ url: `/pages/planSelection/index` })
    } else if (status == 'unbound') {
      Taro.redirectTo({
        url: `/pages/auth/bindPhone?work_userid=${work_userid}&check_token=${check_token}`
      })
    }
  }

  async getAuthorizeUrl() {
    const { url } = await api.auth.getAuthorizeUrl()
    this.setState({ OAuthUrl: url })
  }

  handleClickQwOauth() {
    const { OAuthUrl } = this.state
    if (OAuthUrl) {
      window.location.href = OAuthUrl
    } else {
      showToast('请配置授权地址')
    }
  }

  render() {
    return (
      <View className='page-auth-index'>
        <ScrollView className='welcome-scrollview' scrollY scrollWithAnimation>
          <View className='title'>欢迎登录</View>
          <View className='sub-title'>数据透视·智慧赋能·全渠道管理</View>
          <View className='logo-con'>
            <Image className='m-bk' mode='widthFix' src={require('@/assets/imgs/login-bk.png')} />
            <Image className='s-bk' mode='widthFix' src={require('@/assets/imgs/login-icon.png')} />
          </View>
          <View className='btn-con'>
            <Image
              className='btn btn-img'
              mode='widthFix'
              onClick={this.handleClickQwOauth.bind(this)}
              src={require('@/assets/imgs/login-btn.png')}
            />
          </View>
        </ScrollView>
        <FtLogo />
        <SpToast />
      </View>
    )
  }
}

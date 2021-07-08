import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { SpTimer, SpToast } from '@/components'
import { getThemeStyle, validate, getCurrentRoute, requestCallback } from '@/utils'
import LOGO from '@/assets/imgs/shopex-logo.png'
import api from '@/api'
import S from '@/spx'
import './login.scss'

export default class Login extends Component {
  state = {
    info: {
      mobile: '',
      vcode: '',
      type: 'login'
    },
    loginType: 0 // 0:验证码登录；1:密码登录
  }

  componentDidMount() {}

  async handleSubmit() {
    const { mobile, vcode } = this.state.info
    const { work_userid, check_token } = getCurrentRoute().params
    if (!validate.isMobileNum(mobile)) {
      S.toast('请输入正确的手机号')
      return
    }
    if (validate.isRequired(vcode)) {
      S.toast('请输入验证码')
      return
    }

    requestCallback(
      async () => {
        const data = await api.operator.bindPhone({
          work_userid,
          check_token,
          mobile,
          vcode
        })
        return data
      },
      '',
      async ({ token }) => {
        if (token) {
          S.setAuthToken(token)
          const userInfo = await api.operator.getUserInfo()
          S.set('user_info', userInfo, true)
          Taro.redirectTo({ url: `/pages/planSelection/index` })
        } else {
          S.toast('登录失败')
        }
      }
    )
  }

  async handleTimerStart(resolve) {
    const { mobile, type } = this.state.info
    if (!validate.isMobileNum(mobile)) {
      S.toast('请输入正确的手机号')
      return
    }
    await api.operator.sendCode({
      mobile,
      type
    })
    S.toast('验证码已发送')
    resolve()
  }

  handleTimerStop() {}

  handleInputChange(name, val) {
    const { info } = this.state
    info[name] = val
    this.setState({
      info
    })
  }

  render() {
    const { info } = this.state
    return (
      <View className='page-auth-login' style={getThemeStyle()}>
        <View className='page-auth-wrapper'>
          <View className='auth-hd'>
            <View className='title'>欢迎登录商派</View>
            <View className='desc'>未注册的手机号验证后自动创建商派账号</View>
          </View>
          <View className='auth-bd'>
            <View className='form-title'>中国大陆 +86</View>
            <AtForm className='form'>
              <View className='form-field'>
                <AtInput
                  clear
                  name='mobile'
                  maxLength={11}
                  type='tel'
                  value={info.mobile}
                  placeholder='请输入您的手机号码'
                  onChange={this.handleInputChange.bind(this, 'mobile')}
                />
              </View>
              <View className='form-field'>
                <View className='input-field'>
                  <AtInput
                    clear
                    name='vcode'
                    value={info.vcode}
                    placeholder='请输入验证码'
                    onChange={this.handleInputChange.bind(this, 'vcode')}
                  />
                </View>
                <View className='btn-field'>
                  <SpTimer
                    onStart={this.handleTimerStart.bind(this)}
                    onStop={this.handleTimerStop}
                  />
                </View>
              </View>
              {/* <View className='btn-text'>密码登录</View> */}
              <View className='form-submit'>
                <AtButton
                  circle
                  className='btn-submit'
                  type='primary'
                  onClick={this.handleSubmit.bind(this)}
                >
                  登录
                </AtButton>
              </View>
            </AtForm>
          </View>
        </View>
        <SpToast />
        <View className='auth-ft'>
          <Image className='logo' mode='widthFix' src={LOGO} />
        </View>
      </View>
    )
  }
}

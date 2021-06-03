import { Component } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { SpTimer } from '@/components'
import { getThemeStyle, validate, showToast, getCurrentRoute } from '@/utils'
import api from '@/api'
import S from '@/spx'
import FtLogo from './comps/ft-logo'
import './bindPhone.scss'

export default class BindPhone extends Component {
  state = {
    info: {
      mobile: '',
      vcode: ''
    },
    loginType: 0 // 0:验证码登录；1:密码登录
  }

  componentDidMount() {}

  async handleSubmit() {
    const { mobile, code } = this.state.info
    const { work_userid, check_token } = getCurrentRoute().params
    if (!validate.isMobileNum(mobile)) {
      showToast('请输入正确的手机号')
      return
    }
    const { status, token } = await api.auth.bindMobile({
      work_userid,
      check_token,
      mobile
    })
    S.setAuthToken(token)
    const userInfo = await api.operator.getUserInfo()
    S.set('user_info', userInfo, true)
    Taro.redirectTo({ url: `/pages/index` })
  }

  async handleTimerStart() {
    const { mobile } = this.state.info
    if (!validate.isMobileNum(mobile)) {
      showToast('请输入正确的手机号')
      return
    }
    await api.operator.sendCode({
      mobile
    })
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
      <View className='page-auth-bindphone' style={getThemeStyle()}>
        <ScrollView className='bindphone-scrollview' scrollY scrollWithAnimation>
          <View className='auth-hd'>
            <View className='title'>绑定手机号</View>
            <View className='desc'>请输入云店后台已注册手机号</View>
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
              <View className='form-submit'>
                <AtButton
                  circle
                  className='btn-submit'
                  type='primary'
                  onClick={this.handleSubmit.bind(this)}
                >
                  绑定
                </AtButton>
              </View>
            </AtForm>
          </View>
        </ScrollView>
        <FtLogo />
      </View>
    )
  }
}

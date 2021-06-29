import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { getThemeStyle, validate, showToast, getCurrentRoute, requestCallback } from '@/utils'
import api from '@/api'
import S from '@/spx'
import FtLogo from './comps/ft-logo'
import './bindPhone.scss'

export default class BindPhone extends Component {
  state = {
    info: {
      mobile: '',
      vcode: '',
      imgcode: ''
    },
    rightImgcode: {},
    loginType: 0 // 0:验证码登录；1:密码登录
  }

  getImgCode = async () => {
    const rightImgcode = await api.auth.getImageVerificationCode({
      type: 'login'
    })
    this.setState({
      rightImgcode
    })
  }

  async componentDidShow() {
    await this.getImgCode()
  }

  async handleSubmit() {
    const {
      info: { mobile, imgcode },
      rightImgcode: { imageData, imageToken }
    } = this.state
    const { work_userid, check_token } = getCurrentRoute().params
    if (!validate.isMobileNum(mobile)) {
      showToast('请输入正确的手机号')
      return
    }
    if (!imgcode) {
      showToast('请输入图形验证码')
      return
    }
    requestCallback(
      async () => {
        const data = await api.auth.getPhoneCode({
          mobile: mobile,
          token: imageToken,
          yzm: imgcode,
          type: 'login'
        })
        return data
      },
      '',
      ({ order_id }) => {
        Taro.navigateTo({
          url: `/pages/auth/bindPhoneStepTwo?phone=${mobile}&work_userid=${work_userid}&check_token=${check_token}`
        })
      },
      () => {
        this.getImgCode()
      }
    )

    // Taro.navigateTo({
    //   url:`/pages/auth/bindPhoneStepTwo?phone=${mobile}&imgtoken=${rightImgcode.imageToken}`
    // })

    // const { status, token } = await api.auth.bindMobile({
    //   work_userid,
    //   check_token,
    //   mobile
    // })
    // if (token) {
    //   S.setAuthToken(token)
    //   const userInfo = await api.operator.getUserInfo()
    //   S.set('user_info', userInfo, true)
    //   Taro.redirectTo({ url: `/pages/planSelection/index` })
    // } else {
    //   showToast('登录失败')
    // }
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

  //刷新验证码
  handleRefreshImgCode = () => {
    this.getImgCode()
  }

  render() {
    const { info, rightImgcode } = this.state
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
              <View className='form-field'>
                <AtInput
                  clear
                  name='imgcode'
                  maxLength={11}
                  type='tel'
                  value={info.imgcode}
                  placeholder='请输入右侧图形验证码'
                  onChange={this.handleInputChange.bind(this, 'imgcode')}
                />
                <Image
                  className='img-code'
                  src={rightImgcode.imageData}
                  onClick={this.handleRefreshImgCode}
                />
              </View>
              <View className='form-submit'>
                <AtButton
                  circle
                  className='btn-submit'
                  type='primary'
                  onClick={this.handleSubmit.bind(this)}
                >
                  发送验证码
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

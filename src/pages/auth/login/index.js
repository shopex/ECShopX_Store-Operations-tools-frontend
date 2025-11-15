// +----------------------------------------------------------------------
// | ECShopX open source E-commerce
// | ECShopX 开源商城系统
// +----------------------------------------------------------------------
// | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
// +----------------------------------------------------------------------
// | Corporate Website:  https://www.shopex.cn
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// | http://www.apache.org/licenses/LICENSE-2.0
// +----------------------------------------------------------------------
// | The removal of shopeX copyright information without authorization is prohibited.
// | 未经授权不可去除shopeX商派相关版权
// +----------------------------------------------------------------------
// | Author: shopeX Team <mkt@shopex.cn>
// | Contact: 400-821-3106
// +----------------------------------------------------------------------

import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from 'taro-ui'
import { SpTimer, SpToast } from '@/components'
import { getThemeStyle, validate, showToast } from '@/utils'
import LOGO from '@/assets/imgs/shopex-logo.png'
import api from '@/api'
import './index.scss'

export default class Login extends Component {
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
    if (!validate.isMobileNum(mobile)) {
      showToast('请输入正确的手机号')
      return
    }
    if (!validate.isRequired(mobile)) {
      showToast('请输入验证码')
      return
    }
    await api.operator.smsLogin({
      mobile,
      code,
      logintype: 'smsstaff'
    })
  }

  handleTimerStart = async (resolve) => {
    const { mobile } = this.state.info
    if (!validate.isMobileNum(mobile)) {
      showToast('请输入正确的手机号')
      return
    }
    await api.operator.sendCode({
      mobile
    })
    showToast('验证码已发送')
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
                <SpTimer onStart={this.handleTimerStart.bind(this)} onStop={this.handleTimerStop} />
              </View>
            </View>
            <View className='btn-text'>密码登录</View>
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
        <View className='auth-ft'>
          <Image className='logo' mode='widthFix' src={LOGO} />
        </View>
        <SpToast />
      </View>
    )
  }
}

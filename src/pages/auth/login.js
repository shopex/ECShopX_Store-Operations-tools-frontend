import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtForm, AtInput, AtButton } from "taro-ui";
import { SpTimer } from '@/components'
import { getThemeStyle } from '@/utils'
import LOGO from '@/assets/imgs/shopex-logo.png'
import './login.scss'

export default class Login extends Component {
  state = {
    info: {
      mobile: '',
      vcode: ''
    }
  }

  componentDidMount() { }
  
  handleSubmit() {
    debugger
  }

  render() {
    const { info } = this.state
    return (
      <View className='page-auth-login' style={ getThemeStyle() }>
        <View className='auth-hd'>
          <View className='title'>欢迎登录商派</View>
          <View className='desc'>未注册的手机号验证后自动创建商派账号</View>
        </View>
        <View className='auth-bd'>
          <View className='form-title'>中国大陆 +86</View>
          <AtForm className='form'>
            <View className='form-field'>
              <AtInput
                name="mobile"
                maxLength={11}
                type="tel"
                value={info.mobile}
                placeholder="请输入您的手机号码"
              />
            </View>
            <View className='form-field'>
              <View className='input-field'>
                <AtInput
                  name="vcode"
                  value={info.vcode}
                  placeholder="请输入验证码"
                />
              </View>
              <View className='btn-field'>
                <SpTimer />
              </View>
            </View>
            <View className="form-field">
              <AtButton type="primary" onClick={this.handleSubmit.bind(this)}>
                登录
              </AtButton>
            </View>
          </AtForm>
        </View>
        <View className='auth-ft'>
          <Image className='logo'  mode='widthFix' src={ LOGO } />
        </View>
      </View>
    )
  }
}

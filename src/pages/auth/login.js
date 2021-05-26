import { Component } from 'react'
import { View, Image } from '@tarojs/components'
import { AtForm, AtButton } from "taro-ui";
import './login.scss'
import LOGO from '@/assets/imgs/shopex-logo.png'
export default class Login extends Component {

  componentDidMount () { }

  render () {
    return (
      <View className='page-auth-login'>
        <View className='auth-hd'>
          <View className='title'>欢迎登录商派</View>
          <View className='desc'>未注册的手机号验证后自动创建商派账号</View>
        </View>
        <View className='auth-bd'>
          <View>中国大陆 +86</View>
          <AtForm className='form'>
            <View className='form-field'></View>
          </AtForm>
          <View className='form-btn'>

          </View>
        </View>
        <View className='auth-ft'>
          <Image className='logo'  mode='widthFix' src={ LOGO } />
        </View>
      </View>
    )
  }
}

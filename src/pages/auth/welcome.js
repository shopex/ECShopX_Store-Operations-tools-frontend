import { Component } from 'react'
import { View, Image, Text, ScrollView } from '@tarojs/components'
import FtLogo from './comps/ft-logo'
import './welcome.scss'

export default class WelCome extends Component {
  componentDidMount() {}

  render() {
    return (
      <View className='page-auth-welcome'>
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
              src={require('@/assets/imgs/login-btn.png')}
            />
          </View>
        </ScrollView>
        <FtLogo />
      </View>
    )
  }
}

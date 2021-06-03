import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { classNames } from '@/utils'
import './index.scss'

class MessageCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
  }

  handleChange = (active) => (e) => {
    this.setState({
      active
    })
  }

  render() {
    const { className } = this.props

    const { active } = this.state

    return (
      <View className={classNames('sp-page-message-card', className)}>
        <View className='header'>
          <View className='item left' onClick={this.handleChange(0)}>
            <Text>收货人信息</Text>
          </View>
          <View className='item right' onClick={this.handleChange(1)}>
            <Text>买家信息</Text>
          </View>
          <View
            className={classNames('underline', {
              activeLeft: active === 0,
              activeRight: active === 1
            })}
          ></View>
        </View>
        <View className='content'>
          <View className='content-item'>
            <View className='title'>收货人</View>
            <View className='value'>收货人</View>
          </View>
          <View className='content-item'>
            <View className='title'>收货地址</View>
            <View className='value'>
              我是收货人姓名 1388888888上海市上海徐汇区田林街道宜山路700号普天信息产业园区C1幢12楼
            </View>
          </View>
        </View>
        <View className='footer'>
          <View className='content'>
            <Text className='iconfont icon-shoujihao'></Text>
            <Text className='text'>拨打电话</Text>
          </View>
        </View>
      </View>
    )
  }
}
export default MessageCard

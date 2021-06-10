import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
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

  handleCallPhone = () => {
    const { leftPhone, rightPhone } = this.props
    Taro.makePhoneCall({
      phoneNumber: this.state.active === 0 ? leftPhone : rightPhone
    })
  }

  render() {
    const {
      className,
      leftTitle,
      rightTitle = '买家信息',
      leftContent = [],
      rightContent = []
    } = this.props

    const { active } = this.state

    return (
      <View className={classNames('sp-page-message-card', className)}>
        <View className='header'>
          <View className='item left' onClick={this.handleChange(0)}>
            <Text>{leftTitle}</Text>
          </View>
          <View className='item right' onClick={this.handleChange(1)}>
            <Text>{rightTitle}</Text>
          </View>
          <View
            className={classNames('underline', {
              activeLeft: active === 0,
              activeRight: active === 1
            })}
          ></View>
        </View>
        {active === 0 && (
          <View className='content'>
            {leftContent.map((left) => (
              <View className='content-item' key={left.label}>
                <View className='title'>{left.label}</View>
                <View className='value'>{left.value}</View>
              </View>
            ))}
          </View>
        )}
        {active === 1 && (
          <View className='content'>
            {rightContent.map((left) => (
              <View className='content-item' key={left.label}>
                <View className='title'>{left.label}</View>
                <View className='value'>{left.value}</View>
              </View>
            ))}
          </View>
        )}
        <View className='footer'>
          <View className='content' onClick={this.handleCallPhone}>
            <Text className='iconfont icon-shoujihao'></Text>
            <Text className='text'>拨打电话</Text>
          </View>
        </View>
      </View>
    )
  }
}
export default MessageCard

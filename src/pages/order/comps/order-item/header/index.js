import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { copyContent } from '@/utils'

export default class No extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { info } = this.props

    return (
      <View className='order-header'>
        <View className='order-no'>
          <Text className='no'>{info.no}</Text>
          <Text className='copy' onClick={() => copyContent(info.no)}>
            复制
          </Text>
        </View>
        <View className='order-time'>{info.time}</View>
      </View>
    )
  }
}

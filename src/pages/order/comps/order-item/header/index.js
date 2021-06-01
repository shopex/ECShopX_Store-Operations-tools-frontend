import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { copyContent } from '@/utils'
import { ORDER_STATUS } from '@/consts'

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
          <Text className='no'>{info.order_id}</Text>
          <Text className='copy' onClick={() => copyContent(info.no)}>
            复制
          </Text>
        </View>
        <View className='order-time'>{info.create_date}</View>

        <View className='order-status'>
          <Text className='order-status-text'>{ORDER_STATUS[info.order_status.toLowerCase()]}</Text>
          <Text className='order-status-background'></Text>
        </View>
      </View>
    )
  }
}

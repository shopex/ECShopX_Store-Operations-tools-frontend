import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { copyContent } from '@/utils'
import { ORDER_STATUS } from '@/consts'

export default class No extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderStatus = (orderInfo) => {
    const {
      app_info: { list_status_mag }
    } = orderInfo
    return (
      <View className='order-status'>
        <Text className='order-status-text'>{list_status_mag}</Text>
        <Text className='order-status-background'></Text>
      </View>
    )
  }

  render() {
    const { info } = this.props

    return (
      <View className='order-header'>
        <View className='order-no'>
          <Text className='no'>{info.order_id}</Text>
          <Text className='copy' onClick={() => copyContent(info.order_id)}>
            复制
          </Text>
        </View>
        <View className='order-time'>{info.create_date}</View>

        {this.renderStatus(info)}
      </View>
    )
  }
}

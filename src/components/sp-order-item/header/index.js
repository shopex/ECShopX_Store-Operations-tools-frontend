import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { copyContent } from '@/utils'
import { OrderStatus } from '@/components/sp-page-components'

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
          <Text className='copy' onClick={() => copyContent(info.order_id)}>
            复制
          </Text>
        </View>
        <View className='order-time'>{info.create_date}</View>

        <OrderStatus msg={info?.app_info?.list_status_mag} />
      </View>
    )
  }
}

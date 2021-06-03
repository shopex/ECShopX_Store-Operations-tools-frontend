import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { MessageCard, FixedAction, CommonButton } from '@/components/sp-page-components'
import { getThemeStyle } from '@/utils'
import './index.scss'

class OrderDelivery extends Component {
  render() {
    return (
      <View className='page-order-delivery' style={getThemeStyle()}>
        <MessageCard className='margin-top' />

        <FixedAction>
          <CommonButton text='确认发货' type='primary' size='normal' />
        </FixedAction>
      </View>
    )
  }
}

export default OrderDelivery

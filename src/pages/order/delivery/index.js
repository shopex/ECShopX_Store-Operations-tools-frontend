import React, { Component } from 'react'
import { View } from '@tarojs/components'
import { SpMessageCard, SpFixedAction, SpCommonButton } from '@/components'
import { getThemeStyle } from '@/utils'
import './index.scss'

class OrderDelivery extends Component {
  render() {
    return (
      <View className='page-order-delivery' style={getThemeStyle()}>
        <SpMessageCard className='margin-top' />

        <SpFixedAction>
          <SpCommonButton text='确认发货' type='primary' size='normal' />
        </SpFixedAction>
      </View>
    )
  }
}

export default OrderDelivery

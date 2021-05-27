import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { SpGoodItem } from '@/components'
import HeaderInfo from './header'
import './index.scss'

export default class OrderItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { info } = this.props

    return (
      <View className='comp-order-item'>
        <View className='comp-order-item-header'>
          <HeaderInfo info={info} />
        </View>
        <View className='comp-order-item-body'>
          {info.goodList.map((goodItem) => (
            <SpGoodItem info={goodItem} />
          ))}
        </View>
        <View className='comp-order-item-extra'></View>
        <View className='comp-order-item-footer'></View>
      </View>
    )
  }
}

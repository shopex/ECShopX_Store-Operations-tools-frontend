import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'

import { View, Text, ScrollView } from '@tarojs/components'
import { AtCard } from 'taro-ui'
import './index.scss'

export default class MessageDetail extends PureComponent {
  constructor(props) {
    super(props)
    Taro.setNavigationBarTitle({ title: '等会撒很大声1212' })
  }
  componentDidMount() {}

  render() {
    console.log(this.props)
    const { goodsName, total_fee, number, orderId } = this.props.SpMessageDetailData
    const { date, msgType, titleList } = this.props
    return (
      <View className='cpn-messageDetail'>
        <View className='date'>{date}</View>
        <View className='box'>
          <View className='top'>
            <View className='title'>{goodsName}</View>
            <View className='iconfont icon-jiantou'></View>
          </View>
          <View className='list'>
            <View className='item'>
              <View className='title'>{titleList[0]}</View>
              <View className='content'>{date}</View>
            </View>
            <View className='item'>
              <View className='title'>{titleList[1]}</View>
              <View className='content order'>
                <View className='subtitle'>{total_fee}</View>
                {titleList[1] === '商品名称' && <View className='info'>{date}</View>}
              </View>
            </View>
            <View className='item'>
              <View className='title'>{titleList[2]}</View>
              <View className='content'>{orderId}</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

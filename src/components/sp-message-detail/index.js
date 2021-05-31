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
    const { date, productCoding, productName, productNum, progress, type } =
      this.props.SpMessageDetailData
    return (
      <View className='cpn-messageDetail'>
        <View className='date'>{date}</View>
        <View className='box'>
          <View className='top'>
            <View className='title'>{type}</View>
            <View className='iconfont icon-jiantou'></View>
          </View>
          <View className='list'>
            <View className='item'>
              <View className='title'>处理进度</View>
              <View className='content'>{progress}</View>
            </View>
            <View className='item'>
              <View className='title'>商品名称</View>
              <View className='content order'>
                <View className='subtitle'>{productName}</View>
                <View className='info'>{productNum}</View>
              </View>
            </View>
            <View className='item'>
              <View className='title'>售后单号</View>
              <View className='content'>{productCoding}</View>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

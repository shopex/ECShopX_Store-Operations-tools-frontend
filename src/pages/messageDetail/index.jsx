import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'

import { View, Text, ScrollView } from '@tarojs/components'
import { SpMessageDetail } from '@/components'
import './index.scss'

const SpMessageDetailData = [
  {
    date: '5月13日 15:53:08',
    type: '待处理',
    progress: '我是处理进度达',
    productName: '海尔电冰箱',
    productNum: '(数量1/￥99999.00)',
    productCoding: '12312312412412342132131232'
  }
]

export default class MessageDetail extends PureComponent {
  constructor() {
    super()
    Taro.setNavigationBarTitle({ title: '等会撒很大声1212' })
  }
  componentDidMount() {}

  render() {
    return (
      <View className='page-messageDetail'>
        {SpMessageDetailData.map((item) => {
          return <SpMessageDetail key={item.productCoding} SpMessageDetailData={item} />
        })}
      </View>
    )
  }
}

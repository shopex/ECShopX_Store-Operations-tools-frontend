import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import './index.scss'

export default class SearchInput extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View className='comp-order-list-searhInput'>
        <View className='title'>
          <Text>订单号</Text>
          <Text className='iconfont icon-xiala-01'></Text>
        </View>
        <View className='input'>
          <AtInput className='at-input' placeholder='请输入想要搜索的内容' border={false} />
        </View>
      </View>
    )
  }
}

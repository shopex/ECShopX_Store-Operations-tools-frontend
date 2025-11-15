// +----------------------------------------------------------------------
// | ECShopX open source E-commerce
// | ECShopX 开源商城系统
// +----------------------------------------------------------------------
// | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
// +----------------------------------------------------------------------
// | Corporate Website:  https://www.shopex.cn
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// | http://www.apache.org/licenses/LICENSE-2.0
// +----------------------------------------------------------------------
// | The removal of shopeX copyright information without authorization is prohibited.
// | 未经授权不可去除shopeX商派相关版权
// +----------------------------------------------------------------------
// | Author: shopeX Team <mkt@shopex.cn>
// | Contact: 400-821-3106
// +----------------------------------------------------------------------

import React, { PureComponent } from 'react'

import { View, Image } from '@tarojs/components'
import './index.scss'

class Index extends PureComponent {
  constructor(props) {
    super(props)
    console.log(props)
  }
  render() {
    const { imgurl, bgColor, title, subtitle } = this.props.SpMessageData
    const { date, messageNum, onclickHander } = this.props
    return (
      <View className='com-message' onClick={onclickHander}>
        <View className='left'>
          <View className='imgBox' style={bgColor}>
            <Image className='img' src={imgurl}></Image>
          </View>
          <View className='info'>
            <View className='title'>{title}</View>
            <View className='subtitle'>{subtitle}</View>
          </View>
        </View>
        <View className='right'>
          <View className='date'>{date}</View>
          {messageNum > 0 && (
            <View className='messageNum'>{messageNum > 99 ? '99+' : messageNum}</View>
          )}
        </View>
      </View>
    )
  }
}
export default Index

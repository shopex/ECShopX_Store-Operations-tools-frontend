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
import { View } from '@tarojs/components'

import './index.scss'

export default class AfterSaleTreatment extends PureComponent {
  constructor() {
    super()
  }
  componentDidMount() {}

  render() {
    return (
      <View className='cpn-AfterSaleMessage'>
        <View className='box'>
          <View className='status'>
            <View className='message'>待处理</View>
            <View className='tips'>等待商家处理</View>
          </View>
          <View className='icon iconfont icon-keai'></View>
        </View>
      </View>
    )
  }
}

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
import { View, Text } from '@tarojs/components'
import { classNames } from '@/utils'
import './index.scss'

export default class OrderStatus extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderType = () => {
    const { msg } = this.props
    if (msg === '订单已取消') {
      return 'warning'
    } else if (msg === '已完成') {
      return 'success'
    } else if (msg === '已处理') {
      return 'success'
    } else {
      return 'process'
    }
  }

  render() {
    const { msg } = this.props
    return (
      <View className='sp-page-order-status'>
        <Text className='text'>{msg}</Text>
        <Text className={classNames('background', this.renderType())}>{}</Text>
      </View>
    )
  }
}

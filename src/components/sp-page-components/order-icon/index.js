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
import { ORDER_DETAIL_ICON, afterSales } from '@/consts'
import './index.scss'

export default class OrderIcon extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderIcon = () => {
    const { status, pageType } = this.props
    if (pageType === 'afterSalesDetail') {
      return afterSales.DETAIL_ICON[String(status)]
    }
    return ORDER_DETAIL_ICON[status]
  }

  render() {
    return (
      <View className={classNames('sp-page-order-icon', this.props.className)}>
        <Text className={classNames('iconfont', this.renderIcon())}></Text>
      </View>
    )
  }
}

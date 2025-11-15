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

class FixedAction extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  isDetail = () => {
    const { pageType } = this.props
    if (pageType === 'orderDetail' || pageType === 'afterSalesDetail') {
      return true
    }
    return false
  }

  render() {
    const { className, children } = this.props

    return (
      <View
        className={classNames('sp-page-fixed-action', className, {
          ['detail-page']: this.isDetail()
        })}
      >
        {children}
      </View>
    )
  }
}
export default FixedAction

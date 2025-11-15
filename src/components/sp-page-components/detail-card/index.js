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
import { classNames } from '@/utils'
import { OrderIcon } from '@/components/sp-page-components'
import { View } from '@tarojs/components'
import { afterSales } from '@/consts'
import './index.scss'

class DetailCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderMainStatus = () => {
    const { status, pageType, detail } = this.props
    if (pageType === 'afterSalesDetail') {
      return afterSales.LIST_STATUS[detail?.aftersales_status + 1]
    }
    return status
  }

  renderSubStatus = () => {
    const { subStatus, pageType, detail } = this.props
    if (pageType === 'afterSalesDetail') {
      return detail?.app_info?.progress_msg
    }
    return subStatus
  }

  renderIcon = () => {
    const { iconClassName, pageType, detail } = this.props
    if (pageType === 'afterSalesDetail') {
      return detail?.progress
    }
    return iconClassName
  }

  render() {
    const { pageType } = this.props

    return (
      <View className={classNames('sp-page-detail-card')}>
        <View className='status'>
          <View className='main'>{this.renderMainStatus()}</View>
          <View className='sub'>{this.renderSubStatus()}</View>
        </View>
        <OrderIcon status={this.renderIcon()} className='icon' pageType={pageType} />
      </View>
    )
  }
}

export default DetailCard

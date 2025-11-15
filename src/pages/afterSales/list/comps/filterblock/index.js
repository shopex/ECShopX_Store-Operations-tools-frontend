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
import { SpFilterDrawer } from '@/components'
import { afterSales } from '@/consts'
import './index.scss'

const filterListData = Object.keys(afterSales.FILTER_ITEM).map((filterItem) => {
  let itemLabel = afterSales.FILTER_ITEM[filterItem]
  let itemValue = filterItem
  let dataSource = []
  if (itemValue === 'createTime') {
    dataSource = Object.keys(afterSales.FILTER_TIME).map((item) => ({
      label: afterSales.FILTER_TIME[item],
      value: item
    }))
  } else if (itemValue === 'aftersalesType') {
    dataSource = Object.keys(afterSales.AFTERSALES_TYPE).map((item) => ({
      label: afterSales.AFTERSALES_TYPE[item],
      value: item
    }))
  }
  return {
    itemLabel,
    itemValue,
    dataSource
  }
})

export default class FilterBlock extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showFilter: false,
      filterParams: {}
    }
  }

  handleShowDrawer = () => {
    this.setState({
      showFilter: true
    })
  }

  handleCloseDrawer = () => {
    this.setState({
      showFilter: false
    })
  }

  filterData = () => {
    return filterListData
  }

  //点击确认筛选
  handleSubmitParams = (params) => {
    const { onSubmitParams = () => {} } = this.props
    onSubmitParams(params)
    this.setState({
      showFilter: false
    })
  }

  //筛选由近及远
  renderOrderDesc = () => {
    const { pageType } = this.props

    let result = '订单时间'

    if (pageType === 'afterSalesList') {
      result = '售后时间'
    }

    const { orderBy } = this.props

    if (orderBy === 'desc') {
      result += '由近到远'
    } else {
      result += '由远到近'
    }

    return result
  }

  renderFilterTitle = () => {
    const { pageType } = this.props

    if (pageType === 'orderList') {
      return '订单筛选'
    } else if (pageType === 'afterSalesList') {
      return '售后筛选'
    }
  }

  render() {
    const { showFilter } = this.state

    const { pageType, onOrderClick = () => {} } = this.props

    return (
      <View className='filterContent'>
        <View className='comp-order-list-filterBlock'>
          <View className='title'>
            <View className='icon1' onClick={onOrderClick}>
              <Text className='iconfont icon-shaixuan1'></Text>
            </View>
            <Text className='text'>{this.renderOrderDesc()}</Text>
          </View>
          <View className='filterTip' onClick={this.handleShowDrawer}>
            <View className='iconfont icon-shaixuan2'></View>
            <View className='text'>筛选</View>
          </View>
        </View>

        <SpFilterDrawer
          pageType={pageType}
          filterTitle={this.renderFilterTitle()}
          filterData={this.filterData()}
          visible={showFilter}
          onCloseDrawer={this.handleCloseDrawer}
          onConfirm={this.handleSubmitParams}
        />
      </View>
    )
  }
}

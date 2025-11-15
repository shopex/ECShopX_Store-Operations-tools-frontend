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
import { AtTabs } from 'taro-ui'
import { View } from '@tarojs/components'
import { ZITI_ORDER_LIST_STATUS, afterSales } from '@/consts'
import './index.scss'

const getListAboutPage = (pageType) => {
  let returnArr = []
  if (pageType === 'orderList') {
    returnArr = Object.keys(ZITI_ORDER_LIST_STATUS).map((key) => ({
      value: key,
      label: ZITI_ORDER_LIST_STATUS[key]
    }))
  } else if (pageType === 'afterSalesList') {
    returnArr = Object.keys(afterSales.LIST_STATUS).map((key) => ({
      value: key,
      label: afterSales.LIST_STATUS[key]
    }))
  }
  return returnArr
}

class Tabbar extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      dataSource: []
    }
  }

  componentDidMount() {
    const { pageType, mainStatus, statusChange = () => {} } = this.props
    const dataSource = getListAboutPage(pageType)
    if (!mainStatus) {
      statusChange(dataSource[0], true)
    }
    this.setState({
      dataSource
    })
  }

  //发现点的下标
  findIndex = () => {
    const { dataSource } = this.state
    const { mainStatus = {} } = this.props
    const currentIndex = dataSource.findIndex((item) => item.label === mainStatus.label)
    return currentIndex
  }

  //渲染list
  renderTabList = () => {
    const { dataSource } = this.state
    return dataSource.map((d) => ({ title: d.label }))
  }

  //点击tabs
  handleTabClick = (currentIndex) => {
    const { dataSource } = this.state
    const { statusChange = () => {} } = this.props
    statusChange(dataSource[currentIndex])
  }

  render() {
    return (
      <View className='sp-component-tabbar'>
        <View className='left'></View>
        <AtTabs
          current={this.findIndex()}
          scroll
          tabList={this.renderTabList()}
          onClick={this.handleTabClick}
        ></AtTabs>
        <View className='right'></View>
      </View>
    )
  }
}

export default Tabbar

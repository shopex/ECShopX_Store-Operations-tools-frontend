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
import { SpFilterButton } from '@/components'
import { ScrollButton } from '@/components/sp-page-components'
import { AtDrawer } from 'taro-ui'
import './index.scss'

class SpFilterDrawer extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      query: {},
      isSubmit: true
    }
  }

  handleClickBlock = (value, parentValue) => {
    this.setState({
      query: {
        ...this.state.query,
        [parentValue]: value
      }
    })
  }

  handleReset = () => {
    const { onConfirm = () => {} } = this.props
    onConfirm({})
  }

  handleClickConfirm = () => {
    const { onConfirm = () => {} } = this.props
    onConfirm(this.state.query)
  }

  handleConfirm = (isSubmit) => {
    const { onConfirm = () => {} } = this.props
    if (isSubmit) {
      this.setState({
        isSubmit: true
      })
      onConfirm(this.state.query)
    } else {
      this.setState({
        isSubmit: false,
        query: {}
      })
      onConfirm({})
    }
  }

  render() {
    const { visible, onCloseDrawer = () => {}, filterData = [], filterTitle } = this.props
    console.log(this.props)

    const { query, isSubmit } = this.state

    return (
      <AtDrawer
        show={visible}
        mask
        onClose={onCloseDrawer}
        right
        width='85%'
        className='sp-filter-drawer'
      >
        <View className='content'>
          <View className='filterTitle'>
            <Text className='text'>{filterTitle}</Text>

            <Text className='iconfont icon-fanhui' onClick={onCloseDrawer}></Text>
          </View>
          <View className='main'>
            {filterData.map((item, index) => {
              return (
                <View className='filterItem' key={item.itemValue}>
                  <View className='title'>{item.itemLabel}</View>
                  <SpFilterButton
                    filterItems={item.dataSource}
                    currentSelectValue={query[item.itemValue]}
                    onClickBlock={(value) => this.handleClickBlock(value, item.itemValue)}
                  />
                </View>
              )
            })}
          </View>
          <View className='footer'>
            <ScrollButton
              refuseText='重置'
              confirmText='确定并筛选'
              onTransitionEnd={this.handleConfirm}
              onClickConfirm={this.handleClickConfirm}
              isSubmit={isSubmit}
            />
          </View>
        </View>
      </AtDrawer>
    )
  }
}

export default SpFilterDrawer

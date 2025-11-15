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

import React, { useEffect } from 'react'
import { View } from '@tarojs/components'
import { useImmer } from 'use-immer'
import { classNames } from '@/utils'
import { useDepChange } from '@/hooks'
import './index.scss'

const initialState = {
  activeIndex: 0
}

const SpTab = (props) => {
  const { dataSource: tabList, onChange = () => {} } = props

  const handleClickTab = (activeIndex) => () => {
    setState((_state) => {
      _state.activeIndex = activeIndex
    })
  }

  const [state, setState] = useImmer(initialState)

  const { activeIndex } = state

  useDepChange(() => {
    onChange(activeIndex)
  }, [activeIndex])

  return (
    <View className='sp-tab'>
      {tabList.map((item, index) => {
        return (
          <View
            className={classNames('sp-tab-item', {
              'active': activeIndex === index
            })}
            key={item.value}
            onClick={handleClickTab(index)}
          >
            <View className='sp-tab-item_label'>{item.label}</View>
            <View className='sp-tab-item_active' />
          </View>
        )
      })}
    </View>
  )
}

export default SpTab

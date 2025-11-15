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

import React from 'react'
import { View, Image, Text } from '@tarojs/components'
import { SpTab, SpGoodPrice } from '@/components'
import { SelectInput, Tabbar, PageActionButtons } from '@/components/sp-page-components'
import { getThemeStyle } from '@/utils'
import { useImmer } from 'use-immer'
import './item.scss'

const pic =
  'https://t15.baidu.com/it/u=3639966192,1216468278&fm=224&app=112&size=h200&n=0&f=JPEG&fmt=auto?sec=1647363600&t=d01518ce2cf9fb0514cf2fa0efae8d4b'

const Item = (props) => {
  const {
    children,
    info: { pic, name, no, price, store, isMedicine, isPrescription }
  } = props

  return (
    <View className='comp-item'>
      <View className='comp-item-good'>
        <View className='comp-item-good-pic'>
          <Image className='img' src={pic} />
        </View>
        <View className='comp-item-good-center'>
          <View className='good-name'>
            {isMedicine == 1 && isPrescription == 1 && (
              <Text className='prescription-drug'>处方药</Text>
            )}
            {name}
          </View>
          <View className='good-no'>货号：{no}</View>
        </View>
        <View className='comp-item-good-right'>
          <View className='sale_price'>
            <View className='sale_price_label'>销售价</View>
            <SpGoodPrice price={price} className='sale_price_number' />
          </View>
          <View className='sale_store'>
            <View className='sale_store_label'>库存</View>
            <View className='sale_store_number'>{store}</View>
          </View>
        </View>
      </View>
      <View className='comp-item-action'>{children}</View>
    </View>
  )
}

export default Item

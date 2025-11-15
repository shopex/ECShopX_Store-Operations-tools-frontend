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
import { View } from '@tarojs/components'
import classNames from '@/utils/classNames'

import './index.scss'

const SpBackToTop = (props) => {
  const { show, onClick, bottom } = props

  return (
    <View
      className={classNames('sp-back-to-top', { 'is-show': show })}
      style={`${bottom ? `bottom: ${Taro.pxTransform(bottom)}` : ''}`}
      onClick={onClick}
    >
      <View className='icon-arrow-up'></View>
    </View>
  )
}

export default React.memo(SpBackToTop)

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
import { View, Text, Image } from '@tarojs/components'
import './index.scss'

const SpLinegradientButton = (props) => {
  const { title, onClick = () => {} } = props

  return (
    <View className='linegradient-button' onClick={onClick}>
      <Image src={require('@/assets/imgs/leftarrow.png')} className='img' />
      <Text className='title'>{title}</Text>
      <Image src={require('@/assets/imgs/rightarrow.png')} className='img' />
    </View>
  )
}

export default React.memo(SpLinegradientButton)

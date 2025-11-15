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

import { View, Picker, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'
import { classNames } from '@/utils'
import './index.scss'

class CommonButton extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      onClick = () => {},
      className,
      size = 'normal',
      height = 80,
      type = 'default',
      text = '',
      plain = false
    } = this.props

    return (
      <View style={{ height: Taro.pxTransform(height) }} onClick={onClick}>
        <Text
          className={classNames('sp-page-common-button', className, {
            [`type-${type}`]: type,
            [`size-${size}`]: size,
            [`plain`]: plain
          })}
        >
          {text}
        </Text>
      </View>
    )
  }
}

export default CommonButton

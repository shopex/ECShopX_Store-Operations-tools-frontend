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
import { View, Input } from '@tarojs/components'
import './index.scss'

export default class SpFormItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      label = '这是一个label',
      value = '',
      onClickValue = () => {},
      onClickTip = () => {},
      placeholder,
      error,
      children,
      wrap,
      className,
      tip,
      labelbold
    } = this.props

    return (
      <View
        className={classNames('sp-component-form-item', className, {
          ['wrap']: wrap,
          ['labelbold']: labelbold
        })}
      >
        <View className='label'>{label}</View>
        {wrap && tip && (
          <View className='tip' onClick={onClickTip}>
            {tip}
          </View>
        )}
        <View
          className={classNames('placeholder', { ['has-value']: value, ['error']: error })}
          onClick={onClickValue}
        >
          {children ? children : value ? value : placeholder}
        </View>
      </View>
    )
  }
}

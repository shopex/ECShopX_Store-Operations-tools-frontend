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
import { View } from '@tarojs/components'
import { classNames } from '@/utils'
import { SpClickAwayListener } from '@/components'
import './index.scss'

export default class FieldSelect extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { visible, onClickAway = () => {}, dataSource = [], onClickField = () => {} } = this.props

    return (
      <SpClickAwayListener onClickAway={onClickAway}>
        <View
          className={classNames('sp-page-field-select', {
            ['show']: visible
          })}
        >
          {dataSource.map(({ value, label }) => (
            <View
              key={value}
              className={classNames('sp-page-field-select_item')}
              onClick={() => onClickField({ value, label })}
            >
              {label}
            </View>
          ))}
        </View>
      </SpClickAwayListener>
    )
  }
}

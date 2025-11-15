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
import { View, Input, Text } from '@tarojs/components'
import { classNames } from '@/utils'
import './index.scss'

export default class SpInputNumber extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  handleInput = (event) => {
    const { onChange = () => {} } = this.props
    const {
      detail: { value }
    } = event
    onChange(value)
  }

  handleFocus = () => {
    this.setState({
      active: true
    })
  }

  handleBlur = () => {
    const { clear, value } = this.props
    const self = this
    if (clear && value) {
      setTimeout(() => {
        self.setState({
          active: false
        })
      }, 200)
    } else {
      self.setState({
        active: false
      })
    }
  }

  clearValue = () => {
    const { onChange = () => {} } = this.props
    onChange(0)
  }

  render() {
    const { placeholder, clear, value, error, disabled } = this.props

    const { active } = this.state

    return (
      <View
        className={classNames('sp-input-number', {
          ['active']: active,
          ['error']: error
        })}
      >
        <Input
          clear
          type='number'
          className='custominput'
          value={value}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          disabled={disabled}
        />
        {placeholder && !value && value != 0 && <View className='placeholder'>{placeholder}</View>}
        {(clear && !!value && active) ||
          (!!value && error && (
            <View className='clear' onClick={this.clearValue}>
              <Text className='iconfont icon-shanchu-01'></Text>
            </View>
          ))}
        {error && <View className='tips'>{error}</View>}
      </View>
    )
  }
}

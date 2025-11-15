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
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import { AtInput } from 'taro-ui'
import { classNames } from '@/utils'
import { useImmer } from 'use-immer'
import './comp-password-input.scss'

const initialValue = {
  //一种是正常的 text 一种是 password
  type: 'password'
}

const CompPasswordInput = (props) => {
  const { onChange = () => {}, disabled, onFocus = () => {}, onBlur = () => {} } = props

  const [state, setState] = useImmer(initialValue)

  const { type } = state

  const handleToggle = () => {
    setState((_state) => {
      _state.type = type === 'text' ? 'password' : 'text'
    })
  }

  return (
    <View className='comp-password-input'>
      <AtInput
        clear
        type={type}
        placeholder='密码需由6-16位数字或字母组成'
        placeholderClass='input-placeholder'
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        disabled={disabled}
      />
      <View className='input-icon' onClick={handleToggle}>
        <Text
          className={classNames('icon iconfont', [
            type === 'text' ? 'icon-xianshi' : 'icon-yincang'
          ])}
        ></Text>
      </View>
    </View>
  )
}

CompPasswordInput.options = {
  addGlobalClass: true
}

export default CompPasswordInput

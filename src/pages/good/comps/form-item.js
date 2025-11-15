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
import { View, Image } from '@tarojs/components'
import { SpTab, SpGoodPrice } from '@/components'
import { SelectInput, Tabbar, PageActionButtons } from '@/components/sp-page-components'
import { getThemeStyle, classNames, isUndefined } from '@/utils'
import { useImmer } from 'use-immer'
import { AtInput, AtSwitch, AtInputNumber } from 'taro-ui'
import './form-item.scss'

const initState = {
  value: ''
}

const FormItem = (props) => {
  const {
    label,
    required = false,
    mode = 'input',
    placeholder,
    onClick = () => {},
    value: valueProp,
    onChange: onChangeProp = () => {},
    className,
    type = 'text',
    editable
  } = props

  const isSelector = mode == 'selector'

  const isInput = mode === 'input'

  const isSwitch = mode === 'switch'

  const [state, setState] = useImmer(initState)

  const { value } = state

  useEffect(() => {
    if (valueProp) {
      setState((_val) => {
        _val.value = valueProp
      })
    }
    if (!valueProp && isSwitch) {
      setState((_val) => {
        _val.value = valueProp
      })
    }
  }, [valueProp])

  return (
    <View className={classNames('form-item', className)}>
      {required && <View className='form-item-required'>*</View>}
      <View className='form-item-label'>{label}</View>
      <View className='form-item-main' onClick={onClick}>
        <AtInput
          editable={isUndefined(editable) ? isInput : editable}
          className='input'
          placeholder={placeholder}
          value={isSwitch ? '' : value}
          onChange={onChangeProp}
          type={type}
        />

        <View
          className={classNames('form-item-main-action', {
            hasArrow: isSelector
          })}
        >
          <View className='iconfont icon-jiantou'></View>
          {isSwitch && <AtSwitch border={false} checked={!!value} onChange={onChangeProp} />}
        </View>
      </View>
    </View>
  )
}

export default FormItem

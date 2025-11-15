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

import { AtFloatLayout } from 'taro-ui'
import React, { useState, useEffect } from 'react'
import { classNames } from '@/utils'
import { View } from '@tarojs/components'
import Textarea from './Textarea'
import './index.scss'

const SpAutoFocusDrawer = (props) => {
  const {
    visible,
    onClose = () => {},
    onCancel = () => {},
    onConfirm = () => {},
    title = '',
    onCancelText = '取消',
    onConfirmText = '确定',
    className,
    placeholder,
    defaultValue
  } = props

  const [textareaValue, setTextareaValue] = useState('')

  const handleChangeTextValue = React.useCallback((e) => {
    let value = e.target.value
    setTextareaValue(value)
  }, [])

  const handleConfirm = React.useCallback(
    (e) => {
      onConfirm(textareaValue)
    },
    [textareaValue]
  )

  useEffect(() => {
    setTextareaValue(defaultValue)
  }, [defaultValue])

  return (
    <AtFloatLayout
      isOpened={visible}
      onClose={onClose}
      className={classNames('sp-component-autofocus-drawer', className)}
    >
      <View className='header'>
        <View className='left' onClick={onCancel}>
          {onCancelText}
        </View>
        <View className='center'>{title}</View>
        <View className='right' onClick={handleConfirm}>
          {onConfirmText}
        </View>
      </View>
      <View className='content'>
        {visible && (
          <Textarea
            value={textareaValue}
            placeholder={placeholder}
            onChange={handleChangeTextValue}
          />
        )}
      </View>
    </AtFloatLayout>
  )
}
export default React.memo(SpAutoFocusDrawer)

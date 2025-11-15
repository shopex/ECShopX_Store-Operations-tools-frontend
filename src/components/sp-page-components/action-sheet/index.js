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

import { View, Text, PickerView, PickerViewColumn } from '@tarojs/components'
import React, { PureComponent } from 'react'
import { AtFloatLayout } from 'taro-ui'
import { classNames } from '@/utils'
import './index.scss'

class SpActionSheet extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      selector: ['美国', '中国', '巴西', '日本']
    }
  }

  handleChangePicker = (e) => {
    console.log('handleChangePicker', e.detail)
  }

  render() {
    const {
      visible,
      onClose = () => {},
      title = '操作弹框',
      onCancelText = '取消',
      onConfirmText = '确定',
      onConfirm = () => {},
      onCancel = () => {},
      children,
      className,
      type = 'normal'
    } = this.props

    return (
      <AtFloatLayout
        isOpened={visible}
        onClose={onClose}
        className={classNames('sp-page-action-sheet', className)}
      >
        <View className='header'>
          <View className='left' onClick={onCancel}>
            {onCancelText}
          </View>
          <View className='center'>{title}</View>
          <View className='right' onClick={onConfirm}>
            {onConfirmText}
          </View>
        </View>
        <View className='content'>{visible && children}</View>
      </AtFloatLayout>
    )
  }
}

export default SpActionSheet

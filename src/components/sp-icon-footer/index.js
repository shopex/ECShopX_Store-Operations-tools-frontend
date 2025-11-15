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
import Taro from '@tarojs/taro'
import './index.scss'

/**
 *
 */
class SpIconFooter extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderIcon = () => {
    let iconClassName = ''
    const { pageType, type } = this.props
    if (type === 'remark') {
      iconClassName = 'icon-bianji1'
    }

    return <View className={classNames('iconfont', iconClassName, 'icon')}></View>
  }

  renderText = () => {
    let text = ''
    const { pageType, type } = this.props
    if (type === 'remark') {
      text = '修改备注'
    }
    return <View className='text'>{text}</View>
  }

  render() {
    const { className, onContentClick = () => {} } = this.props

    return (
      <View className={classNames('sp-component-icon-footer', className)}>
        <View className='sp-component-icon-footer_content' onClick={onContentClick}>
          {this.renderIcon()}
          {this.renderText()}
        </View>
      </View>
    )
  }
}

export default SpIconFooter

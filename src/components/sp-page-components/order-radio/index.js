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
import './index.scss'

class OrderRadio extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      active: 0
    }
  }

  componentDidShow() {
    const { active: activeProp } = this.props
    this.setState({
      active: activeProp
    })
  }

  componentDidUpdate(_, prevState) {
    if (this.props.active !== prevState.active) {
      this.setState({
        active: this.props.active
      })
    }
  }

  handleClick = (activeIndex) => (e) => {
    const { onChange = () => {} } = this.props
    const { active } = this.state
    this.setState({
      active: activeIndex
    })
    if (activeIndex !== active) {
      onChange(activeIndex)
    }
  }

  render() {
    const { leftTitle = '整单', rightTitle = '部分', isShowRight = true } = this.props

    const { active } = this.state

    return (
      <View className={classNames('sp-page-order-radio')}>
        <View
          className={classNames('item', 'leftTitle', {
            ['active']: active === 0
          })}
          onClick={this.handleClick(0)}
        >
          {leftTitle}
        </View>
        {isShowRight && (
          <View
            className={classNames('item', 'rightTitle', {
              ['active']: active === 1
            })}
            onClick={this.handleClick(1)}
          >
            {rightTitle}
          </View>
        )}
      </View>
    )
  }
}

export default OrderRadio

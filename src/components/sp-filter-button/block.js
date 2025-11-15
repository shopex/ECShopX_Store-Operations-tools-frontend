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

import { PureComponent } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { classNames } from '@/utils'

const selected_img = require('../../assets/imgs/selected.png')

export default class Block extends PureComponent {
  constructor(props) {
    super(props)
  }

  computedRow = () => {
    const { text } = this.props

    if (!text || text.length < 5) {
      return 1
    }

    if (text.length >= 5 && text.length <= 9) {
      return 2
    }

    if (text.length >= 10) {
      return 3
    }
  }

  render() {
    const { text, active, onClick = () => {} } = this.props

    return (
      <View
        className={classNames('block', {
          [`col-${this.computedRow()}`]: this.computedRow(),
          [`active`]: active
        })}
        onClick={onClick}
      >
        <Text className='text'>{text}</Text>
        <Image src={selected_img} className='selected_img' />
      </View>
    )
  }
}

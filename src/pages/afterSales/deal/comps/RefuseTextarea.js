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
import { View, Text } from '@tarojs/components'
import { AtTextarea } from 'taro-ui'

export default class RefuseTextarea extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      noteContent: ''
    }
  }

  handleChangeNote = (value) => {
    const { onChange = () => {} } = this.props

    this.setState({
      noteContent: value
    })
    onChange(value)
  }

  render() {
    const { noteContent } = this.state

    return (
      <View className='page-order-deal-comps-refusetextarea'>
        <AtTextarea
          count
          value={noteContent}
          onChange={this.handleChangeNote}
          maxLength={150}
          placeholder='请输入具体的原因...'
        />
      </View>
    )
  }
}

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
import { SpPicker } from '@/components'
import api from '@/api'

export default class LogisticsPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    api.logistics.getCourierCompanyList().then((res) => {
      let _list = res.list
      console.log(this.props.receipt_type)
      if (this.props.receipt_type == 'merchant') {
        _list = [{ value: 'SELF_DELIVERY', name: '商家自配送' }]
      }

      this.setState({
        list: _list
      })
    })
  }

  handlePickerConfirm = (currentIndex) => {
    const { onConfirm = () => {} } = this.props
    onConfirm(this.state.list[currentIndex])
  }

  render() {
    const { visible, onClose = () => {} } = this.props

    const { list } = this.state

    return (
      <SpPicker
        visible={visible}
        title='选择快递公司'
        columns={list.map((item) => item.name)}
        onCancel={onClose}
        onClose={onClose}
        onConfirm={this.handlePickerConfirm}
        startIndex={0}
      />
    )
  }
}

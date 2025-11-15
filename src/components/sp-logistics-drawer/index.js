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
import { SpAutoFocusDrawer } from '@/components'
import S from '@/spx'

const SpLogisticsDrawer = (props) => {
  const {
    visible,
    onClose = () => {},
    title,
    placeholder = '请输入物流单号',
    onConfirm,
    defaultValue
  } = props

  const handleConfirm = (value) => {
    if (!/^[a-zA-Z0-9]*$/.test(value)) {
      S.toast('物流单号填写有误')
      return
    }
    onConfirm?.(value)
  }

  return (
    <SpAutoFocusDrawer
      visible={visible}
      onClose={onClose}
      onCancel={onClose}
      title={title}
      placeholder={placeholder}
      onConfirm={handleConfirm}
      defaultValue={defaultValue}
    />
  )
}

export default React.memo(SpLogisticsDrawer)

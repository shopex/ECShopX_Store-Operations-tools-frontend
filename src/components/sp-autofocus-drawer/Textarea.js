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
import { classNames } from '@/utils'
import React, { useRef, useEffect } from 'react'
import { Textarea as TaroTextarea } from '@tarojs/components'
import './index.scss'

const Textarea = (props) => {
  const { placeholder, value, onChange = () => {} } = props

  const textareaRef = useRef(null)

  useEffect(() => {
    setTimeout(() => {
      // let pos = textareaRef.current.textContent.indexOf(`\n`);
      // textareaRef.current.setSelectionRange(pos+1, pos+1);
      textareaRef.current.focus()
      textareaRef.current.click()
    }, 200)
  }, [])

  return (
    <textarea
      className='h5-textarea'
      autoFocus
      ref={textareaRef}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default Textarea

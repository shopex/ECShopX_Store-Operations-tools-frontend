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

import React, { useEffect, useState, useRef } from 'react'
import { View, Text } from '@tarojs/components'
import classNames from '@/utils/classNames'
import './index.scss'

const ScrollButton = (props) => {
  const {
    children,
    className,
    refuseText = '不同意',
    confirmText = '同意并开始使用',
    onReset = () => {},
    onClickConfirm = () => {},
    onTransitionEnd = () => {},
    isSubmit = false,
    ...restProps
  } = props

  //因为会销毁
  const [activeIndex, setActiveIndex] = useState(isSubmit ? 1 : 0)

  //是否触发点击时间
  const isTouch = useRef(false)

  const handleChange = (index) => (e) => {
    if (index === 0) {
      onReset()
      isTouch.current = true
    } else {
      if (activeIndex === index) {
        onClickConfirm()
      }
      isTouch.current = true
    }
    setActiveIndex(index)
    setTimeout(() => {
      isTouch.current = false
    }, 1000)
  }

  const handleTransitionEnd = () => {
    if (isTouch.current) {
      onTransitionEnd(activeIndex === 1)
    }
  }

  useEffect(() => {
    return () => {
      console.log('useEff')
    }
  }, [])

  return (
    <View className={classNames('sp-page-confirm-scroll-button', className)} {...restProps}>
      <View
        className={classNames('activeTrack', className, {
          [`active-${activeIndex}`]: activeIndex === 0 || activeIndex === 1
        })}
        onTransitionEnd={handleTransitionEnd}
      ></View>
      <View
        className={classNames('refuseText', 'text', {
          'active': activeIndex === 0
        })}
        onClick={handleChange(0)}
      >
        <Text>{refuseText}</Text>
      </View>
      <View
        className={classNames('confirmText', 'text', {
          'active': activeIndex === 1
        })}
        onClick={handleChange(1)}
      >
        <Text>{confirmText}</Text>
      </View>
    </View>
  )
}

export default React.memo(ScrollButton)

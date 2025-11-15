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

import React, { useState } from 'react'
import useStateCallback from './useStateCallback'
import { log } from '@/utils'
import throttle from 'lodash/throttle'

export default function useBackToTop() {
  const [showBackToTop, setShowBackToTop] = useState(false)

  const [scrollTop, setScrollTop] = useStateCallback(null)

  //点击滚回按钮
  const scrollBackToTop = () => {
    // workaround for h5
    setScrollTop(1, () => {
      setScrollTop(null)
    })
  }

  const handleScroll = throttle((e) => {
    const { scrollTop: eventScrollTop, scrollHeight } = e.detail
    const offset = 300

    if (scrollHeight < 600) return
    if (eventScrollTop > offset && !showBackToTop) {
      log.debug(`[BackToTop] showBackToTop, scrollTop: ${eventScrollTop}`)
      setShowBackToTop(true)
    } else if (showBackToTop && eventScrollTop <= offset) {
      log.debug(`[BackToTop] hideBackToTop, scrollTop: ${eventScrollTop}`)
      setShowBackToTop(false)
    }
  }, 70)

  return {
    showBackToTop,
    scrollTop,
    handleScroll,
    scrollBackToTop
  }
}

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

import { useState, useEffect, useRef } from 'react'
//更新完state以后的回调
//与setState({a:2},()=>{})等价
export default function useStateCallback(initial) {
  const [state, setState] = useState(initial)

  const asyncCallback = useRef()

  const setStateWrapper = (nextState, next, prev) => {
    if (typeof prev === 'function') {
      //prevState
      if (prev(state, nextState) === false) {
        return
      }
    }

    asyncCallback.current = typeof next === 'function' ? next : null

    setState(nextState)
  }

  useEffect(() => {
    if (asyncCallback.current) asyncCallback.current(state)
  }, [state])

  return [state, setStateWrapper]
}

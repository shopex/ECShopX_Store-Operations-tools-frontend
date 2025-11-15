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
import useDepChange from './useDepChange'
import { useImmer } from 'use-immer'

const initialState = {
  loading: false,
  hasMore: true,
  pageIndex: 1,
  pageSize: 10
}

export default (props) => {
  const { fetch, auto = true } = props
  const [page, setPage] = useImmer(initialState)
  const totalRef = useRef(0)

  const [hasNext, setHasNext] = useState(true)

  useDepChange(() => {
    if (auto) {
      excluteFetch()
    }
  }, [page.pageIndex])

  const excluteFetch = async () => {
    setPage((v) => {
      v.loading = true
    })
    const { total } = await fetch(page)
    totalRef.current = total
    setPage((v) => {
      if (!total || total <= page.pageSize * page.pageNo) {
        v.hasMore = false
      }
      v.loading = false
    })
  }

  const nextPage = () => {
    const curPage = page.pageIndex + 1
    if (!totalRef.current || curPage > Math.ceil(+totalRef.current / page.pageSize)) {
      setPage((v) => {
        v.hasMore = false
      })
      return
    } else {
      setPage((v) => {
        v.pageIndex = curPage
      })
    }
  }

  const nextPageForce = async () => {
    const curPage = page.pageIndex + 1
    if (!totalRef.current || curPage > Math.ceil(+totalRef.current / page.pageSize)) {
      await setPage((v) => {
        v.hasMore = false
      })
      return
    } else {
      await setPage((v) => {
        v.pageIndex = curPage
      })
    }
  }

  const getTotal = () => {
    return totalRef.current
  }

  /**
   * @function 分页重置
   */
  const resetPage = async () => {
    totalRef.current = 0
    await setPage((v) => {
      v.pageIndex = 1
      v.hasMore = true
    })
    if (!auto || page.pageIndex == 1) {
      excluteFetch()
    }
  }

  return {
    page,
    getTotal,
    nextPage,
    resetPage,
    nextPageForce
  }
}

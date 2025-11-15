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

// fetch 方法需要返回条数总量: { total }，用来计算页数
// page 存放page相关的状态
// import { Tracker } from "@/service";
import React from 'react'
import useStateCallback from './useStateCallback'

export default function usePaper(props) {
  const { pageSize = 10, pageNo = 0, pageTotal = 0, fetch } = props

  const [page, setPage] = useStateCallback({
    total: pageTotal,
    page_no: pageNo,
    page_size: pageSize,
    isLoading: false,
    hasNext: true
  })

  const nextPage = async () => {
    if (!page.hasNext || page.loading) return

    //上拉触底
    if (page.page_no > 0) {
    }

    page.isLoading = true

    setPage(page)

    const { page_no, page_size } = page
    const curPage = page_no + 1

    const { total: fetchTotal } = await fetch({
      page_no: curPage,
      page_size
    })

    if (!fetchTotal || curPage >= Math.ceil(+fetchTotal / page_size)) {
      page.hasNext = false
    }

    setPage({
      ...page,
      total: fetchTotal,
      page_no: curPage,
      isLoading: false
    })
  }

  const resetPage = (cb = () => {}) => {
    const resetPageParams = {
      ...(page || {}),
      page_no: 0,
      total: 0,
      isLoading: false,
      hasNext: true
    }
    setPage(resetPageParams, cb)
  }

  return {
    nextPage,
    resetPage
  }
}

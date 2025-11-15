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

import req from './req'

//订单列表
export function list(params) {
  return req.get('/aftersales', params)
}

//售后详情
export function detail(params) {
  return req.get(`/aftersales/${params.no}`)
}

//售后审核
export function review(params) {
  return req.post(`/aftersales/review`, params)
}

//确认收货
export function confirm(params) {
  return req.post(`/aftersales/refundCheck`, params)
}

//售后地址
export function address(params) {
  return req.get(`/distributors/aftersalesaddress`, params)
}

//售后列表添加备注功能
export function remark(params) {
  return req.put(`/aftersales/remark`, params)
}

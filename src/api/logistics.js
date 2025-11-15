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

//获取物流信息
export function getLogistics(params) {
  console.log(params)
  return req.get('/delivery/process/list', params)
}

// 获取快递公司
export function getCourierCompanyList() {
  return req.get('/trade/logistics/list')
}

// 修改物流信息
export function updateLogistics(orders_delivery_id, data) {
  return req.put(`/delivery/${orders_delivery_id}`, data)
}

//获取物流详情
export function getDeliveryList(params) {
  return req.get(`/delivery/lists`, params)
}

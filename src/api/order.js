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
  return req.get('/orders', params)
}

//订单备注
export function remarks({ orderId, ...params }) {
  return req.put(`/remarks/${orderId}`, params)
}

//售后订单备注
export function afterremarks(params) {
  return req.put(`/remark`, params)
}

//扫一扫
export function code(params) {
  return req.post(`/ziticode`, params)
}

//订单取消
export function cancel(params) {
  return req.post(`/order/${params.order_id}/cancel`, params)
}

//订单接单
export function businessreceipt({ orderId }) {
  return req.post(`/businessreceipt/${orderId}`)
}

//订单详情
export function detail({ orderId }) {
  return req.get(`/order/${orderId}`)
}

//订单会员信息
export function member({ userId }) {
  return req.get(`/member`, { user_id: userId })
}

//订单发货
export function delivery(params) {
  return req.post(`/delivery`, params)
}

//订单核销
export function writeoff({ orderId, ...params }) {
  return req.post(`/writeoff/${orderId}`, params)
}

//订单核销
export function qrwriteoff(params) {
  return req.post(`/qr_writeoff`, params)
}
//获取取消订单信息
export function getcancelinfo(params) {
  return req.get(`/order/${params.order_id}/cancelinfo`, params)
}

//确认订单取消审核
export function confirmcancel(params) {
  return req.post(`/order/${params.order_id}/confirmcancel`, params)
}

// 配送员列表
export function getDeliveryList(params) {
  return req.get(`/account/management`, {
    pageSize: 999,
    page: 1,
    finderId: 100,
    operator_type: 'self_delivery_staff',
    is_disable: 0,
    staff_type: 'distributor',
    ...params
  })
}

//确认配送员
export function confirmDelivery(params) {
  return req.post(`/order/deliverystaff/confirm`, params)
}

//取消配送
export function canceldeliverystaff(params) {
  return req.post(`/order/cancel/deliverystaff `, params)
}

//确认打包
export function confirmpackag(params) {
  return req.post(`/order/deliverypackag/confirm `, params)
}

// 支付
export function orderPayment(params) {
  return req.post('/order/payment', params)
}

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

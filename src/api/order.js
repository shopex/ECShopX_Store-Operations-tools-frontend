import req from './req'

//订单列表
export function list(params) {
  return req.get('/orders', params)
}

//订单备注
export function remarks({ orderId, ...params }) {
  return req.put(`/remarks/${orderId}`, params)
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

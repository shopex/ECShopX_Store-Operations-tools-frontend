import req from './req'

//订单列表
export function list(params) {
  return req.get('/api/orders', params)
}

//订单备注
export function remarks({ orderId, ...params }) {
  return req.put(`/api/remarks/${orderId}`, params)
}

//订单取消
export function cancel(params) {
  return req.post(`/api/order/cancel`, params)
}

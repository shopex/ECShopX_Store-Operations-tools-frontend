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
  return req.post(`/order/cancel`, params)
}

//订单接单
export function businessreceipt({ orderId }) {
  return req.post(`/businessreceipt/${orderId}`)
}

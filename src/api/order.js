import req from './req'

export function getOrders(params) {
  return req.get('/api/orders', params)
}

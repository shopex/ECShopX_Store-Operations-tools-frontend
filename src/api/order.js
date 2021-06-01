import req from './req'

export function list(params) {
  return req.get('/api/orders', params)
}

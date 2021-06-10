import req from './req'

//订单列表
export function list(params) {
  return req.get('/aftersales', params)
}

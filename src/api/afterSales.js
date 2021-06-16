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

//售后地址
export function address(params) {
  return req.post(`/distributors/aftersalesaddress`, params)
}

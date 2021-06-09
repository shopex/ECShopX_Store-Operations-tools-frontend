import req from './req'

//获取物流信息
export function getLogistics(params) {
  console.log(params)
  return req.get('/delivery/process/list', params)
}

//物流列表
export function list() {
  return req.get('/trade/logistics/list')
}

import req from './req'

//获取物流信息
export function getLogistics(params) {
  console.log(params)
  return req.get('/delivery/process/list', params)
}

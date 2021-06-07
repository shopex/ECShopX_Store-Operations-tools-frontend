import req from './req'

//获取店铺列表
export function getMyinfo(params) {
  return req.get('/operator/getinfo', params)
}

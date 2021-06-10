import req from './req'

//获取我的信息
export function getMyinfo(params) {
  return req.get('/operator/getinfo', params)
}

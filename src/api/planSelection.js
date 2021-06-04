import req from './req'

//获取店铺列表
export function getShopList(params) {
  console.log(params)
  return req.get('/distributors', params)
}

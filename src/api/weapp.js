import req from './req'

//查询是否绑定
export function is_bind(query) {
  return req.post('/operator/wechat/lite/login', query)
}

//查询主类目
export function category(query) {
  return req.get('/goods/category', query)
}

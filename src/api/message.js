import req from './req'

// 获取消息
export function getMessageList(params) {
  // console.log(123);
  return req.get('/order/message/new', params)
}

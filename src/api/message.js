import req from './req'

// 获取消息
export function getMessageList() {
  // console.log(123);
  return req.get(`/order/1/message/info`)
}

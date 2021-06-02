// export const ORDER_STATUS = {
//   '全部': 'all',
//   '待发货': 'notship',
//   '待退款': 'cancelapply',
//   '待收货': 'shipping',
//   '待自提': 'ziti',
//   '未支付': 'notpay',
//   '已取消': 'cancel',
//   '已完成': 'done'
// }

//订单主状态
export const ORDER_STATUS = {
  'ALL': '全部',
  'CANCEL': '已取消',
  'NOTPAY': '待付款',
  'PAYED': '待发货',
  'WAIT_BUYER_CONFIRM': '已发货',
  'DONE': '已完成'
}
//订单筛选时间
export const ORDER_FILTER_TIME = {
  '全部': 'all',
  '今天': 'today',
  '昨天': 'yesterday',
  '近七天': 'recently7',
  '近30天': 'recently30'
}

//订单筛选类型
export const ORDER_TYPE = {
  '全部订单': 'all',
  '团购订单': 'groups',
  '秒杀订单': 'seckill',
  '导购订单': 'shopguide',
  '跨境订单': 'crossborder',
  '助力订单': 'bargain',
  '社区订单': 'community',
  '普通订单': 'normal'
}

//订单筛选类型
export const ORDER_RECEIPT_TYPE = {
  '普通快递': 'logistics',
  '同城配': 'dada',
  '自提': 'ziti'
}

export const ORDER_LIST_FILTER_ITEM = {
  '下单时间': 'order_time',
  '订单类型': 'order_class',
  '配送类型': 'receipt_type'
}

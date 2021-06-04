//订单列表主状态
export const ORDER_LIST_STATUS = {
  'all': '全部',
  'cancel': '已取消',
  'notpay': '待支付',
  'notship': '待发货',
  'shipping': '已发货',
  'finish': '已完成'
}
//订单列表搜索字段
export const ORDER_LIST_FIELDS = {
  'order_id': '订单号',
  'order_name': '商品名称',
  'mobile': '手机号码',
  'receive_name': '收货人姓名'
}
//订单筛选时间
export const ORDER_LIST_FILTER_TIME = {
  'all': '全部',
  'today': '今天',
  'yestoday': '昨天',
  'recently7': '近七天',
  'recently30': '近30天'
}

//订单筛选类型
export const ORDER_LIST_FILTER_TYPE = {
  'all': '全部订单',
  'groups': '团购订单',
  'seckill': '秒杀订单',
  'shopguide': '导购订单',
  'crossborder': '跨境订单',
  'bargain': '助力订单',
  'community': '社区订单',
  'normal': '普通订单'
}

//订单筛选类型
export const ORDER_LIST_RECEIPT_TYPE = {
  'logistics': '普通快递',
  'dada': '同城配',
  'ziti': '自提'
}

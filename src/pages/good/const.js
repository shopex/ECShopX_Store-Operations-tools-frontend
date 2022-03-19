//主类目
export const MAIN_CATEGORY = 'main_category'

//标题
export const TITLE = 'title'

//副标题
export const SUB_TITLE = 'sub_title'

//分类
export const CATEGORY = 'category'

//品牌
export const BRAND = 'brand'

//运费模版
export const TEMPLATE = 'template'

//多规格
export const SPECS = 'specs'

export const ITEM_SPECS = 'item_specs'

//商品图片
export const PIC = 'pic'

export const DETAIL = 'detail'

//商品状态
export const STATUS = 'status'

//商品库存
export const STORE = 'store'
//商品销售价
export const SALE_PRICE = 'sale_price'

export const ITEM_BN = 'item_bn'

export const SHOW_SEPC = 'show_spec'

export const CAT_MAP = {
  category_name: 'label',
  id: 'id'
}

export const BRAND_MAP = {
  attribute_id: 'id',
  attribute_name: 'label'
}

export const TEMPLATE_MAP = {
  template_id: 'id',
  name: 'label'
}

export const STATUS_LIST = [
  { value: 'onsale', label: '前台可销售' },
  { value: 'offline_sale', label: '可线下销售' },
  { value: 'only_show', label: '前台仅展示' },
  { value: 'instock', label: '不可销售' }
]

export const REQUIRE_VALUE = {
  approve_status: '',
  store: '',
  item_bn: '',
  price: '',
  cost_price: '',
  market_price: '',
  barcode: '',
  point_num: 0,
  weight: '',
  volume: ''
}

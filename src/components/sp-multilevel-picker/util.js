// +----------------------------------------------------------------------
// | ECShopX open source E-commerce
// | ECShopX 开源商城系统
// +----------------------------------------------------------------------
// | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
// +----------------------------------------------------------------------
// | Corporate Website:  https://www.shopex.cn
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// | http://www.apache.org/licenses/LICENSE-2.0
// +----------------------------------------------------------------------
// | The removal of shopeX copyright information without authorization is prohibited.
// | 未经授权不可去除shopeX商派相关版权
// +----------------------------------------------------------------------
// | Author: shopeX Team <mkt@shopex.cn>
// | Contact: 400-821-3106
// +----------------------------------------------------------------------

//平铺数组
function flattenArray(arr) {
  let result = []
  function transform(arr) {
    arr.forEach((item) => {
      result.push(item)
      if (item.children) {
        transform(item.children)
      }
    })
  }
  transform(arr)
  return result
}

function findById(arr, id) {
  const flattened = flattenArray(arr)
  if (!id) {
    return arr
  }
  return flattened.find((item) => item.id === id)?.children
}

export { flattenArray, findById }

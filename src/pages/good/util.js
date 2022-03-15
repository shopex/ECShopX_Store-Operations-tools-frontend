import { navigateTo } from '@tarojs/taro'

export const navigateToGoodForm = () => {
  navigateTo({
    url: `/pages/good/form`
  })
}

export function transformData(data, obj) {
  let list = []
  data.forEach((item) => {
    let currentItem = {}
    for (let key in obj) {
      currentItem[obj[key]] = item[key]
    }
    if (item.children) {
      currentItem.children = transformData(item.children, obj)
    }
    list.push(currentItem)
  })
  return list
}

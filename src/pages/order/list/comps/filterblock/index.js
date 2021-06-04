import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { SpFilterDrawer } from '@/components'
import { ORDER_FILTER_TIME, ORDER_TYPE, ORDER_RECEIPT_TYPE, ORDER_LIST_FILTER_ITEM } from '@/consts'
import './index.scss'

const filterData = Object.keys(ORDER_LIST_FILTER_ITEM).map((filterItem) => {
  let itemLabel = filterItem
  let itemValue = ORDER_LIST_FILTER_ITEM[filterItem]
  let dataSource = []
  if (itemValue === 'order_time') {
    dataSource = Object.keys(ORDER_FILTER_TIME).map((item) => ({
      label: item,
      value: ORDER_FILTER_TIME[item]
    }))
  } else if (itemValue === 'order_class') {
    dataSource = Object.keys(ORDER_TYPE).map((item) => ({ label: item, value: ORDER_TYPE[item] }))
  } else {
    dataSource = Object.keys(ORDER_RECEIPT_TYPE).map((item) => ({
      label: item,
      value: ORDER_RECEIPT_TYPE[item]
    }))
  }
  return {
    itemLabel,
    itemValue,
    dataSource
  }
})

export default class FilterBlock extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      showFilter: false
    }
  }

  handleShowDrawer = () => {
    this.setState({
      showFilter: true
    })
  }

  handleCloseDrawer = () => {
    this.setState({
      showFilter: false
    })
  }

  render() {
    const { showFilter } = this.state

    return (
      <View className='filterContent'>
        <View className='comp-order-list-filterBlock'>
          <View className='title'>
            <View className='icon1'>
              <Text className='iconfont icon-shaixuan1'></Text>
            </View>
            <Text className='text'>订单时间由近及远</Text>
          </View>
          <View className='filterTip' onClick={this.handleShowDrawer}>
            <View className='iconfont icon-shaixuan2'></View>
            <View className='text'>筛选</View>
          </View>
        </View>

        <SpFilterDrawer
          filterTitle='订单筛选'
          filterData={filterData}
          visible={showFilter}
          onCloseDrawer={this.handleCloseDrawer}
        />
      </View>
    )
  }
}

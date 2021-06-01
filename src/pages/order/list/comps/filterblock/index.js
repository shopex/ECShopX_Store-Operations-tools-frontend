import React, { PureComponent } from 'react'
import { View, Text } from '@tarojs/components'
import { SpScollButton } from '@/components'
import Block from './block'
import { AtDrawer } from 'taro-ui'
import './index.scss'

const filterItem = {
  '下单时间': ['全部', '今天', '昨天', '近7天', '近30天'],
  '订单类型': [
    '全部订单',
    '团购订单',
    '秒杀订单',
    '社区订单',
    '导购订单',
    '跨境订单',
    '助力订单',
    '5个字的名称',
    '我是超过十个字的名称'
  ],
  '配送类型': ['普通快递', '同城配', '自提']
}

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
        <AtDrawer
          show={showFilter}
          mask
          onClose={this.handleCloseDrawer}
          right
          width='85%'
          className='filterDrawer'
        >
          <View className='content'>
            <View className='filterTitle'>
              <Text className='text'>订单筛选</Text>
            </View>
            <View className='main'>
              {Object.keys(filterItem).map((item) => {
                return (
                  <View className='filterItem' key={item}>
                    <View className='title'>{item}</View>
                    <View className='blocks'>
                      {filterItem[item].map((name) => {
                        return <Block active text={name} key={name} />
                      })}
                    </View>
                  </View>
                )
              })}
            </View>
            <View className='footer'>
              <SpScollButton refuseText='重置' confirmText='确定并筛选' />
            </View>
          </View>
        </AtDrawer>
      </View>
    )
  }
}

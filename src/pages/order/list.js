import React, { PureComponent } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { getThemeStyle } from '@/utils'
import SearchInput from './comps/search-input'
import Tabbar from './comps/tabbar'
import FilterBlock from './comps/filterblock'
import OrderItem from './comps/order-item'
import './list.scss'

const orderList = [
  {
    no: 'DD20210413214985479',
    time: '2021.04.12 16:14:19',
    status: '已取消',
    goodList: [
      {
        image:
          'http://mmbiz.qpic.cn/mmbiz_png/Hw4SsicubkrdnwoLMY38PLNULch2rPgsGb4NCVCC4EGa8EFs2MPCSbzJolznV64F0L5VetQvyE2ZrCcIb1ZALEA/0?wx_fmt=png?imageView2/2/w/300',
        name: '我商品名最多只显示一行…',
        spec: '规格：12件套',
        no: '货号：765323456789',
        price: '¥ 9999.99',
        extraPrice: '¥ 9999.99',
        num: 1
      }
    ],
    type: '商家快递配送',
    fee_total: '19.50'
  }
]

export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      orderStatus: 0
    }
  }

  render() {
    const { orderStatus } = this.state

    return (
      <View className='page-order-list' style={getThemeStyle()}>
        <View className='page-order-list-input'>
          <SearchInput />
        </View>
        <Tabbar activeStatus={orderStatus} />
        <FilterBlock />
        <ScrollView scrollY className='page-order-list-orderList'>
          {orderList.map((orderItem) => {
            return <OrderItem key={orderItem.no} info={orderItem} />
          })}
        </ScrollView>
      </View>
    )
  }
}

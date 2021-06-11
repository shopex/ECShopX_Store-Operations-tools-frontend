import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'
import api from '@/api'
import { View, Text, ScrollView } from '@tarojs/components'
import { SpMessageDetail } from '@/components'
import { timestampToTime } from '@/utils'
import './index.scss'

// const titleList = ['处理进度','商品名称','售后编号']
const titleList = ['商品详情', '实付金额', '订单编号']

export default class MessageDetail extends PureComponent {
  constructor() {
    super()
    this.state = {
      detailList: []
    }
    Taro.setNavigationBarTitle({ title: '等会撒很大声1212' })
  }
  componentDidMount() {
    this.getConfig()
  }
  async getConfig() {
    const obj = {
      page: 1,
      pageSize: 10,
      msg_type: 2, //  1: 售后, 2: 待发货, 3: 未妥投
      distributor_id: 102,
      id: 0
    }
    const result = await api.message.getMessageDetail(obj)
    this.setState({
      detailList: result.list
    })
    console.log(result.list)
  }

  render() {
    return (
      <View className='page-messageDetail'>
        {this.state.detailList &&
          this.state.detailList.map((item) => {
            return (
              <SpMessageDetail
                date={timestampToTime(item.add_time)}
                key={item.productCoding}
                SpMessageDetailData={JSON.parse(item.content)}
                msgType={item.msg_type}
                titleList={titleList}
              />
            )
          })}
      </View>
    )
  }
}

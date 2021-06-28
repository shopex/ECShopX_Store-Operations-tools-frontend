import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { PureComponent } from 'react'
import api from '@/api'
import { View, Text, ScrollView } from '@tarojs/components'
import { SpMessageDetail, SpLoading, SpTips } from '@/components'
import { timestampToTime } from '@/utils'
import './index.scss'
import { connect } from 'react-redux'
import { withPager, withBackToTop } from '@/hocs'

@connect(({ planSelection }) => ({
  planSelection: planSelection.activeShop
}))
@withPager
export default class MessageDetail extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      detailList: [],
      titleList: [],
      page: 1,
      loading: false
    }
  }
  componentDidMount() {
    // this.getConfig(this.state.page)
    this.nextPage()
  }
  componentDidShow() {
    this.routerConfig()
  }
  routerConfig() {
    const { type } = getCurrentInstance().router.params
    console.log(type)
    if (type == '1') {
      this.setState({
        titleList: ['处理进度', '商品名称', '售后单号']
      })
    } else {
      this.setState({
        titleList: ['商品详情', '实付金额', '订单编号']
      })
    }
  }
  async getConfig(params) {
    const { type } = getCurrentInstance().router.params
    let { distributor_id } = this.props.planSelection

    const obj = {
      msg_type: type, //  1: 售后, 2: 待发货, 3: 未妥投
      distributor_id,
      id: 0
    }
    const { list, total_count } = await api.message.getMessageDetail({
      ...obj,
      page: params.page_no,
      pageSize: params.page_size
    })

    this.setState({
      detailList: [...this.state.detailList, ...list]
    })
    return {
      total_count
    }
  }

  fetch = async (params) => {
    this.setState({
      loading: true
    })
    const { total_count } = await this.getConfig(params)
    this.setState({
      loading: false
    })
    return {
      total: total_count
    }
  }

  OrderHandle(order_id, msg_type, afterSalesBn) {
    if (msg_type == 1) {
      Taro.navigateTo({
        url: `/pages/afterSales/detail?aftersalesNo=${afterSalesBn}`
      })
    } else {
      Taro.navigateTo({
        url: `/pages/order/detail?order_id=${order_id}`
      })
    }
  }

  render() {
    const { loading, page } = this.state
    console.log(this.state)
    return (
      <ScrollView
        className='page-messageDetail'
        scrollY
        scrollWithAnimation
        onScrollToLower={this.nextPage}
      >
        {this.state.detailList &&
          this.state.detailList.map((item) => {
            return (
              <SpMessageDetail
                date={timestampToTime(item.add_time)}
                key={item.id}
                SpMessageDetailData={item}
                msgType={item.msg_type}
                titleList={this.state.titleList}
                OrderHandle={this.OrderHandle}
              />
            )
          })}
        {loading && <SpLoading>正在加载...</SpLoading>}
        {!page.hasNext && <SpTips msg={'没有更多了哦~'}></SpTips>}
      </ScrollView>
    )
  }
}

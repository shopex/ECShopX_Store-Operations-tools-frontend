import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getThemeStyle , calcTimer } from '@/utils'
import {
  DetailCard,
  MessageCard,
  FixedAction,
  PageActionButtons
} from '@/components/sp-page-components'
import { View, Text } from '@tarojs/components'
import { AtCountdown } from 'taro-ui'

import api from '@/api'
import './index.scss'

class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //订单详情
      orderInfo: {},
      pageType: 'orderDetail',
      timer: {
        hh: 10,
        mm: 10,
        ss: 10
      }
    }
  }

  async componentDidShow() {
    const {
      router: {
        params: { order_id }
      }
    } = getCurrentInstance()
    const { orderInfo } = await api.order.detail({ orderId: order_id })
    this.setState({
      orderInfo
    })
  }

  //渲染主状态
  renderMainStatus = () => {
    const { orderInfo } = this.state
    let main_status = orderInfo?.app_info?.detail_status?.main_msg
    return main_status
  }

  //渲染描述
  renderDesc = () => {
    const { orderInfo, timer } = this.state
    let type = orderInfo?.app_info?.detail_status?.type
    let description = orderInfo?.app_info?.detail_status?.description
    //如果类型是文本直接返回文案
    if (type === 'text') {
      return description
    } else if (type === 'cancel') {
      return <View>商家取消订单，查看退款状态</View>
    } else if (type === 'notpay') {
      return (
        <View className='notpay_desc'>
          <View>买家尚未支付，剩余</View>
          <AtCountdown
            className='countdown__time'
            format={{ day: '天', hours: ':', minutes: ':', seconds: '' }}
            hours={timer.hh}
            minutes={timer.mm}
            seconds={timer.ss}
          />
        </View>
      )
    } else if (type === 'dada_cancel') {
      return (
        <View className='dada_cancel_desc'>
          <View>骑士取消订单，请</View>
          <View>重新呼叫</View>
        </View>
      )
    }
  }

  //渲染图标
  renderIcon = () => {}

  //渲染物流标题
  renderLogiticsTitle = () => {
    const {
      orderInfo: { receipt_type }
    } = this.state
    if (receipt_type === 'dada') {
      return '同城配信息'
    } else if (receipt_type === 'ziti') {
      return '自提信息'
    } else {
      return '物流信息'
    }
  }

  //渲染物流描述
  renderLogiticsDesc = () => {
    const { orderInfo } = this.state

    let deliveryLogs = orderInfo?.app_info?.delivery_log || []

    let deliveryLog = deliveryLogs[deliveryLogs.length - 1] || {}

    return `${deliveryLog.msg}`
  }

  //判断是收件人还是取件人
  renderCardLeftTitle = () => {
    const {
      orderInfo: { receipt_type }
    } = this.state
    if (receipt_type === 'ziti') {
      return '取件人信息'
    } else {
      return '收货人信息'
    }
  }

  render() {
    const { orderInfo, pageType } = this.state

    return (
      <View className='page-order-detail' style={getThemeStyle()}>
        <DetailCard
          pageType='orderDetail'
          status={this.renderMainStatus()}
          subStatus={this.renderDesc()}
          iconfontName={this.renderIcon()}
        />

        <View className='card-center'>
          <View>
            <View className='title'>{this.renderLogiticsTitle()}</View>
            <View className='desc'>{this.renderLogiticsDesc()}</View>
          </View>
          <View className='right'>
            <Text className='iconfont icon-chakan'></Text>
            <Text>查看详情</Text>
          </View>
        </View>

        <MessageCard leftTitle={this.renderCardLeftTitle()} />

        <View className='card-bottom'>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
        </View>

        <FixedAction>
          <PageActionButtons
            buttons={orderInfo.app_info?.buttons}
            pageType={pageType}
            orderInfo={orderInfo}
          />
        </FixedAction>
      </View>
    )
  }
}

export default OrderDetail

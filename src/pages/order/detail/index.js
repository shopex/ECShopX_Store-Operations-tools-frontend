import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getThemeStyle, requestCallback } from '@/utils'
import { CommonButton, DetailCard, MessageCard, FixedAction } from '@/components/sp-page-components'
import { View, Text } from '@tarojs/components'
import api from '@/api'
import './index.scss'

class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //订单详情
      orderInfo: {}
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

  renderButton = () => {
    const { orderInfo } = this.state

    const buttons = orderInfo.app_info?.buttons || []

    return (
      <View className='render-bottom'>
        {buttons.map((button, index) => {
          const buttonType = button.type
          const buttonName = button.name
          return (
            <CommonButton
              className='margin-left-20 commonbutton'
              key={buttonName}
              plain
              text={buttonName}
              // onClick={this.handleFooterButtonClick.bind(this, buttonType)}
              size='small'
              height={80}
              type={
                buttonName === '取消订单' ? 'danger' : index === buttons.length - 1 && 'primary'
              }
            />
          )
        })}
      </View>
    )
  }

  render() {
    const { orderInfo } = this.state

    return (
      <View className='page-order-detail' style={getThemeStyle()}>
        <DetailCard pageType='orderDetail' status='订单已完成' subStatus='收货人已签收' />
        <View className='card-center'>
          <View>
            <View className='title'>物流信息/自提信息</View>
            <View className='desc'>确认收货时间：2021.05.27 12</View>
          </View>
          <View className='right'>
            <Text className='iconfont icon-chakan'></Text>
            <Text>查看详情</Text>
          </View>
        </View>

        <MessageCard />

        <View className='card-bottom'>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
          <View className='item'>下单时间：2021.05.28 12:0</View>
        </View>

        <FixedAction>{this.renderButton()}</FixedAction>
      </View>
    )
  }
}

export default OrderDetail

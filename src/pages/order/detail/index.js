import React, { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { getThemeStyle, timestampToTime, calcTimer } from '@/utils'
import { SpGoodItem, SpGoodPrice, SpToast, SpLoading, SpRemarkItem } from '@/components'
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
import log from '../../../muiApp/utils'

class OrderDetail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      //订单详情
      orderInfo: {},
      pageType: 'orderDetail',
      timer: {
        mm: 0,
        ss: 0
      },
      tradeInfo: {},
      userInfo: {},
      leftContent: [],
      rightContent: [],
      logisticsList: [],
      leftPhone: '',
      rightPhone: '',
      loading: false
    }
  }

  async componentDidShow() {
    await this.getDetail(true)
    this.calcTimer()
    await this.renderLeftContent()
    await this.renderRightContent()
    this.setState({
      loading: false
    })
    this.getLogistics()
  }

  getDetail = async (init) => {
    const {
      router: {
        params: { order_id }
      }
    } = getCurrentInstance()
    this.setState({
      loading: true
    })
    const { orderInfo, tradeInfo } = await api.order.detail({ orderId: order_id })
    this.setState({
      orderInfo,
      tradeInfo
    })
    if (!init) {
      this.setState({
        loading: false
      })
    }
  }

  //得出发货时间
  getLogistics = async () => {
    const { orderInfo } = this.state
    const list = await api.logistics.getDeliveryList({ order_id: orderInfo.order_id })
    this.setState({
      logisticsList: list
    })
  }

  //计算倒计时
  calcTimer = async () => {
    const {
      orderInfo: { auto_cancel_seconds }
    } = this.state
    this.setState({
      timer: calcTimer(auto_cancel_seconds)
    })
  }

  //渲染左内容
  renderLeftContent = () => {
    const {
      orderInfo: {
        receipt_type,
        receiver_name,
        receiver_mobile,
        receiver_state,
        receiver_city,
        receiver_district,
        receiver_address,
        mobile
      }
    } = this.state
    let leftContent
    if (receipt_type === 'ziti') {
      leftContent = [
        {
          label: '提货人',
          value: receiver_name
        },
        {
          label: '手机号',
          value: mobile
        }
      ]
    } else {
      leftContent = [
        {
          label: '收货人',
          value: `${receiver_name} ${receiver_mobile}`
        },
        {
          label: '收货地址',
          value: `${receiver_state} ${receiver_city} ${receiver_district} ${receiver_address}`
        }
      ]
    }
    this.setState({
      leftContent,
      leftPhone: receiver_mobile
    })
  }

  //渲染右内容
  renderRightContent = async () => {
    const {
      orderInfo: { user_id }
    } = this.state
    let rightContent
    const userInfo = await api.order.member({ userId: user_id })
    rightContent = [
      {
        label: '买家信息',
        value: `${userInfo.username || ''} ${userInfo.mobile || ''}`
      }
    ]
    this.setState({
      userInfo,
      rightContent,
      rightPhone: userInfo.mobile
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
    } else if (type === 'not_pay') {
      return (
        <View className='notpay_desc'>
          <View>买家尚未支付，剩余</View>
          <AtCountdown
            className='countdown__time'
            format={{ hours: '小时', minutes: '分钟', seconds: '秒' }}
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

  //渲染物流标题
  renderLogiticsTitle = (desc, title) => {
    const {
      orderInfo: { receipt_type }
    } = this.state
    console.log(this.state)
    if (receipt_type === 'dada') {
      if (desc) {
        return '同城配送'
      }
      if (title) {
        return '同城配订单'
      }
      return '同城配信息'
    } else if (receipt_type === 'ziti') {
      if (desc) {
        return '自提'
      }
      if (title) {
        return '自提订单'
      }
      return '自提信息'
    } else {
      if (desc) {
        return '普通快递'
      }
      if (title) {
        return '普通订单'
      }
      return '物流信息'
    }
  }

  //渲染物流描述
  renderLogiticsDesc = () => {
    const { orderInfo } = this.state

    let deliveryLogs = orderInfo?.app_info?.delivery_log || []

    let deliveryLog = deliveryLogs[deliveryLogs.length - 1] || {}

    return `${deliveryLog.msg} ${timestampToTime(deliveryLog.time)}`
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

  //渲染价格
  renderTotalFee = () => {
    const {
      orderInfo: { point, item_fee }
    } = this.state
    //金额订单
    if (point == 0) {
      return <SpGoodPrice size={24} price={item_fee} isSame />
      //积分订单
    } else if (item_fee == 0) {
      return <SpGoodPrice size={24} point={point} isSame />
    } else {
      return <SpGoodPrice size={24} price={item_fee} point={point} isSame />
    }
  }

  //渲染优惠金额
  renderDiscountFee = () => {
    const {
      orderInfo: { discount_fee }
    } = this.state
    return <SpGoodPrice size={24} prefix='-' price={discount_fee} isSame />
  }

  //渲染运费
  renderFreightFee = () => {
    const {
      orderInfo: { freight_fee }
    } = this.state
    return <SpGoodPrice size={24} prefix='+' price={freight_fee} isSame />
  }

  //渲染实价
  renderRealFee = () => {
    const {
      tradeInfo: { totalFee }
    } = this.state
    return <SpGoodPrice size={24} price={totalFee} isSame color='red' />
  }

  //查看物流详情
  viewDeliveryDetail = () => {
    const {
      orderInfo: { order_id }
    } = this.state
    Taro.navigateTo({ url: `/pages/logisticsInfo/index?order_id=${order_id}` })
  }

  //刷新
  handleRefresh = () => {
    this.getDetail()
  }

  render() {
    const {
      orderInfo,
      tradeInfo,
      pageType,
      leftContent,
      rightContent,
      leftPhone,
      rightPhone,
      logisticsList,
      loading
    } = this.state

    let terminal_info = orderInfo?.app_info?.terminal_info
    return loading ? (
      <SpLoading>正在加载...</SpLoading>
    ) : (
      <View className='page-order-detail' style={getThemeStyle()}>
        <View className='wrapper'>
          <DetailCard
            pageType='orderDetail'
            status={this.renderMainStatus()}
            subStatus={this.renderDesc()}
            iconClassName={orderInfo?.app_info?.detail_status?.icon}
          />

          <View className='card-center'>
            <View>
              <View className='title'>{this.renderLogiticsTitle()}</View>
              <View className='desc'>{this.renderLogiticsDesc()}</View>
            </View>
            <View className='right' onClick={this.viewDeliveryDetail}>
              <Text className='iconfont icon-chakan'></Text>
              <Text>查看详情</Text>
            </View>
          </View>

          <MessageCard
            className='message-card'
            leftTitle={this.renderCardLeftTitle()}
            leftContent={leftContent}
            rightContent={rightContent}
            leftPhone={leftPhone}
            rightPhone={rightPhone}
            user_delete={orderInfo?.user_delete} // 是否为注销用户
          />
          {/* 客户留言 */}
          {orderInfo?.remark && (
            <SpRemarkItem pageType={pageType} label='客户留言' orderInfo={orderInfo} />
          )}
          {/* 商家备注 */}
          <SpRemarkItem pageType={pageType} orderInfo={orderInfo} onRefresh={this.handleRefresh} />

          <View className='order-detail'>
            <View className='order-detail-title'>
              {/* <View className='text'>{this.renderLogiticsTitle(false, true)}</View> */}
              <View className='text'>{orderInfo?.app_info?.order_class_name}</View>

              <View className='status'></View>
            </View>

            <View className='order-detail-content'>
              {orderInfo?.items?.map((goodItem, index) => (
                <SpGoodItem
                  // onClick={onGoodItemClick}
                  goodInfo={goodItem}
                  orderInfo={orderInfo}
                  className='goodItem'
                  pageType='orderDetail'
                  key={index}
                />
              ))}
            </View>

            <View className='order-detail-footer'>
              <View className='item'>
                <View className='field'>配送方式</View>
                <View className='value'>{this.renderLogiticsTitle(true)}</View>
              </View>
              <View className='item'>
                <View className='field'>商品总价</View>
                <View className='value'>{this.renderTotalFee()}</View>
              </View>
              <View className='item'>
                <View className='field'>优惠金额</View>
                <View className='value'>{this.renderDiscountFee()}</View>
              </View>
              <View className='item'>
                <View className='field'>运费</View>
                <View className='value'>{this.renderFreightFee()}</View>
              </View>
              <View className='item'>
                <View className='field'>实收金额</View>
                <View className='value'>{this.renderRealFee()}</View>
              </View>
            </View>
          </View>

          <View className='card-bottom'>
            <View className='item'>下单时间：{timestampToTime(orderInfo.create_time)}</View>
            {tradeInfo.timeExpire && (
              <View className='item'>交易时间：{timestampToTime(tradeInfo.timeExpire)}</View>
            )}
            {!!logisticsList?.length && (
              <View className='item'>
                发货时间：{logisticsList[logisticsList?.length - 1].delivery_time}
              </View>
            )}
            {terminal_info && (
              <View className='item'>
                {terminal_info?.msg}：{timestampToTime(terminal_info?.time)}
              </View>
            )}
            <View className='item'>订单编号：{orderInfo.order_id}</View>
            <View className='item'>交易单号：{tradeInfo.tradeId}</View>
            {!!tradeInfo.transactionId && (
              <View className='item'>交易流水号：{tradeInfo.transactionId}</View>
            )}
          </View>
        </View>

        <SpToast />

        <FixedAction pageType={pageType}>
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

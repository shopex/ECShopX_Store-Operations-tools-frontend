import React, { Component } from 'react'
import { View } from '@tarojs/components'
import {
  MessageCard,
  FixedAction,
  CommonButton,
  OrderRadio,
  LogisticsPicker
} from '@/components/sp-page-components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { SpGoodItem, SpDrawer, SpGoodPrice, SpFormItem } from '@/components'
import { getThemeStyle } from '@/utils'

import api from '@/api'
import './index.scss'

class OrderDelivery extends Component {
  constructor(props) {
    super(props)
    this.state = {
      leftContent: [],
      rightContent: [],
      orderInfo: {},
      tradeInfo: {},
      leftPhone: '',
      rightPhone: '',
      //是否拆分发货 0-整单 1-拆分
      isWhole: true,
      //存储商品价格
      goodPrice: [],
      //inputnumber弹框显示隐藏
      inputNumberVisible: false,
      //当前输入的input
      currentInputIndex: 0,
      deliveryVisible: false,
      deliveryValue: {},
      deliveryNo: '',
      //输入单号
      deliveryNoVisible: false
    }
  }

  async componentDidShow() {
    const {
      router: {
        params: { order_id }
      }
    } = getCurrentInstance()
    const { orderInfo, tradeInfo } = await api.order.detail({ orderId: order_id })
    this.setState({
      orderInfo,
      tradeInfo,
      goodPrice: orderInfo?.items?.map((order) => ({ num: 0, max: order.num }))
    })
    this.renderLeftContent()
    this.renderRightContent()
  }

  renderLeftContent = async () => {
    const {
      orderInfo: {
        receiver_name,
        receiver_mobile,
        receiver_state,
        receiver_city,
        receiver_district,
        receiver_address
      }
    } = this.state
    let leftContent

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

  //按钮切换
  radioChange = (active) => {
    this.setState({
      isWhole: active === 0
    })
  }

  handleClickInputNumber = (index, maxNumber) => {
    console.log('handleClickInputNumber', index, maxNumber)
    this.setState({
      currentInputIndex: index,
      inputNumberVisible: true
    })
  }

  handleConfirm = (number) => {
    const { currentInputIndex, goodPrice } = this.state
    console.log('handleConfirm', currentInputIndex, number)
    if (!/^[0-9]+$/.test(number)) {
      return
    }
    goodPrice.splice(currentInputIndex, 1, {
      num: Number(number),
      max: goodPrice[currentInputIndex].max
    })
    this.setState({
      inputNumberVisible: false,
      goodPrice
    })
  }

  handleClose = () => {
    this.setState({
      inputNumberVisible: false
    })
  }

  handleCloseNo = () => {
    this.setState({
      deliveryNoVisible: false
    })
  }

  //关闭物流弹窗
  handleDeliveryClose = () => {
    this.setState({
      deliveryVisible: false
    })
  }
  //点击物流
  handleClickDelivery = () => {
    this.setState({
      deliveryVisible: true
    })
  }
  //点击物流单号
  handleClickDeliveryNo = () => {
    this.setState({
      deliveryNoVisible: true
    })
  }
  //点击获得物流公司的value和name
  handleDeliverySubmit = (current) => {
    this.handleDeliveryClose()

    this.setState({
      deliveryValue: current
    })
  }

  handleNoConfirm = (number) => {
    if (!/^[a-zZ-z0-9]*$/.test(number)) {
      return
    }
    this.handleCloseNo()
    this.setState({
      deliveryNo: number
    })
  }

  render() {
    const {
      leftContent,
      rightContent,
      leftPhone,
      rightPhone,
      orderInfo,
      isWhole,
      goodPrice,
      inputNumberVisible,
      deliveryVisible,
      deliveryValue,
      deliveryNo,
      deliveryNoVisible
    } = this.state

    console.log('goodPrice', goodPrice)

    return (
      <View className='page-order-delivery' style={getThemeStyle()}>
        <MessageCard
          className='margin-top'
          leftTitle='收货人信息'
          leftContent={leftContent}
          rightContent={rightContent}
          leftPhone={leftPhone}
          rightPhone={rightPhone}
        />

        <View className='order-detail'>
          <View className='order-detail-title'>
            <View className='text'>发货方式</View>
            <View className='status'>
              <OrderRadio onChange={this.radioChange} />
            </View>
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
                renderInputNumber={!isWhole}
                inputnumber={goodPrice[index].num}
                onClickInputNumber={this.handleClickInputNumber.bind(this, index)}
              />
            ))}
          </View>

          <View className='order-detail-footer'>
            <View className='item'>
              <View className='field'>订单编号</View>
              <View className='value'>{orderInfo?.order_id}</View>
            </View>
            <View className='item'>
              <View className='field'>配送方式</View>
              <View className='value'>{orderInfo?.app_info?.delivery_type_name}</View>
            </View>
            <View className='item'>
              <View className='field'>运费</View>
              <View className='value'>
                <SpGoodPrice height={24} price={orderInfo?.freight_fee} color='danger' isSame />
              </View>
            </View>
          </View>
        </View>

        <SpDrawer
          title='商品发货数量'
          placeholder='请填写发货数量，不可大于该商品应发数量'
          visible={inputNumberVisible}
          onConfirm={this.handleConfirm}
          onClose={this.handleClose}
          onCancel={this.handleClose}
        />

        <View className='card-bottom'>
          <SpFormItem
            label='快递公司'
            placeholder='请选择快递公司'
            value={deliveryValue?.name}
            onClickValue={this.handleClickDelivery}
          />
          <SpFormItem
            label='物流单号'
            placeholder='请填写物流公司单号'
            value={deliveryNo}
            onClickValue={this.handleClickDeliveryNo}
          />
        </View>

        <LogisticsPicker
          visible={deliveryVisible}
          onClose={this.handleDeliveryClose}
          onConfirm={this.handleDeliverySubmit}
        />

        <SpDrawer
          title='物流单号'
          placeholder='请填写有效的物流单号'
          visible={deliveryNoVisible}
          onConfirm={this.handleNoConfirm}
          onClose={this.handleCloseNo}
          onCancel={this.handleCloseNo}
        />

        <FixedAction>
          <CommonButton text='确认发货' type='primary' size='normal' />
        </FixedAction>
      </View>
    )
  }
}

export default OrderDelivery

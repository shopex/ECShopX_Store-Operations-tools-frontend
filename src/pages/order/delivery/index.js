import React, { Component } from 'react'
import { View } from '@tarojs/components'
import S from '@/spx'
import {
  MessageCard,
  FixedAction,
  CommonButton,
  OrderRadio,
  LogisticsPicker
} from '@/components/sp-page-components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { SpGoodItem, SpDrawer, SpGoodPrice, SpFormItem, SpToast, SpLoading } from '@/components'
import { getThemeStyle, requestCallback } from '@/utils'
import api from '@/api'
import './index.scss'

//计算剩余发货数量
function computedDeliveryNumber(item) {
  return Number(item.num) - Number(item.delivery_item_num)
}

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
      goodItems: [],
      pageType: 'orderDelivery',
      //inputnumber弹框显示隐藏
      inputNumberVisible: false,
      //当前输入的input
      currentInputIndex: 0,
      deliveryVisible: false,
      deliveryValue: {},
      deliveryNo: '',
      //输入单号
      deliveryNoVisible: false,
      loading: false,
      error: {
        //存储错误商品id
        itemError: [],
        //存储物流公司错误
        deliveryError: false,
        //存储物流单号错误
        deliveryNoError: false
      }
    }
  }

  async componentDidShow() {
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
      tradeInfo,
      goodPrice: orderInfo?.items?.map((order, index) => ({
        num: 0,
        max: computedDeliveryNumber(order),
        index: index
      })),
      goodItems: orderInfo?.items
    })
    await this.renderLeftContent()
    await this.renderRightContent()
    this.setState({
      loading: false
    })
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
      max: goodPrice[currentInputIndex].max,
      index: goodPrice[currentInputIndex].index
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
      deliveryValue: current,
      error: {
        ...this.state.error,
        deliveryError: false
      }
    })
  }

  handleNoConfirm = (number) => {
    if (!/^[a-zA-Z0-9]*$/.test(number)) {
      return
    }
    this.handleCloseNo()
    this.setState({
      deliveryNo: number,
      error: {
        ...this.state.error,
        deliveryNoError: false
      }
    })
  }

  //处理数量相关逻辑
  handlePriceError = () => {
    const { isWhole, goodPrice, goodItems, error } = this.state
    //如果是整单发货
    if (isWhole) {
      return goodItems.map((item) => ({ ...item, delivery_num: computedDeliveryNumber(item) }))
    } else {
      //如果是拆分发货
      const totalNum = goodPrice.reduce((total, current, currentIndex) => total + current.num, 0)

      //应发数量大与最大数量
      const abnormalNum = goodPrice.find((item) => item.num > item.max)

      //所有价格为空的下标
      const allPriceNoneIndex = goodPrice.filter((good) => good.num === 0).map((item) => item.index)

      //所有价格为空的id数组
      const noPriceGoodsIds = goodItems.reduce((total, current, currentIndex) => {
        if (allPriceNoneIndex.indexOf(currentIndex) > -1) {
          return total.concat(current.item_id)
        }
        return total
      }, [])

      //如果一个都没有
      if (!totalNum) {
        this.setState({
          error: {
            ...error,
            itemError: noPriceGoodsIds
          }
        })

        S.toast('请填写商品发货数量')
        return []
      } else if (totalNum && abnormalNum) {
        this.setState({
          error: {
            ...error,
            itemError: noPriceGoodsIds
          }
        })
        S.toast('预计发货数量不能大于应发数量')
        return []
      }

      //所有有价格的下标
      const allPriceHasIndex = goodPrice.filter((good) => good.num > 0).map((item) => item.index)
      //筛选有价格的商品
      const hasPriceGoods = goodItems.reduce((total, current, currentIndex) => {
        if (allPriceHasIndex.indexOf(currentIndex) > -1) {
          return total.concat({ ...current, delivery_num: goodPrice[currentIndex].num })
        }
        return total
      }, [])

      return hasPriceGoods
    }
  }

  //处理快递公司相关逻辑
  handleDeliveryCompany = () => {
    const { error, deliveryValue } = this.state

    if (!deliveryValue.name) {
      this.setState({
        error: {
          ...error,
          deliveryError: true
        }
      })
      S.toast('请选择快递公司')
    }
    return deliveryValue.value
  }

  //处理快递单号
  handleDeliveryNo = () => {
    const { error, deliveryNo } = this.state

    if (!deliveryNo) {
      this.setState({
        error: {
          ...error,
          deliveryNoError: true
        }
      })
      S.toast('请填写物流公司单号')
    }
    return deliveryNo
  }

  //点击确认发货按钮
  handleDelivery = () => {
    const { orderInfo, isWhole } = this.state
    //处理商品相关逻辑
    const totalItems = this.handlePriceError()

    if (!totalItems.length) {
      return
    }

    const delivery_corp = this.handleDeliveryCompany()

    if (!delivery_corp) {
      return
    }

    const delivery_code = this.handleDeliveryNo()

    if (!delivery_code) {
      return
    }

    requestCallback(
      async () => {
        const data = await api.order.delivery({
          order_id: orderInfo.order_id,
          delivery_type: isWhole ? 'batch' : 'sep',
          delivery_corp,
          delivery_code,
          sepInfo: JSON.stringify(totalItems),
          type: 'new'
        })
        return data
      },
      '发货成功',
      () => {
        let query = {}
        setTimeout(() => {
          Taro.redirectTo({ url: `/pages/order/list` })
        }, 500)
      }
    )
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
      deliveryNoVisible,
      loading,
      error,
      pageType
    } = this.state

    return loading ? (
      <SpLoading>正在加载...</SpLoading>
    ) : (
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
              <OrderRadio onChange={this.radioChange} active={isWhole ? 0 : 1} />
            </View>
          </View>

          <View className='order-detail-content'>
            {orderInfo?.items?.map((goodItem, index) => (
              <SpGoodItem
                // onClick={onGoodItemClick}
                goodInfo={{ ...goodItem, deliveryNum: computedDeliveryNumber(goodItem) }}
                errorGoodIds={error.itemError}
                orderInfo={orderInfo}
                className='goodItem'
                pageType={pageType}
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
          type='number'
        />

        <View className='card-bottom'>
          <SpFormItem
            label='快递公司'
            placeholder='请选择快递公司'
            value={deliveryValue?.name}
            error={error.deliveryError}
            onClickValue={this.handleClickDelivery}
          />
          <SpFormItem
            label='物流单号'
            placeholder='请填写物流公司单号'
            value={deliveryNo}
            error={error.deliveryNoError}
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

        {/* <SpAutoFocusDrawer
          title='物流单号'
          visible={deliveryNoVisible}
          onClose={this.handleCloseNo}
          onCancel={this.handleCloseNo}
          onConfirm={this.handleNoConfirm}
        /> */}

        <SpToast />

        <FixedAction>
          <CommonButton
            text='确认发货'
            type='primary'
            size='normal'
            onClick={this.handleDelivery}
          />
        </FixedAction>
      </View>
    )
  }
}

export default OrderDelivery

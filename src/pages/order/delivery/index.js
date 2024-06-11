import React, { Component } from 'react'
import { View } from '@tarojs/components'
import S from '@/spx'
import {
  MessageCard,
  FixedAction,
  CommonButton,
  OrderRadio,
  LogisticsPicker,
  DeliveryForm
} from '@/components/sp-page-components'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import {
  SpGoodItem,
  SpDrawer,
  SpGoodPrice,
  SpFormItem,
  SpToast,
  SpLoading,
  SpPicker
} from '@/components'
import { FormItem, SpecItem, FormImageItem, ParamsItem } from '../../good/comps'
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
      },
      selfDeliveryStatusList: [
        { label: '等待确认', value: 'CONFIRMING' },
        { label: '已接单', value: 'RECEIVEORDER' },
        { label: '已打包', value: 'PACKAGED' },
        { label: '配送中', value: 'DELIVERING' },
        { label: '已送达', value: 'DONE' },
        { label: '不是自配送', value: 'NOTMERCHANT' }
      ],
      selfDeliveryForm: {
        delivery_corp: { label: '商家自配送', value: 'SELF_DELIVERY' },
        delivery_code: '',
        self_delivery_operator_id: { label: '', value: '' },
        self_delivery_operator_pnum: null,
        self_delivery_operator_num: null,
        self_delivery_status: {},
        delivery_remark: null,
        delivery_pics: []
      },
      opreaterVis: false,
      opreatorList: [
        { label: '配送员1', value: '1' },
        { label: '配送员2', value: '2' },
        { label: '配送员3', value: '3' }
      ],
      deliveryStatusVis: false
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

  //点击获得物流公司的value和name
  handleDeliverySubmit = (current) => {
    this.handleDeliveryClose()
    console.log(current)
    const { selfDeliveryForm } = this.state
    this.setState({
      selfDeliveryForm: {
        ...selfDeliveryForm,
        delivery_corp: { ...current, label: current.name }
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

  handleFormItemClick = async (key) => {
    console.log(key)
    switch (key) {
      case 'delivery_corp':
        this.setState({
          deliveryVisible: true
        })
        break
      case 'self_delivery_operator_id':
        const { list } = await api.order.getDeliveryList()
        this.setState({
          opreaterVis: true,
          opreatorList: list
        })
        break
      case 'self_delivery_status':
        this.setState({
          deliveryStatusVis: true
        })
    }
  }

  handleChangeForm = (key, value) => {
    console.log('===handleChangeForm==', key, value)

    const { selfDeliveryForm } = this.state

    switch (key) {
      case 'delivery_code':
        this.setState({
          selfDeliveryForm: {
            ...selfDeliveryForm,
            delivery_code: value
          }
        })
        break
      case 'self_delivery_operator_id':
        this.setState({
          opreaterVis: false,
          selfDeliveryForm: {
            ...selfDeliveryForm,
            self_delivery_operator_id: this.state.opreatorList[value]
          }
        })
        break
      case 'self_delivery_status':
        this.setState({
          deliveryStatusVis: false,
          selfDeliveryForm: {
            ...selfDeliveryForm,
            self_delivery_status: this.state.selfDeliveryStatusList[value]
          }
        })
        break
      case 'delivery_remark':
        this.setState({
          selfDeliveryForm: {
            ...selfDeliveryForm,
            delivery_remark: value
          }
        })
        break
      case 'delivery_pics':
        this.setState({
          selfDeliveryForm: {
            ...selfDeliveryForm,
            delivery_pics: value
          }
        })
        break
    }
  }

  //点击确认发货按钮
  handleDelivery = () => {
    const { orderInfo, isWhole } = this.state
    //处理商品相关逻辑
    const totalItems = this.handlePriceError()

    const {
      delivery_corp,
      delivery_code,
      self_delivery_operator_id,
      self_delivery_status,
      delivery_remark,
      delivery_pics
    } = this.state.selfDeliveryForm
    let deliveryParams = {}

    if (delivery_corp.value == 'SELF_DELIVERY') {
      deliveryParams = {
        delivery_corp: delivery_corp.value,
        self_delivery_operator_id: self_delivery_operator_id.id,
        self_delivery_status: self_delivery_status.value,
        delivery_remark,
        delivery_pics
      }
    } else {
      deliveryParams = {
        delivery_corp: delivery_corp.value,
        delivery_code
      }
    }

    console.log(deliveryParams)

    return

    requestCallback(
      async () => {
        const data = await api.order.delivery({
          order_id: orderInfo.order_id,
          delivery_type: isWhole ? 'batch' : 'sep',
          ...deliveryParams,
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
      pageType,
      selfDeliveryForm,
      opreaterVis,
      opreatorList,
      deliveryStatusVis,
      selfDeliveryStatusList
    } = this.state

    console.log(666, this.state.selfDeliveryForm)

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
        <View className='self-delivery-info'>
          <FormItem
            label='快递公司'
            mode='selector'
            required
            placeholder='请输入快递公司'
            onClick={this.handleFormItemClick.bind(this, 'delivery_corp')}
            value={selfDeliveryForm?.delivery_corp?.label}
          />
          {selfDeliveryForm?.delivery_corp?.value != 'SELF_DELIVERY' && (
            <FormItem
              label='物流单号'
              mode='input'
              required
              placeholder='请输入物流单号'
              onChange={(value) => this.handleChangeForm('delivery_code', value)}
              value={selfDeliveryForm.delivery_code}
            />
          )}

          {selfDeliveryForm?.delivery_corp?.value == 'SELF_DELIVERY' && (
            <>
              <FormItem
                label='配送员'
                required
                mode='selector'
                placeholder='请选择配送员'
                onClick={this.handleFormItemClick.bind(this, 'self_delivery_operator_id')}
                value={selfDeliveryForm.self_delivery_operator_id?.username}
              />
              <FormItem
                label='配送编号'
                mode='input'
                editable={false}
                placeholder=''
                value={selfDeliveryForm.self_delivery_operator_id?.staff_no}
              />
              <FormItem
                label='配送员手机号'
                mode='input'
                editable={false}
                placeholder=''
                value={selfDeliveryForm.self_delivery_operator_id?.mobile}
              />
              <FormItem
                label='配送状态'
                required
                mode='selector'
                placeholder='请输入配送员状态'
                onClick={this.handleFormItemClick.bind(this, 'self_delivery_status')}
                value={selfDeliveryForm.self_delivery_status?.label}
              />
              <FormItem
                label='配送备注'
                mode='input'
                placeholder='请输入配送员备注'
                onChange={(value) => this.handleChangeForm('delivery_remark', value)}
                value={selfDeliveryForm.delivery_remark}
              />
              <FormImageItem
                label='照片上传'
                desc='(最多上传9张图片，文件格式为bmp、png、jpeg、jpg或gif，建议尺寸：500*500px，不超过2M）'
                placeholder='请选择商品图片'
                onChange={(value) => this.handleChangeForm('delivery_pics', value)}
                value={selfDeliveryForm?.delivery_pics}
              />
            </>
          )}
        </View>

        {/* <DeliveryForm selfDeliveryForm={selfDeliveryForm} /> */}

        <SpPicker
          visible={opreaterVis}
          title='选择配送员'
          columns={opreatorList.map((item) => item.username)}
          onCancel={() =>
            this.setState({
              opreaterVis: false
            })
          }
          onClose={() =>
            this.setState({
              opreaterVis: false
            })
          }
          onConfirm={(value) => this.handleChangeForm('self_delivery_operator_id', value)}
        />

        <SpPicker
          visible={deliveryStatusVis}
          title='选择配送状态'
          columns={selfDeliveryStatusList.map((item) => item.label)}
          onCancel={() =>
            this.setState({
              deliveryStatusVis: false
            })
          }
          onClose={() =>
            this.setState({
              deliveryStatusVis: false
            })
          }
          onConfirm={(value) => this.handleChangeForm('self_delivery_status', value)}
        />

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

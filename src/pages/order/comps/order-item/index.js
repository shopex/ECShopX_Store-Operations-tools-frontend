import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { SpGoodItem } from '@/components'
import HeaderInfo from './header'
import OrderButton from './button'
import './index.scss'

export default class OrderItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderDesc = (number = 0, totalFee = 0) => {
    return `共${number}件商品 应收（含运费）：¥ ${totalFee}`
  }

  render() {
    const {
      info,
      onClickNote,
      onClickContact,
      onClickCancel,
      onClickConfirmGetOrder,
      onClickVerification
    } = this.props

    return (
      <View className='comp-order-item'>
        <View className='comp-order-item-header'>
          <HeaderInfo info={info} />
        </View>
        <View className='comp-order-item-body'>
          {info.goodList.map((goodItem) => (
            <SpGoodItem info={goodItem} className='goodItem' />
          ))}
        </View>
        <View className='comp-order-item-extra'>
          <View className='distribution'>{`${info.type}`}</View>
          <View className='desc'>{this.renderDesc(info.total_num, info.fee_total)}</View>
        </View>
        <View className='comp-order-item-footer'>
          <OrderButton type='primary' onClick={onClickNote}>
            备注
          </OrderButton>
          <OrderButton onClick={onClickContact}>联系客户</OrderButton>
          <OrderButton type='danger' onClick={onClickCancel}>
            取消订单
          </OrderButton>
          <OrderButton type='primary' onClick={onClickConfirmGetOrder}>
            接单
          </OrderButton>
          <OrderButton type='primary' onClick={onClickVerification}>
            核销
          </OrderButton>
        </View>
      </View>
    )
  }
}

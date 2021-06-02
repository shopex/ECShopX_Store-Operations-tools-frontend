import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { SpGoodItem, SpActionSheet } from '@/components'
import HeaderInfo from './header'
import OrderButton from './button'
import './index.scss'

export default class SpOrderItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderExtra = () => {
    const { info: orderInfo, type = 'normal' } = this.props

    let returnNode

    if (type === 'normal') {
      returnNode = (
        <View className='sp-order-item-extra'>
          <View className='distribution'></View>
          <View className='desc'>
            <View className='desc-title'></View>
            <View className='desc-content'></View>
          </View>
        </View>
      )
    }

    return returnNode
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
      <View className='sp-order-item'>
        <View className='sp-order-item-header'>
          <HeaderInfo info={info} />
        </View>
        <View className='sp-order-item-body'>
          {info.items.map((goodItem, index) => (
            <SpGoodItem goodInfo={goodItem} className='goodItem' key={index} />
          ))}
        </View>

        {this.renderExtra()}

        <View className='sp-order-item-footer'>
          <OrderButton onClick={() => onClickNote(info)}>备注</OrderButton>
          <OrderButton onClick={onClickContact}>联系客户</OrderButton>
          <SpActionSheet type='picker'>
            <OrderButton type='danger' className='extraColor'>
              取消订单
            </OrderButton>
          </SpActionSheet>
          <OrderButton onClick={() => onClickConfirmGetOrder(info)}>接单</OrderButton>
          <OrderButton onClick={onClickVerification}>核销</OrderButton>
          <OrderButton onClick={onClickVerification}>发货</OrderButton>
        </View>
      </View>
    )
  }
}

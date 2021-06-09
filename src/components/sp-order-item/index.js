import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { SpGoodItem, SpGoodPrice } from '@/components'
import { CommonButton } from '@/components/sp-page-components'
import HeaderInfo from './header'
import './index.scss'

export default class SpOrderItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  //列表orderitem显示描述
  renderListDescTitle = () => {
    const {
      info: {
        app_info: {
          status_info: { main_status }
        },
        items
      }
    } = this.props
    if (main_status === 'shipping') {
      return `实收款：`
    } else {
      return `共${items.length}件商品 应收（含运费）：`
    }
  }

  //列表orderitem显示价格
  renderListDescPrice = () => {
    const {
      info: { point, total_fee }
    } = this.props
    //金额订单
    if (point == 0) {
      return <SpGoodPrice price={total_fee} />
      //积分订单
    } else if (total_fee == 0) {
      return <SpGoodPrice point={point} />
    } else {
      return <SpGoodPrice price={total_fee} point={point} />
    }
  }

  /**渲染list页面时的extra */
  renderListExtra = () => {
    const { info: orderInfo, pageType = 'list' } = this.props

    let returnNode

    if (pageType === 'list') {
      returnNode = (
        <View className='sp-order-item-extra-list'>
          <View className='distribution'>{orderInfo.app_info.delivery_type_msg}</View>
          <View className='desc'>
            <View className='desc-title'>{this.renderListDescTitle()}</View>
            <View className='desc-price'>{this.renderListDescPrice()}</View>
          </View>
        </View>
      )
    }

    return returnNode
  }

  handleFooterButtonClick = (buttonType) => {
    const {
      info: orderInfo,
      onClickNote = () => {},
      onClickContact = () => {},
      onClickConfirmGetOrder = () => {},
      onClickCancel = () => {},
      onClickDelivery = () => {}
    } = this.props
    console.log('buttonType', buttonType)
    if (buttonType === 'mark') {
      onClickNote(orderInfo)
    } else if (buttonType === 'contact') {
      onClickContact(orderInfo)
    } else if (buttonType === 'accept') {
      onClickConfirmGetOrder(orderInfo)
    } else if (buttonType === 'cancel') {
      onClickCancel(orderInfo)
    } else if (buttonType === 'delivery') {
      onClickDelivery(orderInfo)
    }
  }

  renderListFooter = () => {
    const { info: orderInfo, pageType = 'list' } = this.props

    let returnNode

    if (pageType === 'list') {
      returnNode = (
        <View className='sp-order-item-footer'>
          {orderInfo.app_info.buttons.map((button, index) => {
            const buttonType = button.type
            const buttonName = button.name
            return (
              <CommonButton
                className='margin-left-20'
                plain
                text={buttonName}
                onClick={this.handleFooterButtonClick.bind(this, buttonType)}
                size='small'
                height={60}
                type={buttonName === '取消订单' ? 'danger' : index === 0 && 'primary'}
              />
            )
          })}
        </View>
      )
    }
    return returnNode
  }

  render() {
    const { info, onGoodItemClick = () => {} } = this.props

    return (
      <View className='sp-order-item'>
        <View className='sp-order-item-header'>
          <HeaderInfo info={info} />
        </View>
        <View className='sp-order-item-body'>
          {info.items.map((goodItem, index) => (
            <SpGoodItem
              onClick={onGoodItemClick}
              goodInfo={goodItem}
              orderInfo={info}
              className='goodItem'
              key={index}
            />
          ))}
        </View>

        {this.renderListExtra()}

        {this.renderListFooter()}
      </View>
    )
  }
}

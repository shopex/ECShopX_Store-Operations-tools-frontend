import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { SpGoodItem } from '@/components'
import { CommonButton } from '@/components/sp-page-components'
import HeaderInfo from './header'
import './index.scss'

export default class SpOrderItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  /**渲染list页面时的extra */
  renderListExtra = () => {
    const { info: orderInfo, pageType = 'list' } = this.props

    let returnNode

    if (pageType === 'list') {
      returnNode = (
        <View className='sp-order-item-extra'>
          <View className='distribution'>{orderInfo.app_info.delivery_type_msg}</View>
          <View className='desc'>
            <View className='desc-title'></View>
            <View className='desc-content'></View>
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
      onClickConfirmGetOrder = () => {}
    } = this.props
    console.log('buttonType', buttonType)
    if (buttonType === 'mark') {
      onClickNote(orderInfo)
    } else if (buttonType === 'contact') {
      onClickContact(orderInfo)
    } else if (buttonType === 'accept') {
      onClickConfirmGetOrder(orderInfo)
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
                type={index === 0 && 'primary'}
              />
            )
          })}
          {/* <CommonButton onClick={onClickContact}  text='取消订单' plain size="small" height={60} />
          <CommonButton onClick={() => onClickConfirmGetOrder(info)}  text='接单' plain size="small" height={60} />
          <CommonButton onClick={onClickVerification}  text='核销' plain size="small" height={60} /> */}
        </View>
      )
    }
    return returnNode
  }

  render() {
    const { info } = this.props

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

        {this.renderListExtra()}

        {this.renderListFooter()}
      </View>
    )
  }
}

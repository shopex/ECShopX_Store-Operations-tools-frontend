import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { classNames } from '@/utils'
import { AtModal, AtInput } from 'taro-ui'
import './index.scss'

const renderNumber = 6

export default class ActionModal extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  renderInputCode = () => {
    return (
      <View className='inputwrapper'>
        <AtInput className='input' type='number' />
      </View>
    )
  }

  renderContent = () => {
    let childrenNode = null

    const { type } = this.props

    if (type === 'phone') {
      childrenNode = (
        <View className='phoneContent'>
          <View className='item item1'>拨打电话</View>
          <View className='item item2'>13754886488</View>
        </View>
      )
    } else if (type === 'cancelOrder') {
      childrenNode = (
        <View className='cancelContent'>
          <View className='item item1'>取消订单</View>
          <View className='item item2'>确认取消该客户的订单吗？</View>
        </View>
      )
    } else if (type === 'confirmGetOrder') {
      childrenNode = (
        <View className='confirmContent'>
          <View className='item item1'>确认接单</View>
          <View className='item item2'>接单后将呼叫骑士到店取货</View>
        </View>
      )
    } else if (type === 'verification') {
      childrenNode = (
        <View className='verificationContent'>
          <View className='item item1'>自提订单核销</View>
          <View className='item item2'>请输入6位数的核销码</View>
          {this.renderInputCode()}
        </View>
      )
    }

    return (
      <View
        className={classNames('content', {
          [`cancelOrder`]: type === 'cancelOrder',
          [`confirmContent`]: type === 'confirmGetOrder',
          [`verification`]: type === 'verification'
        })}
      >
        {childrenNode}
      </View>
    )
  }

  //拨打电话
  handleCallPhonenumber = () => {
    Taro.makePhoneCall({
      phoneNumber: '15397363675'
    })
  }

  //取消弹窗
  handleClose = () => {
    const { onClose } = this.props
    onClose && onClose()
  }

  //取消订单
  handleCancelOrder = () => {
    this.handleClose()
  }

  renderAction = () => {
    let childrenNode = null

    const { type } = this.props

    if (type === 'phone') {
      childrenNode = (
        <View className='actionContent'>
          <View className='item item1' onClick={this.handleClose}>
            取消
          </View>
          <View className='item item2' onClick={this.handleCallPhonenumber}>
            确认拨打
          </View>
        </View>
      )
    } else if (type === 'cancelOrder') {
      childrenNode = (
        <View className='actionContent'>
          <View className='item cancelitem1' onClick={this.handleClose}>
            取消
          </View>
          <View className='item cancelitem2' onClick={this.handleCancelOrder}>
            确认取消
          </View>
        </View>
      )
    } else if (type === 'confirmGetOrder') {
      childrenNode = (
        <View className='actionContent'>
          <View className='item confirmitem1' onClick={this.handleClose}>
            取消
          </View>
          <View className='item confirmitem2' onClick={this.handleCancelOrder}>
            接单
          </View>
        </View>
      )
    } else if (type === 'verification') {
      childrenNode = null
    }

    return childrenNode && <View className='action'>{childrenNode}</View>
  }

  render() {
    const { visible } = this.props

    return (
      <View className={classNames('comp-action-modal')}>
        <AtModal isOpened={visible}>
          {this.renderContent()}
          {this.renderAction()}
        </AtModal>
      </View>
    )
  }
}

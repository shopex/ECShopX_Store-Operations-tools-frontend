import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { CommonButton } from '@/components/sp-page-components'
import { SpRemarkDrawer } from '@/components'
import { classNames } from '@/utils'
import CancelAction from './CancelAction'
import ActionModal from './ActionModal'
import qs from 'qs'
import './index.scss'

//一个和业务相关联的page-button组件
class PageActionButtons extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      //取消原因弹框
      cancelVisible: false,
      //取消原因备注弹框
      cancelReasonVisible: false,
      //操作弹框显示隐藏
      actionVisible: false,
      //操作类型
      actionType: '',
      //备注visible
      noteVisible: false
    }
  }

  //根据page决定按钮的高度
  buttonHeight = () => {
    const { pageType = 'orderList' } = this.props
    let height
    switch (pageType) {
      case 'orderList':
        height = 60
        break
      case 'orderDetail':
        height = 70
        break
      case 'afterSalesDetail':
        height = 70
        break
      default:
        height = 60
        break
    }
    return height
  }
  //根据按钮的位置和类型获得按钮的风格
  buttonType = (buttonName, buttonIndex) => {
    const { buttons } = this.props
    //如果是最后一个 按钮类型为
    if (buttonName === '取消订单') {
      return 'danger'
    }
    if (buttonIndex === buttons.length - 1) {
      return 'primary'
    }
  }

  renderButtons = () => {
    const { buttons = [], buttonClassName } = this.props

    return buttons.map((button, index) => {
      const buttonType = button.type
      const buttonName = button.name

      return (
        <CommonButton
          key={buttonName}
          className={classNames('common-button', buttonClassName)}
          plain
          text={buttonName}
          onClick={this.handleFooterButtonClick.bind(this, buttonType)}
          size='small'
          height={this.buttonHeight()}
          type={this.buttonType(buttonName, index)}
        />
      )
    })
  }
  //点击不同的按钮进行不同的操作
  handleFooterButtonClick = (buttonType) => {
    const { onClick = () => {} } = this.props
    console.log('buttonType', buttonType)
    if (buttonType === 'mark') {
      this.handleClickNote()
    } else if (buttonType === 'contact') {
      this.handleClickContact()
    } else if (buttonType === 'accept') {
      this.handleConfirmGetOrder()
    } else if (buttonType === 'cancel') {
      this.handleClickCancel()
    } else if (buttonType === 'delivery') {
      this.handleClickDelivery()
    } else if (buttonType === 'check') {
      this.handleClickCheck()
    } else if (buttonType === 'consume') {
      this.handleConsume()
    } else if (buttonType === 'confirm') {
      this.handleConfirm()
    } else if (buttonType === 'confirmcancel') {
      this.handleNavigationAftersalesDeal()
    }
    onClick()
  }

  //跳转到售后处理页
  handleNavigationAftersalesDeal = () => {
    const { orderInfo } = this.props
    //处理售后
    Taro.navigateTo({
      url: `/pages/afterSales/deal?orderId=${orderInfo.order_id}`
    })
  }

  handleNavigationDeal = () => {
    const { orderInfo, maxOrderInfo } = this.props
    console.log('orderInfo', maxOrderInfo)
    //处理售后
    Taro.navigateTo({
      url: `/pages/afterSales/deal?aftersalesNo=${
        orderInfo.aftersales_bn || maxOrderInfo.aftersales_bn
      }`
    })
  }

  handleClickCheck = () => {
    const { orderInfo } = this.props
    this.handleNavigationDeal()
    //this.handleNavigationDeal()
  }

  handleConfirm = () => {
    this.setState({
      actionVisible: true,
      actionType: 'confirmDelivery'
    })
    // this.handleNavigationDeal()
  }

  //点击发货按钮
  handleClickDelivery = () => {
    const { orderInfo, mainStatus } = this.props
    let query = {
      order_id: orderInfo.order_id
    }
    if (mainStatus && mainStatus.value) {
      query.listStatus = mainStatus.value
    }
    Taro.navigateTo({ url: `/pages/order/delivery?${qs.stringify(query)}` })
  }

  //点击备注按钮
  handleClickNote = () => {
    this.setState({
      noteVisible: true
    })
  }

  //点击接单按钮
  handleConfirmGetOrder = () => {
    this.setState({
      actionVisible: true,
      actionType: 'confirmGetOrder'
    })
  }

  //点击关闭备注
  handleNoteClose = () => {
    this.setState({
      noteVisible: false
    })
    this.handleCloseButtonActions()
  }

  //点击核销
  handleConsume = () => {
    this.setState({
      actionVisible: true,
      actionType: 'verification'
    })
  }

  //点击联系客户
  handleClickContact = () => {
    this.setState({
      actionVisible: true,
      actionType: 'phone'
    })
  }

  //点击取消订单按钮
  handleClickCancel = () => {
    this.setState({
      cancelVisible: true
    })
  }

  //点击取消picker的回调
  handleClosePicker = () => {
    this.setState({
      cancelVisible: false,
      cancelReasonVisible: false
    })
    this.handleCloseButtonActions()
  }

  //选择其他原因
  handleSelectCancel = () => {
    this.setState({
      cancelVisible: false,
      cancelReasonVisible: true
    })
  }

  handleCloseActionModal = () => {
    this.setState({
      actionVisible: false
    })
    this.handleCloseButtonActions()
  }

  //点击核销
  handleClickVerification = () => {
    this.setState({
      actionVisible: true,
      actionType: 'verification'
    })
  }

  //关闭操作回调
  handleCloseButtonActions = () => {
    const { onClose = () => {}, pageType } = this.props
    if (pageType === 'orderList' || pageType === 'afterSalesList') {
      setTimeout(() => {
        onClose()
      }, 500)
      return
    }
    onClose()
  }

  render() {
    const {
      className,
      orderInfo,
      maxOrderInfo,
      mainStatus,
      onRefresh = () => {},
      pageType,
      afterSalesInfo
    } = this.props
    const { cancelVisible, cancelReasonVisible, actionVisible, actionType, noteVisible } =
      this.state

    return (
      <View className={classNames('sp-page-action-buttons', className)}>
        {this.renderButtons()}

        {/* 取消订单组件 */}
        <CancelAction
          visible={cancelVisible}
          orderInfo={orderInfo}
          reasonVisible={cancelReasonVisible}
          onCancel={this.handleClosePicker}
          onRefresh={onRefresh}
          onSelectOther={this.handleSelectCancel}
        />

        {/* 操作弹框 */}
        <ActionModal
          visible={actionVisible}
          type={actionType}
          onClose={this.handleCloseActionModal}
          onRefresh={onRefresh}
          orderInfo={orderInfo}
          maxOrderInfo={maxOrderInfo}
          mainStatus={mainStatus}
        />

        {/* 备注弹框 */}
        <SpRemarkDrawer
          visible={noteVisible}
          pageType={pageType}
          onRefresh={onRefresh}
          orderInfo={orderInfo}
          afterSalesInfo={afterSalesInfo}
          onClose={this.handleNoteClose}
        />
      </View>
    )
  }
}

export default PageActionButtons

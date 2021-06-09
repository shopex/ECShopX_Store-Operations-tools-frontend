import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { CommonButton } from '@/components/sp-page-components'
import { classNames } from '@/utils'
import CancelAction from './CancelAction'
import ActionModal from './ActionModal'
import NoteDrawer from './NoteDrawer'
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
        height = 80
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
    const { orderInfo } = this.props
    if (buttonType === 'mark') {
      this.handleClickNote()
    } else if (buttonType === 'contact') {
      this.handleClickContact()
    } else if (buttonType === 'accept') {
      this.handleConfirmGetOrder()
    } else if (buttonType === 'cancel') {
      this.handleClickCancel()
    }
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
  }

  render() {
    const { className, orderInfo, onClick = () => {} } = this.props
    const { cancelVisible, cancelReasonVisible, actionVisible, actionType, noteVisible } =
      this.state

    return (
      <View className={classNames('sp-page-action-buttons', className)} onClick={onClick}>
        {this.renderButtons()}

        {/* 取消订单组件 */}
        <CancelAction
          visible={cancelVisible}
          orderInfo={orderInfo}
          reasonVisible={cancelReasonVisible}
          onCancel={this.handleClosePicker}
          onSelectOther={this.handleSelectCancel}
        />

        {/* 操作弹框 */}
        <ActionModal
          visible={actionVisible}
          type={actionType}
          onClose={this.handleCloseActionModal}
          orderInfo={orderInfo}
        />

        {/* 备注弹框 */}
        <NoteDrawer visible={noteVisible} orderInfo={orderInfo} onClose={this.handleNoteClose} />
      </View>
    )
  }
}

export default PageActionButtons

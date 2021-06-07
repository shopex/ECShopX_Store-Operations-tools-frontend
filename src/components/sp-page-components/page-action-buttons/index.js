import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { CommonButton } from '@/components/sp-page-components'
import { classNames } from '@/utils'

//一个和业务相关联的page-button组件
class PageActionButtons extends PureComponent {
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

  renderButtons = () => {
    const { buttons = [], buttonClassName, pageType = 'orderList' } = this.props

    return buttons.map((button, index) => {
      const buttonType = button.type
      const buttonName = button.name

      return (
        <CommonButton
          key={buttonName}
          className={buttonClassName}
          plain
          text={buttonName}
          // onClick={this.handleFooterButtonClick.bind(this, buttonType)}
          size='small'
          height={this.buttonHeight()}
          type={buttonName === '取消订单' ? 'danger' : index === buttons.length - 1 && 'primary'}
        />
      )
    })
  }

  render() {
    const { className } = this.props

    return (
      <View className={classNames('sp-page-action-buttons', className)}>
        {this.renderButtons()}
      </View>
    )
  }
}

export default PageActionButtons

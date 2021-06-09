import React, { PureComponent } from 'react'
import { View, Image, Input } from '@tarojs/components'
import { classNames } from '@/utils'
import { SpGoodPrice } from '@/components'
import './index.scss'

class SpGoodItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  renderSalePrice = () => {
    const {
      orderInfo: { order_class },
      goodInfo
    } = this.props
    //如果是积分订单
    if (order_class === 'pointsmall') {
      return <SpGoodPrice type='normal' point={goodInfo.point} />
    } else {
      return <SpGoodPrice price={goodInfo.item_fee} />
    }
  }

  renderOriginPrice = () => {
    const {
      orderInfo: { order_class },
      goodInfo
    } = this.props
    //如果是积分订单
    if (order_class === 'pointsmall') {
      return <SpGoodPrice type='discount' point={goodInfo.point} />
    } else {
      return <SpGoodPrice type='discount' size={22} price={goodInfo.market_price} />
    }
  }

  handleGoodClick = () => {
    const { onClick = () => {}, goodInfo } = this.props
    onClick(goodInfo)
  }

  renderNumberExtra = () => {
    const { pageType = 'orderList' } = this.props
    if (pageType === 'orderList') {
      return `X`
    } else if (pageType === 'orderDetail') {
      return '数量：'
    }
  }

  //渲染价格描述
  renderNumberDesc = () => {
    const { inputnumber, goodInfo } = this.props
    //如果是
    if (inputnumber === 0) {
      return <View className='no-number'>请写发货数量</View>
    } else if (inputnumber !== 0 && goodInfo.num >= inputnumber) {
      return <View className='has-number'>{`部分发货：${inputnumber}`}</View>
    } else {
      return <View className='error-number'>{`部分发货：${inputnumber}`}</View>
    }
  }

  render() {
    const { goodInfo, className, renderInputNumber, onClickInputNumber = () => {} } = this.props

    return (
      <View className={classNames('sp-good-item', className)} onClick={this.handleGoodClick}>
        <View className='sp-good-item-image'>
          <Image className='img' src={goodInfo.pic} />
        </View>
        <View className='sp-good-item-content'>
          <View className='sp-good-item-content_name'>{goodInfo.item_name}</View>
          <View className='sp-good-item-content_spec'>{goodInfo.item_spec_desc}</View>
          <View className='sp-good-item-content_number'>货号：{goodInfo.item_bn}</View>
        </View>
        <View
          className={classNames('sp-good-item-rightextra', {
            ['renderInputNumber']: renderInputNumber
          })}
        >
          {!renderInputNumber && (
            <View className='sp-good-item-rightextra-top'>
              <View className='sp-good-item-rightextra-price'>{this.renderSalePrice()}</View>
              <View className='sp-good-item-rightextra-originprice'>
                {this.renderOriginPrice()}
              </View>
            </View>
          )}
          {renderInputNumber && (
            <View
              className='sp-good-item-rightextra-inputnumber'
              onClick={() => onClickInputNumber(goodInfo.num)}
            >
              {this.renderNumberDesc()}
            </View>
          )}
          <View className='sp-good-item-rightextra-goodnumber'>
            {this.renderNumberExtra()} {goodInfo.num}
          </View>
        </View>
      </View>
    )
  }
}

export default SpGoodItem

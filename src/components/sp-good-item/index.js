import React, { PureComponent } from 'react'
import { View, Image } from '@tarojs/components'
import { classNames } from '@/utils'
import Price from './price'
import './index.scss'

class SpGoodItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { info, className } = this.props

    return (
      <View className={classNames('sp-good-item', className)}>
        <View className='sp-good-item-image'>
          <Image className='img' src={info.image} />
        </View>
        <View className='sp-good-item-content'>
          <View className='sp-good-item-content_name'>{info.name}</View>
          <View className='sp-good-item-content_spec'>{info.spec}</View>
          <View className='sp-good-item-content_number'>货号：{info.no}</View>
        </View>
        <View className='sp-good-item-rightextra'>
          <View className='sp-good-item-rightextra-price'>
            <Price price={info.price}></Price>
          </View>
          <View className='sp-good-item-rightextra-originprice'>
            <Price type='discount' price={info.extraPrice}></Price>
          </View>
          <View className='sp-good-item-rightextra-goodnumber'>X {info.num}</View>
        </View>
      </View>
    )
  }
}

export default SpGoodItem

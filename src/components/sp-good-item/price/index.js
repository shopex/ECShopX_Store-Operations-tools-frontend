import React, { PureComponent } from 'react'
import { View, Image } from '@tarojs/components'
import { classNames } from '@/utils'
import './index.scss'

class Price extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { price = 0, type = 'normal', symbol = '¥' } = this.props

    return (
      <View
        className={classNames('sp-good-item-price', {
          [`discount`]: type === 'discount'
        })}
      >
        {`${symbol} ${price}`}
      </View>
    )
  }
}

export default Price

import React, { PureComponent } from 'react'
import { View, Image } from '@tarojs/components'
import { classNames } from '@/utils'
import './index.scss'

class SpGoodItem extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { info } = this.props

    return (
      <View className={classNames('sp-good-item')}>
        <View className='sp-good-item-image'>
          <Image className='img' src={info.image} />
        </View>
        <View className='sp-good-item-content'>
          <View className='sp-good-item-content_name'>{info.name}</View>
        </View>
      </View>
    )
  }
}

export default React.memo(SpGoodItem)

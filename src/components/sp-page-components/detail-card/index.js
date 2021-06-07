import React, { PureComponent } from 'react'
import { classNames } from '@/utils'
import { View } from '@tarojs/components'
import './index.scss'

class DetailCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { pageType, status, subStatus } = this.props

    return (
      <View className={classNames('sp-page-detail-card')}>
        <View className='status'>
          <View className='main'>{status}</View>
          <View className='sub'>{subStatus}</View>
        </View>
        <View className='icon'></View>
      </View>
    )
  }
}

export default DetailCard

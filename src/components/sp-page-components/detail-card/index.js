import React, { PureComponent } from 'react'
import { classNames } from '@/utils'
import { OrderIcon } from '@/components/sp-page-components'
import { View } from '@tarojs/components'
import './index.scss'

class DetailCard extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { iconClassName, status, subStatus } = this.props

    return (
      <View className={classNames('sp-page-detail-card')}>
        <View className='status'>
          <View className='main'>{status}</View>
          <View className='sub'>{subStatus}</View>
        </View>
        <OrderIcon status={iconClassName} className='icon' />
      </View>
    )
  }
}

export default DetailCard

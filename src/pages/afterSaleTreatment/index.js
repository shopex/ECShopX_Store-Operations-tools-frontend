import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { SpafterSaleMessage } from '@/components'
import './index.scss'

export default class AfterSaleTreatment extends PureComponent {
  constructor() {
    super()
  }
  componentDidMount() {}

  render() {
    return (
      <View className='page-AfterSaleTreatment'>
        <View className='top'>
          <SpafterSaleMessage></SpafterSaleMessage>
        </View>
      </View>
    )
  }
}

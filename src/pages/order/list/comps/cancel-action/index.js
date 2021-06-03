import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { classNames } from '@/utils'
import { ActionSheet } from '@/components/sp-page-components'
import './index.scss'

export default class CancelAction extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return (
      <View className={classNames('comp-cancel-action')}>
        <ActionSheet type='picker'>a</ActionSheet>
      </View>
    )
  }
}

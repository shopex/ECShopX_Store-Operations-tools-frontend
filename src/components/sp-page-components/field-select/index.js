import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { classNames } from '@/utils'
import { SpClickAwayListener } from '@/components'
import './index.scss'

const modalLabels = ['订单号', '商品名称', '手机号码', '收货人姓名']

export default class FieldSelect extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { visible, onClickAway = () => {} } = this.props

    return (
      <SpClickAwayListener onClickAway={onClickAway}>
        <View
          className={classNames('sp-page-field-select', {
            ['show']: visible
          })}
        >
          {modalLabels.map((label) => (
            <View key={label} className={classNames('sp-page-field-select_item')}>
              {label}
            </View>
          ))}
        </View>
      </SpClickAwayListener>
    )
  }
}

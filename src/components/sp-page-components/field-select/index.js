import React, { PureComponent } from 'react'
import { View } from '@tarojs/components'
import { classNames } from '@/utils'
import { SpClickAwayListener } from '@/components'
import './index.scss'

export default class FieldSelect extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { visible, onClickAway = () => {}, dataSource = [] } = this.props

    return (
      <SpClickAwayListener onClickAway={onClickAway}>
        <View
          className={classNames('sp-page-field-select', {
            ['show']: visible
          })}
        >
          {dataSource.map(({ value, label }) => (
            <View key={value} className={classNames('sp-page-field-select_item')}>
              {label}
            </View>
          ))}
        </View>
      </SpClickAwayListener>
    )
  }
}

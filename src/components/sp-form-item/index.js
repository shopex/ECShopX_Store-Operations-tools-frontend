import React, { PureComponent } from 'react'
import { classNames } from '@/utils'
import { View, Input } from '@tarojs/components'
import './index.scss'

export default class SpFormItem extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const { label = '这是一个label', value = '', onClickValue = () => {}, placeholder } = this.props

    return (
      <View className={classNames('sp-component-form-item')}>
        <View className='label'>{label}</View>
        <View
          className={classNames('placeholder', { ['has-value']: value })}
          onClick={onClickValue}
        >
          {value ? value : placeholder}
        </View>
      </View>
    )
  }
}

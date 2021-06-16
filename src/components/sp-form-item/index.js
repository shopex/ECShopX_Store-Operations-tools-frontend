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
    const {
      label = '这是一个label',
      value = '',
      onClickValue = () => {},
      placeholder,
      error,
      children,
      wrap,
      className
    } = this.props

    return (
      <View className={classNames('sp-component-form-item', className, { ['wrap']: wrap })}>
        <View className='label'>{label}</View>
        <View
          className={classNames('placeholder', { ['has-value']: value, ['error']: error })}
          onClick={onClickValue}
        >
          {children ? children : value ? value : placeholder}
        </View>
      </View>
    )
  }
}

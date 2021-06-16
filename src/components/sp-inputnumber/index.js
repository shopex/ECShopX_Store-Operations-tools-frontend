import React, { PureComponent } from 'react'
import { View, Input, Text } from '@tarojs/components'
import { classNames } from '@/utils'
import './index.scss'

export default class SpInputNumber extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  handleInput = (event) => {
    const { onChange = () => {} } = this.props
    const {
      detail: { value }
    } = event
    onChange(value)
  }

  handleFocus = () => {
    this.setState({
      active: true
    })
  }

  handleBlur = () => {
    this.setState({
      active: false
    })
  }

  render() {
    const { placeholder, clear, value, error } = this.props

    const { active } = this.state

    return (
      <View
        className={classNames('sp-input-number', {
          ['active']: active,
          ['error']: error
        })}
      >
        <Input
          clear
          type='number'
          className='custominput'
          value={value}
          onInput={this.handleInput}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
        {placeholder && !value && value != 0 && <View className='placeholder'>{placeholder}</View>}
        {clear && !!value && (
          <View className='clear'>
            <Text className='iconfont '></Text>
          </View>
        )}
        {error && <View className='tips'>{error}</View>}
      </View>
    )
  }
}

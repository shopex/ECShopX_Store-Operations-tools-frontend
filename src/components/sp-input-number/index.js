import React, { PureComponent } from 'react'
import { View, Input } from '@tarojs/components'
import { classNames } from '@/utils'
import './index.scss'

export default class SpInputNumber extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      value: ''
    }
  }

  handleInput = (event) => {
    const {
      detail: { value }
    } = event
    console.log('value', value)
    this.setState({
      value
    })
  }

  render() {
    const { placeholder, clear } = this.props

    const { value } = this.state

    return (
      <View className={classNames('sp-input-number')}>
        <Input
          clear
          type='number'
          className='custominput'
          value={value}
          onInput={this.handleInput}
        />
        {placeholder && !value && <View className='placeholder'>{placeholder}</View>}
        {clear && value && (
          <View className='clear'>
            <Text className='iconfont '></Text>
          </View>
        )}
      </View>
    )
  }
}

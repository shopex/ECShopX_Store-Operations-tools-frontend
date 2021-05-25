import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { withLogin } from '@/hocs'
import './index.scss'

// @withLogin()
export default class Index extends Component {
  state = {
    text: 222
  }
  componentWillMount() {
    console.log( 'Index', getCurrentInstance() )
    console.log('Index componentWillMount')
  }

  componentDidMount() {
    console.log('Index componentDidMount')
  }

  render() {
    const { text } = this.state
    return (
      <View className='page-index'>
        <Text>首页: { text }</Text>
      </View>
    )
  }
}

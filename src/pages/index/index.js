import { Component } from 'react'
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  state = {
    text: 111
  }

  componentWillMount () { }

  componentDidMount () { }

  render() {
    const { text } = this.state
    return (
      <View className='page-index'>
        <Text>首页: { text }</Text>
      </View>
    )
  }
}

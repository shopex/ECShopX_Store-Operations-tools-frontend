import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component } from 'react'
import { View, Text } from '@tarojs/components'
import { withLogin } from '@/hocs'
import { navigateTo }  from '@/utils'
import './index.scss'


function Index() {
  return (
    <div>
      Trade
    </div>
  );
}

export default Index;

// @withLogin()
// export default class Index extends Component {
//   state = {
//     text: 222
//   }
//   componentWillMount() {
//     console.log( 'Index', getCurrentInstance() )
//     console.log('Index componentWillMount')
//   }

//   componentDidMount() {
//     console.log('Index componentDidMount')
//   }

//   componentDidHide() {
//     console.log('Index componentDidHide')
//   }

//   navigateTo =  navigateTo

//   render() {
//     const { text } = this.state
//     return (
//       <View className='page-index'>
//         <Text>首页: {text}</Text>
//         <View onClick={ this.navigateTo.bind(this, '/pages/auth/agreement') }>协议</View>
//       </View>
//     )
//   }
// }

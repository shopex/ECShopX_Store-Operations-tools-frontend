import Taro, { getCurrentInstance } from '@tarojs/taro'
import React, { Component, PureComponent } from 'react'
import { View, Text, Image } from '@tarojs/components'
import { withLogin } from '@/hocs'
import { navigateTo, formatNum } from '@/utils'
import './index.scss'

const funcList = [
  {
    title: '订单',
    icon: require('@/assets/imgs/index/dingdan.svg')
  },
  {
    title: '售后',
    icon: require('@/assets/imgs/index/shouhou.svg')
  },
  {
    title: '扫一扫',
    icon: require('@/assets/imgs/index/shaoyishao.svg')
  }
  // {
  //   title: '扫一扫',
  //   icon: require('../../assets/imgs/index/shaoyishao.svg')
  // }
]

@withLogin()
class Index extends PureComponent {
  constructor() {
    super()
    this.state = {
      moneyShow: true,
      spendMoney: 999998.77
    }
  }

  switchHandle() {
    this.setState({
      moneyShow: !this.state.moneyShow
    })
  }
  render() {
    const { moneyShow, spendMoney } = this.state
    return (
      <View className='page-index'>
        <View className='top'>
          <View className='shop-title'>
            <View className='avatar'>
              <Image className='photo' src={require('@/assets/imgs/1.jpg')}></Image>
            </View>
            <View>
              <Text className='title'>我是当前店铺的名称</Text>
            </View>
          </View>
        </View>
        <View className='current-status'>
          <View className='big-title'>
            <View className='iconfont icon-gaikuang'></View>
            <Text>实时概况</Text>
          </View>
          <View className='spend-money'>
            <View className='title'>
              <Text>实付金额（元）</Text>
              {moneyShow ? (
                <View
                  className='iconfont icon-yincang'
                  onClick={() => {
                    this.switchHandle()
                  }}
                ></View>
              ) : (
                <View
                  className='iconfont icon-xianshi'
                  onClick={() => {
                    this.switchHandle()
                  }}
                ></View>
              )}
            </View>
            <View className='money'>
              {moneyShow ? <Text>{formatNum(spendMoney)}</Text> : <Text>****</Text>}
            </View>
          </View>
          <View className='list'>
            <View className='pay-order'>
              <View className='title'>支付订单（笔）</View>
              <View className='color-white'>{formatNum(spendMoney)}</View>
            </View>
            <View className='pay-order'>
              <View className='title'>售后订单（笔）</View>
              <View className='color-white'>{formatNum(spendMoney)}</View>
            </View>
          </View>

          <View className='list list-2'>
            <View className='pay-order'>
              <View className='title'>退款（元）</View>
              <View className='color-gray'>{formatNum(spendMoney)}</View>
            </View>
            <View className='pay-order'>
              <View className='title'>实付会员（人）</View>
              <View className='color-gray'>{formatNum(spendMoney)}</View>
            </View>
          </View>
          <View className='list list-2'>
            <View className='pay-order'>
              <View className='title'>客单价（元）</View>
              <View>{formatNum(spendMoney)}</View>
            </View>
            <View className='pay-order'>
              <View className='title'>新增储值（人）</View>
              <View>{formatNum(spendMoney)}</View>
            </View>
          </View>
        </View>
        <View className='func-list'>
          <View className='title'>常用功能</View>
          <View className='list'>
            {funcList.map((item) => {
              return (
                <View className='item' key={item.title}>
                  <View>
                    <Image className='img' src={item.icon}></Image>
                  </View>
                  <View className='subtitle'>{item.title}</View>
                </View>
              )
            })}
          </View>
        </View>
      </View>
    )
  }
}

export default Index

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

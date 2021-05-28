import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'

import { View, Text, ScrollView } from '@tarojs/components'
import { SptitleBar, SpMessage } from '@/components'
import './index.scss'

const SpTitleBarData = {
  title: '消息中心'
}
const SpMessageData = [
  {
    imgurl: require('../../assets/imgs/message/zyk_sh.png'),
    bgColor: {
      background: 'linear-gradient(180deg, #6EA5FF 0%, #93C0FD 100%)'
    },
    title: '售后订单',
    subtitle: '新增售后订单，请及时处理',
    date: '5月18日',
    messageNum: 111,
    onclickHander: function () {
      console.log('售后订单')
    }
  },
  {
    imgurl: require('../../assets/imgs/message/zyk_dfh.png'),
    bgColor: {
      background: 'linear-gradient(180deg, #FFA040 0%, #FFC758 100%)'
    },
    title: '代发货订单',
    subtitle: '新增发货订单，请及时处理',
    date: '5月19日',
    messageNum: 13,
    onclickHander: function () {
      console.log('代发货订单')
    }
  },
  {
    imgurl: require('../../assets/imgs/message/zyk_wtt.png'),
    bgColor: {
      background: 'linear-gradient(180deg, #FF7C7C 0%, #FF99A4 100%)'
    },
    title: '未妥投订单',
    subtitle: '新增发货订单，请及时处理',
    date: '5月20日',
    messageNum: 12,
    onclickHander: function () {
      console.log('未妥投订单')
    }
  }
]
export default class Message extends PureComponent {
  constructor() {
    super()
  }
  componentDidMount() {}

  render() {
    return (
      <View className='page-message'>
        {/* <View className='top'>
          <SptitleBar SpTitleBarData={SpTitleBarData}></SptitleBar>
        </View> */}
        <ScrollView className='message-list'>
          {SpMessageData.map((item) => {
            return <SpMessage SpMessageData={item} key={item.title}></SpMessage>
          })}
        </ScrollView>
      </View>
    )
  }
}

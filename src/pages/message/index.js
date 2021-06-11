import Taro from '@tarojs/taro'
import React, { PureComponent } from 'react'
import { View, Text, ScrollView } from '@tarojs/components'
import { SptitleBar, SpMessage } from '@/components'
import './index.scss'
import { connect } from 'react-redux'

import api from '@/api'

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
    onclickHander: function () {
      console.log('未妥投订单')
    }
  }
]

@connect(({ planSelection }) => ({
  planSelection: planSelection.activeShop
}))
export default class Message extends PureComponent {
  constructor() {
    super()
    this.state = {
      messageData: {}
    }
  }
  componentDidMount() {
    this.getConfig()
  }
  // 滑动事件
  onscrollPage(e) {
    console.log(e.detail.scrollTop)
  }

  async getConfig() {
    let { distributor_id } = this.props.planSelection
    distributor_id = distributor_id ? distributor_id : '102'
    const result = await api.message.getMessageList({ distributor_id })
    console.log(result)
    this.setState({
      messageData: result
    })
    console.log(this.state.messageData)
  }

  render() {
    const { date_type_1, date_type_2, date_type_3, num_type_1, num_type_2, num_type_3 } =
      this.state.messageData
    return (
      <View className='page-message'>
        {/* <View className='top'>
          <SptitleBar SpTitleBarData={SpTitleBarData}></SptitleBar>
        </View> */}

        {this.state.messageData && (
          <ScrollView className='message-list' onScroll={(e) => this.onscrollPage(e)}>
            {SpMessageData.map((item, index) => {
              if (index == 0) {
                return (
                  <SpMessage
                    SpMessageData={item}
                    date={date_type_1}
                    messageNum={num_type_1}
                    key={item.title}
                  ></SpMessage>
                )
              } else if (index == 1) {
                return (
                  <SpMessage
                    date={date_type_2}
                    messageNum={num_type_2}
                    SpMessageData={item}
                    key={item.title}
                  ></SpMessage>
                )
              } else {
                return (
                  <SpMessage
                    date={date_type_3}
                    messageNum={num_type_3}
                    SpMessageData={item}
                    key={item.title}
                  ></SpMessage>
                )
              }
              // {
              //   index == 0  && return (<SpMessage SpMessageData={item} key={item.title}></SpMessage>)
              // }
            })}
          </ScrollView>
        )}
      </View>
    )
  }
}

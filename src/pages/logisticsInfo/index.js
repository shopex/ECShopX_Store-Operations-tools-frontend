import { PureComponent } from 'react'
import { View, Image } from '@tarojs/components'
import api from '@/api'
import { SpChangeWL } from '@/components'
import { timestampToTime } from '@/utils'
import './index.scss'
import Taro from '@tarojs/taro'

import { AtTimeline, AtFloatLayout } from 'taro-ui'

const barList = [
  {
    title: '快递公司',
    value: '中通快递'
  },
  {
    title: '物流单号',
    value: 'ZT987654567887'
  }
]

export default class Logistics extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      logs: null,
      delivery_list: null
    }
  }
  componentDidMount() {
    this.getConfig()
  }
  // 获取物流信息
  async getConfig() {
    const query = {
      order_id: 3431449000310318
    }
    const result = await api.logistics.getLogistics(query)
    this.setState({
      logs: result.logs,
      delivery_list: result.delivery_list
      // isOpened:true
    })
    console.log(result)
  }

  formatLogs(logs) {
    console.log(logs)
    let arr = []
    logs.map((item) => {
      return arr.push({ title: timestampToTime(item.time) + ' ' + item.msg })
    })
    return arr
  }
  handleClose() {}

  render() {
    console.log(this.state.logs)
    return (
      <View className='page-logisticsInfo'>
        <AtFloatLayout isOpened title='这是个标题' onClose={this.handleClose.bind(this)}>
          这是内容区 随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写这是内容区
          随你怎么写这是内容区 随你怎么写这是内容区 随你怎么写
        </AtFloatLayout>
        <View className='box'>
          <SpChangeWL barList={barList}></SpChangeWL>
        </View>
        <View className='timeline'>
          {this.state.logs && <AtTimeline items={this.formatLogs(this.state.logs)}></AtTimeline>}
        </View>
      </View>
    )
  }
}

import { PureComponent } from 'react'
import { View, Image, Picker } from '@tarojs/components'
import api from '@/api'
import { SpChangeWL, SpDialogBox, SpPickerZ } from '@/components'
import { timestampToTime } from '@/utils'
import './index.scss'
import Taro from '@tarojs/taro'

import { AtTimeline } from 'taro-ui'

export default class Logistics extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      logs: null,
      delivery_list: null,
      updateOddNumbers: {
        title: '物流单号',
        isShow: false
      },
      ChangeWL: [
        {
          title: '快递公司',
          value: '',
          zancun: ''
        },
        {
          title: '物流单号',
          value: '',
          zancun: ''
        }
      ],
      // 快递公司列表
      CourierCompany: null,
      selectorChecked: null
    }
  }
  componentDidMount() {
    this.getConfig()
    this.getCourierCompany()
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
  // 获取快递公司
  async getCourierCompany() {
    const result = await api.logistics.getCourierCompanyList()
    this.setState({
      CourierCompany: result.list
    })
  }

  formatLogs(logs) {
    let arr = []
    logs.map((item) => {
      return arr.push({ title: timestampToTime(item.time) + ' ' + item.msg })
    })
    return arr.reverse()
  }
  // 点击取消
  handleClose() {
    const data = this.state.ChangeWL.map((item, index) => {
      item.zancun = ''
      return item
    })
    this.setState({
      ChangeWL: data
    })
    console.log(this.state.ChangeWL)
    this.updateOddNumbersIsShowHandle()
  }
  // 点击确定
  rightClickHandle() {
    const data = this.state.ChangeWL.map((item, index) => {
      if (item.title === '物流单号') {
        item.value = item.zancun
        item.zancun = ''
      }
      return item
    })
    this.updateOddNumbersIsShowHandle()
    this.setState({
      ChangeWL: data
    })
  }
  // 更改修改物流单号是否显示
  updateOddNumbersIsShowHandle() {
    let data = Object.assign({}, this.state.updateOddNumbers, {
      isShow: !this.state.updateOddNumbers.isShow
    })
    this.setState({
      updateOddNumbers: data
    })
  }
  editItemHandle() {
    this.updateOddNumbersIsShowHandle()
  }

  OddNumbersInputChange(e) {
    // 暂存value;
    console.log(e)
    const data = this.state.ChangeWL.map((item, index) => {
      if (item.title === '物流单号') item.zancun = e
      return item
    })
    this.setState({
      ChangeWL: data
    })
  }
  // 选择快递公司
  ChooseCourierCompanyHandle(e) {
    console.log(e.detail.value)
  }

  render() {
    const { updateOddNumbers, ChangeWL, CourierCompany, delivery_list } = this.state
    return (
      <View className='page-logisticsInfo'>
        {updateOddNumbers.isShow && (
          <SpDialogBox
            title={updateOddNumbers.title}
            handleClose={this.handleClose.bind(this)}
            rightClickHandle={this.rightClickHandle.bind(this)}
            changeHandle={(e) => {
              this.OddNumbersInputChange(e)
            }}
            value={ChangeWL[1].value}
          ></SpDialogBox>
        )}
        {/* 页面box */}
        <View className='box'>
          <SpChangeWL
            editItemHandle={this.editItemHandle.bind(this)}
            barList={ChangeWL}
            delivery_list={delivery_list}
            CourierCompany={CourierCompany}
            changeHandle={this.ChooseCourierCompanyHandle.bind(this)}
          ></SpChangeWL>
        </View>
        {/* 页面时间线 */}
        <View className='timeline'>
          {this.state.logs && <AtTimeline items={this.formatLogs(this.state.logs)}></AtTimeline>}
        </View>
      </View>
    )
  }
}

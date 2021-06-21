import { PureComponent } from 'react'
import { View, Image, Picker } from '@tarojs/components'
import api from '@/api'
import { SpChangeWL, SpDialogBox, SpLoading } from '@/components'
import { timestampToTime } from '@/utils'
import './index.scss'
import Taro, { getCurrentInstance } from '@tarojs/taro'

import { AtTimeline } from 'taro-ui'

export default class Logistics extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      logs: null,
      delivery_list: null,
      updateOddNumbers: {
        title: '物流单号'
      },
      loading: false,
      // 快递公司列表
      CourierCompany: null
    }
  }
  componentDidMount() {
    this.getConfig()
    this.getCourierCompany()
  }
  // 获取物流信息
  async getConfig() {
    this.setState({
      loading: true
    })
    const { order_id } = getCurrentInstance().router.params
    console.log(order_id)
    const query = {
      order_id: order_id
    }
    const result = await api.logistics.getLogistics(query)
    const data = result.delivery_list.map((item) => {
      item['zanCun'] = ''
      item['CourierCompany_zanCun'] = ''
      item['CourierCompany_zanCun_code'] = ''
      item['isShow'] = false
      return item
    })
    console.log(data)
    this.setState({
      logs: result.logs,
      delivery_list: data,
      loading: false
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
  handleClose(id) {
    const data = this.state.delivery_list.map((item, index) => {
      item.zanCun = ''
      return item
    })
    this.setState({
      delivery_list: data
    })
    console.log(this.state.delivery_list)
    this.updateOddNumbersIsShowHandle(id)
  }
  // 点击确定
  rightClickHandle(id) {
    const data = this.state.delivery_list.map((item, index) => {
      if (item.orders_delivery_id == id) {
        if (item.zanCun) {
          item.delivery_code = item.zanCun
          item.zancun = ''
        }
      }
      return item
    })
    this.updateOddNumbersIsShowHandle(id)
    this.setState({
      delivery_list: data
    })
  }
  // 更改修改物流单号是否显示
  updateOddNumbersIsShowHandle(id) {
    console.log(id)

    const data = this.state.delivery_list.map((item) => {
      if (item.orders_delivery_id == id) {
        item.isShow = !item.isShow
      }
      return item
    })

    this.setState({
      delivery_list: data
    })
  }
  editItemHandle(id) {
    console.log(id)
    this.updateOddNumbersIsShowHandle(id)
  }

  OddNumbersInputChange(e, id) {
    // 暂存value;
    console.log(e, id)
    const value = e ? e : ' '
    const data = this.state.delivery_list.map((item) => {
      if (item.orders_delivery_id == id) {
        item.zanCun = value
      }
      return item
    })
    console.log(data)
    this.setState({
      delivery_list: data
    })
  }
  // 选择快递公司
  ChooseCourierCompanyHandle(e, id) {
    console.log(e.detail.value, id)
    // console.log(this.state.CourierCompany)
    const data = this.state.delivery_list.map((item) => {
      if (item.orders_delivery_id == id) {
        item.CourierCompany_zanCun = this.state.CourierCompany[e.detail.value].name
        item.CourierCompany_zanCun_code = this.state.CourierCompany[e.detail.value].value
      }
      return item
    })
    this.setState({
      delivery_list: data
    })
    console.log(this.state.CourierCompany)
    console.log(data)

    // this.setState({
    //   CourierCompany_zanCun: this.state.CourierCompany[e.detail.value].name
    // })

    // console.log(e.detail.value)
  }

  render() {
    const { updateOddNumbers, CourierCompany, delivery_list, CourierCompany_zanCun, loading } =
      this.state
    return (
      <View className='page-logisticsInfo'>
        {loading && <SpLoading>正在加载...</SpLoading>}
        {delivery_list &&
          delivery_list.map((item) => {
            return (
              item.isShow && (
                <SpDialogBox
                  key={item.orders_delivery_id}
                  title={updateOddNumbers.title}
                  handleClose={(e) => this.handleClose(item.orders_delivery_id)}
                  rightClickHandle={(e) => this.rightClickHandle(item.orders_delivery_id)}
                  changeHandle={(e) => {
                    this.OddNumbersInputChange(e, item.orders_delivery_id)
                  }}
                  delivery_list_item={item}
                ></SpDialogBox>
              )
            )
          })}
        {/* 页面box */}
        {delivery_list &&
          delivery_list.map((item) => {
            return (
              <View className='box'>
                <SpChangeWL
                  key={item}
                  editItemHandle={(e) => this.editItemHandle(item.orders_delivery_id)}
                  delivery_list_item={item}
                  CourierCompany={CourierCompany}
                  changeCompanyHandle={(e) =>
                    this.ChooseCourierCompanyHandle(e, item.orders_delivery_id)
                  }
                  CourierCompany_zanCun={CourierCompany_zanCun}
                ></SpChangeWL>
              </View>
            )
          })}

        {/* 页面时间线 */}
        <View className='timeline'>
          {this.state.logs && <AtTimeline items={this.formatLogs(this.state.logs)}></AtTimeline>}
        </View>
      </View>
    )
  }
}

import { PureComponent } from 'react'
import { View, Image } from '@tarojs/components'
import api from '@/api'
import './index.scss'
import Taro from '@tarojs/taro'
import { SpRadio } from '@/components'
import { connect } from 'react-redux'

const logo = require('@/assets/imgs/shopex-logo.png')

@connect(
  ({ planSelection }) => ({
    planSelection
  }),
  (dispatch) => ({
    add(index) {
      dispatch({
        type: 'planSelection/GET_DISTRIBUTOR_ID',
        payload: index
      })
    }
  })
)
export default class PlanSelection extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isActive: null,
      shopList: null
    }
  }

  activeHandle = (index) => {
    this.props.add(index)
    this.setState({
      isActive: index
    })
    Taro.redirectTo({ url: `/pages/index` })
  }
  async getPlanSelectionHanle() {
    let data = {
      is_app: 1
    }
    const result = await api.planSelection.getShopList(data)
    console.log(result)
    this.setState({
      shopList: result.list
    })
  }

  componentDidMount() {
    this.getPlanSelectionHanle()
  }

  render() {
    const { isActive, shopList } = this.state
    return (
      <View className='page-planSelection'>
        <View className='title'>选择您的店铺工作台</View>
        {/* <View>{888 && this.props.PlanSelection.distributor_id}</View> */}
        <View className='tips'>没有找到？请联系您的超级管理员</View>
        <View className='box'>
          <SpRadio
            isActive={isActive}
            SpRadioData={shopList}
            activeHandle={this.activeHandle}
          ></SpRadio>
          {/* <SpRadio
            isActive={isActive}
            SpRadioData={SpRadioData}
            activeHandle={this.activeHandle}
          ></SpRadio> */}
        </View>
        <View className='logoBox'>
          <Image src={logo}></Image>
        </View>
      </View>
    )
  }
}

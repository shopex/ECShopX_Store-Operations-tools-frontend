import { PureComponent } from 'react'
import { View, Image, ScrollView } from '@tarojs/components'
import api from '@/api'
import './index.scss'
import Taro from '@tarojs/taro'
import { SpRadio, SpLoading, SpNote } from '@/components'
import { connect } from 'react-redux'

const logo = require('@/assets/imgs/shopex-logo.png')

@connect(
  ({ planSelection }) => ({
    planSelection
  }),
  (dispatch) => ({
    add: (activeShop) => dispatch({ type: 'planSelection/activeShop', payload: activeShop })
  })
)
export default class PlanSelection extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isActive: null,
      shopList: [],
      loading: false
    }
  }

  activeHandle = (activeShop) => {
    this.props.add(activeShop)
    this.setState({
      isActive: activeShop.distributor_id
    })
    Taro.redirectTo({ url: `/pages/index` })
  }
  async getPlanSelectionHanle() {
    this.setState({
      loading: true
    })
    let data = {
      is_app: 1
    }
    const result = await api.planSelection.getShopList(data)
    console.log(result)
    this.setState({
      shopList: result.list,
      loading: false
    })
  }

  componentDidMount() {
    this.getPlanSelectionHanle()
  }

  render() {
    const { isActive, shopList, loading } = this.state
    return (
      <View className='page-planSelection'>
        <ScrollView className='welcome-scrollview' scrollY scrollWithAnimation>
          <View className='title'>选择您的店铺工作台</View>
          <View className='tips'>没有找到？请联系您的超级管理员</View>

          <View className='box'>
            {loading && <SpLoading>正在加载...</SpLoading>}
            {shopList.length > 0 && (
              <SpRadio
                isActive={isActive}
                SpRadioData={shopList}
                activeHandle={this.activeHandle}
              ></SpRadio>
            )}
            {shopList.length <= 0 && <SpNote img='trades_empty.png'>快去添加店铺吧~</SpNote>}
          </View>
          <View className='logoBox'>
            <Image src={logo}></Image>
          </View>
        </ScrollView>
      </View>
    )
  }
}

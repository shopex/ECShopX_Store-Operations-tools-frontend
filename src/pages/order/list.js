import React, { PureComponent, Provider } from 'react'
import Taro from '@tarojs/taro'
import { View, ScrollView } from '@tarojs/components'
import { getThemeStyle } from '@/utils'
import SearchInput from './comps/search-input'
import Tabbar from './comps/tabbar'
import FilterBlock from './comps/filterblock'
import OrderItem from './comps/order-item'
import FilterModal from './comps/filter-modal'
import NoteDrawer from './comps/note-drawer'
import ActionModal from './comps/action-modal'
import './list.scss'

const orderList = [
  {
    no: 'DD20210413214985479',
    time: '2021.04.12 16:14:19',
    status: '已取消',
    goodList: [
      {
        image:
          'http://mmbiz.qpic.cn/mmbiz_png/Hw4SsicubkrdnwoLMY38PLNULch2rPgsGb4NCVCC4EGa8EFs2MPCSbzJolznV64F0L5VetQvyE2ZrCcIb1ZALEA/0?wx_fmt=png?imageView2/2/w/300',
        name: '我商品名最多只显示一行…',
        spec: '规格：12件套',
        no: '765323456789',
        price: '9999.99',
        extraPrice: '9999.99',
        num: 1
      }
    ],
    type: '商家快递配送',
    total_num: 5,
    fee_total: '19.50'
  }
]
const OrderContext = React.createContext()
export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      orderStatus: 0,
      modalShow: false,
      noteVisible: false,
      actionVisible: false,
      actionType: ''
    }
  }

  componentDidMount() {
    // api.order.getOrders().then((res) => {
    //   console.log('Res', res)
    // })
  }

  handleTabClick = (activeIndex) => {
    this.setState({
      orderStatus: activeIndex
    })
  }

  handleClickSearch = () => {
    this.setState({
      modalShow: !this.state.modalShow
    })
  }

  //点击备注按钮
  handleClickNoteButton = () => {
    this.setState({
      noteVisible: true
    })
  }

  //关闭备注
  handleNoteClose = () => {
    this.setState({
      noteVisible: false
    })
  }

  //点击联系客户按钮
  handleClickContactButton = () => {
    this.setState({
      actionVisible: true,
      actionType: 'phone'
    })
  }

  handleClickCancelOrderButton = () => {
    this.setState({
      actionVisible: true,
      actionType: 'cancelOrder'
    })
  }

  handleCloseActionModal = () => {
    this.setState({
      actionVisible: false
    })
  }

  //点击确认发货
  handleClickConfirmGetOrderButton = () => {
    this.setState({
      actionVisible: true,
      actionType: 'confirmGetOrder'
    })
  }

  //点击核销
  handleClickVerification = () => {
    this.setState({
      actionVisible: true,
      actionType: 'verification'
    })
  }

  //点击筛选modal框其他地方
  handleFilterModalClickAway = (e) => {
    if (
      e.target.id === 'custom_input' ||
      e.target.id === 'custom_input_arrow' ||
      e.target.id === 'custom_input_text'
    ) {
      return
    }
    this.setState({
      modalShow: false
    })
  }

  render() {
    const { orderStatus, modalShow, noteVisible, actionVisible, actionType } = this.state

    return (
      <View className='page-order-list' style={getThemeStyle()}>
        <View className='page-order-list-input'>
          <SearchInput modalShow={modalShow} clickSearch={this.handleClickSearch} />
        </View>

        <View className='page-order-list-tabbar'>
          <View className='left'></View>
          <Tabbar activeStatus={orderStatus} onTabClick={this.handleTabClick} />
          <View className='right'></View>
        </View>

        <FilterBlock />

        <ScrollView scrollY className='page-order-list-orderList'>
          {orderList.map((orderItem) => {
            return (
              <OrderItem
                key={orderItem.no}
                info={orderItem}
                onClickNote={this.handleClickNoteButton}
                onClickContact={this.handleClickContactButton}
                onClickCancel={this.handleClickCancelOrderButton}
                onClickConfirmGetOrder={this.handleClickConfirmGetOrderButton}
                onClickVerification={this.handleClickVerification}
              />
            )
          })}
        </ScrollView>

        <FilterModal visible={modalShow} onClickAway={this.handleFilterModalClickAway} />

        <NoteDrawer visible={noteVisible} onClose={this.handleNoteClose} />

        <ActionModal
          visible={actionVisible}
          type={actionType}
          onClose={this.handleCloseActionModal}
        />
      </View>
    )
  }
}

import React, { PureComponent } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { getThemeStyle } from '@/utils'
import SearchInput from './comps/search-input'
import Tabbar from './comps/tabbar'
import FilterBlock from './comps/filterblock'
import NoteDrawer from './comps/note-drawer'
import ActionModal from './comps/action-modal'
import CancelAction from './comps/cancel-action'
import { withPager, withBackToTop } from '@/hocs'
import { SpLoading, SpNote, SpOrderItem } from '@/components'
import { FieldSelect } from '@/components/sp-page-components'
import { SpToast } from '@/components'

import api from '@/api'
import './index.scss'

@withPager
@withBackToTop
export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      orderStatus: 0,
      modalShow: false,
      noteVisible: false,
      actionVisible: false,
      actionType: '',
      orderList: [],
      currentOrder: {},
      loading: false
    }
  }

  async componentDidMount() {
    this.setState(
      {
        orderList: []
      },
      () => {
        this.nextPage()
      }
    )
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
  handleClickNoteButton = (orderInfo) => {
    this.setState({
      noteVisible: true,
      currentOrder: orderInfo
    })
  }

  //关闭备注
  handleNoteClose = () => {
    this.setState({
      noteVisible: false,
      currentOrder: {}
    })
  }

  //点击联系客户按钮
  handleClickContactButton = (orderInfo) => {
    this.setState({
      actionVisible: true,
      actionType: 'phone',
      currentOrder: orderInfo
    })
  }

  //点击取消订单按钮
  handleClickCancelOrderButton = (orderInfo) => {
    this.setState({
      actionVisible: true,
      currentOrder: orderInfo,
      actionType: 'cancelOrder'
    })
  }

  handleCloseActionModal = () => {
    this.setState({
      actionVisible: false,
      currentOrder: {}
    })
  }

  //点击接单
  handleClickConfirmGetOrderButton = (orderInfo) => {
    this.setState({
      actionVisible: true,
      currentOrder: orderInfo,
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

  getOrderParams = () => {
    let params = {
      order_type: 'normal',
      order_class_exclude: 'drug,pointsmall'
    }

    return params
  }

  //获取订单列表
  getOrdersList = async (params) => {
    const {
      list,
      pager: { count: total }
    } = await api.order.list({
      page: params.page_no,
      pageSize: params.page_size,
      ...this.getOrderParams()
    })
    this.setState({
      orderList: [...this.state.orderList, ...list]
    })

    return {
      total
    }
  }

  async fetch(params) {
    this.setState({
      loading: true
    })

    const { total } = await this.getOrdersList(params)

    this.setState({
      loading: false
    })

    return { total }
  }

  render() {
    const {
      orderStatus,
      modalShow,
      noteVisible,
      actionVisible,
      actionType,
      orderList,
      page,
      currentOrder,
      loading
    } = this.state

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

        <ScrollView
          scrollY
          className='page-order-list-orderList'
          scrollWithAnimation
          onScrollToLower={this.nextPage}
        >
          {orderList.map((orderItem) => {
            return (
              <SpOrderItem
                key={orderItem.order_id}
                pageType={'list'}
                info={orderItem}
                onClickNote={this.handleClickNoteButton}
                onClickContact={this.handleClickContactButton}
                onClickCancel={this.handleClickCancelOrderButton}
                onClickConfirmGetOrder={this.handleClickConfirmGetOrderButton}
                onClickVerification={this.handleClickVerification}
              />
            )
          })}
          {loading && <SpLoading>正在加载...</SpLoading>}

          {!page.isLoading && !page.hasNext && !orderList.length && (
            <SpNote img='trades_empty.png'>赶快去添加吧~</SpNote>
          )}
        </ScrollView>

        <FieldSelect visible={modalShow} onClickAway={this.handleFilterModalClickAway} />

        <NoteDrawer
          visible={noteVisible}
          onClose={this.handleNoteClose}
          currentOrder={currentOrder}
        />

        <ActionModal
          visible={actionVisible}
          type={actionType}
          onClose={this.handleCloseActionModal}
          currentOrder={currentOrder}
        />

        <SpToast />
      </View>
    )
  }
}

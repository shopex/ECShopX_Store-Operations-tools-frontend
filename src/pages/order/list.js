import React, { PureComponent } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { getThemeStyle } from '@/utils'
import SearchInput from './comps/search-input'
import Tabbar from './comps/tabbar'
import FilterBlock from './comps/filterblock'
import OrderItem from './comps/order-item'
import FilterModal from './comps/filter-modal'
import NoteDrawer from './comps/note-drawer'
import ActionModal from './comps/action-modal'
import { withPager } from '@/hocs'
import { ORDER_STATUS } from '@/consts'
import { SpLoading, SpNote } from '@/components'

import api from '@/api'
import './list.scss'

@withPager
export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      orderStatus: 0,
      modalShow: false,
      noteVisible: false,
      actionVisible: false,
      actionType: '',
      orderList: []
    }
  }

  componentDidShow() {
    this.setState(
      {
        orderList: []
      },
      () => {
        this.resetPage()
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

  async fetch(params) {
    const {
      list,
      pager: { count: total }
    } = await api.order.list({
      page: params.page_no,
      pageSize: params.page_size,
      order_type: 'normal',
      order_class_exclude: 'drug,pointsmall'
    })

    this.setState({
      orderList: [...list]
    })

    return { total }
  }

  render() {
    const { orderStatus, modalShow, noteVisible, actionVisible, actionType, orderList, page } =
      this.state

    console.log('page', page.isLoading)

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
          {page.isLoading && <SpLoading>正在加载...</SpLoading>}
          {!page.isLoading && !page.hasNext && !orderList.length && (
            <SpNote img='trades_empty.png'>赶快去添加吧~</SpNote>
          )}
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

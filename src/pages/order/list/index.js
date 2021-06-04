import React, { PureComponent } from 'react'
import { View, ScrollView } from '@tarojs/components'
import { getThemeStyle } from '@/utils'
import FilterBlock from './comps/filterblock'
import NoteDrawer from './comps/note-drawer'
import ActionModal from './comps/action-modal'
import { withPager, withBackToTop } from '@/hocs'
import { SpLoading, SpNote, SpOrderItem, SpToast, SpPicker } from '@/components'
import { SelectInput, Tabbar } from '@/components/sp-page-components'

import api from '@/api'
import './index.scss'

@withPager
@withBackToTop
export default class List extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      orderStatus: 0,
      noteVisible: false,
      actionVisible: false,
      actionType: '',
      orderList: [],
      currentOrder: {},
      loading: false,
      //搜索框选择的参数  类型为对象
      inputParams: null,
      //搜索框输入的值
      inputValue: '',
      //状态筛选值
      mainStatus: null,
      //筛选参数
      filterParams: {
        orderTime: ''
      }
    }
  }

  //获取订单筛选参数
  getOrderParams = () => {
    const { inputParams, inputValue, mainStatus } = this.state

    let params = {
      order_type: 'normal'
    }

    if (inputParams && inputValue) {
      params[inputParams.value] = inputValue
    }

    if (mainStatus) {
      params['main_status'] = mainStatus.value
    }

    return params
  }

  searchFilter = async ({ isCMD, isResetList }) => {
    let query = {}

    if (isCMD) {
      //如果是初始化
      query.orderList = []
      query.inputValue = ''
    }

    if (isResetList) {
      //筛选时需要置空
      query.orderList = []
    }

    this.resetPage(() => {
      this.setState(
        {
          ...this.state,
          ...query
        },
        () => {
          this.nextPage()
        }
      )
    })
  }

  async componentDidMount() {
    await this.searchFilter({ isCMD: true })
  }

  handleTabClick = (activeIndex) => {
    this.setState({
      orderStatus: activeIndex
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

  //请求
  fetch = async (params) => {
    this.setState({
      loading: true
    })

    const { total } = await this.getOrdersList(params)

    this.setState({
      loading: false
    })

    return { total }
  }

  //搜索参数变化回调
  handleParamChange = (inputParams) => {
    console.log('handleParamChange', inputParams)
    this.setState({
      inputParams: { ...inputParams }
    })
  }

  //值变化回调
  handleValueChange = (inputValue) => {
    console.log('valueChange', inputValue)
    this.setState({
      inputValue
    })
  }

  //状态变化的回调
  handleStatusChange = (status) => {
    this.setState({
      mainStatus: status
    })
    this.searchFilter({ isResetList: true })
  }

  render() {
    const {
      noteVisible,
      actionVisible,
      actionType,
      orderList,
      page,
      currentOrder,
      loading,
      inputParams,
      inputValue,
      mainStatus
    } = this.state

    return (
      <View className='page-order-list' style={getThemeStyle()}>
        <View className='page-order-list-input'>
          <SelectInput
            inputParam={inputParams}
            inputValue={inputValue}
            pageType='orderList'
            paramChange={this.handleParamChange}
            valueChange={this.handleValueChange}
            onInputConfirm={this.searchFilter}
          />
        </View>

        <Tabbar
          pageType='orderList'
          mainStatus={mainStatus}
          statusChange={this.handleStatusChange}
        />

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

        {/* <SpPicker visible={true} /> */}

        <SpToast />
      </View>
    )
  }
}

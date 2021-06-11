import React, { PureComponent } from 'react'
import { View, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getThemeStyle, requestCallback } from '@/utils'
import FilterBlock from './comps/filterblock'
import NoteDrawer from './comps/note-drawer'
import ActionModal from './comps/action-modal'
import { ORDER_LIST_CANCEL_REASON } from '@/consts'
import { withPager, withBackToTop } from '@/hocs'
import { SpLoading, SpNote, SpOrderItem, SpToast, SpPicker } from '@/components'
import { SelectInput, Tabbar, PageActionButtons } from '@/components/sp-page-components'
import { calculateTimestamp } from '@/utils/time'
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
      filterParams: {},
      //点击picker隐藏
      pickerVisible: false,
      //默认订单由近及远
      orderBy: 'desc',
      //picker的标题
      pickerTitle: '操作弹框',
      //取消订单的数据列
      cancelData: ORDER_LIST_CANCEL_REASON,
      //取消订单的选择原因
      cancelReason: ''
    }
  }

  //获取订单筛选参数
  getOrderParams = () => {
    const { inputParams, inputValue, mainStatus, filterParams, orderBy } = this.state

    let params = {
      order_type: 'normal'
    }

    if (inputParams && inputValue) {
      params[inputParams.value] = inputValue
    }

    if (mainStatus) {
      params['main_status'] = mainStatus.value
    }

    if (orderBy) {
      params['order_by'] = orderBy
    }

    if (filterParams.orderClass) {
      params['order_class'] = filterParams.orderClass
    }

    if (filterParams.orderClass) {
      params['order_class'] = filterParams.orderClass
    }

    if (filterParams.receiptType) {
      params['receipt_type'] = filterParams.receiptType
    }

    if (filterParams.orderTime) {
      let timeArr = calculateTimestamp(filterParams.orderTime)
      console.log('filterParams.orderTime')
      if (timeArr.length) {
        params['time_start_begin'] = timeArr[0]
        params['time_start_end'] = timeArr[1]
      }
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
      pickerVisible: true,
      currentOrder: orderInfo,
      pickerTitle: '取消订单'
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

  //提交筛选状态
  handleSubmitParams = (params) => {
    this.setState({
      filterParams: params
    })
    this.searchFilter({ isResetList: true })
  }

  //切换时间筛选
  orderClick = () => {
    const { orderBy } = this.state
    if (orderBy === 'desc') {
      this.setState(
        {
          orderBy: 'asc'
        },
        () => {
          this.searchFilter({ isResetList: true })
        }
      )
    } else {
      this.setState(
        {
          orderBy: 'desc'
        },
        () => {
          this.searchFilter({ isResetList: true })
        }
      )
    }
  }

  //picker选择
  handlePickerChange = (index, label) => {
    const { pickerTitle } = this.props
    if (pickerTitle === '取消订单') {
      this.setState({
        cancelReason: label
      })
    }
  }

  //确认订单的回调
  handlePickerConfirm = (index, label) => {
    const { currentOrder } = this.state
    requestCallback(
      async () => {
        const data = await api.order.cancel({
          order_id: currentOrder.order_id
        })
        return data
      },
      '取消订单成功',
      () => {
        this.setState({
          pickerVisible: false
        })
      }
    )
  }

  //取消订单的回调
  handlePickerCancel = () => {
    this.setState({
      pickerVisible: false
    })
  }

  //点击商品列表
  handleClickGoodItem = (goodInfo) => {
    Taro.redirectTo({ url: `/pages/order/detail?order_id=${goodInfo.order_id}` })
  }

  handleClickDelivery = (orderInfo) => {
    Taro.redirectTo({ url: `/pages/order/delivery?order_id=${orderInfo.order_id}` })
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
      mainStatus,
      orderBy,
      pickerVisible,
      pickerTitle,
      cancelData
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

        <FilterBlock
          pageType='orderList'
          orderBy={orderBy}
          onSubmitParams={this.handleSubmitParams}
          onOrderClick={this.orderClick}
        />

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
                onGoodItemClick={this.handleClickGoodItem}
                onClickNote={this.handleClickNoteButton}
                onClickContact={this.handleClickContactButton}
                onClickCancel={this.handleClickCancelOrderButton}
                onClickConfirmGetOrder={this.handleClickConfirmGetOrderButton}
                onClickVerification={this.handleClickVerification}
                onClickDelivery={this.handleClickDelivery}
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

        <SpPicker
          visible={pickerVisible}
          confirmType={'danger'}
          title={pickerTitle}
          columns={Object.values(cancelData)}
          onChange={this.handlePickerChange}
          onConfirm={this.handlePickerConfirm}
          onCancel={this.handlePickerCancel}
        />

        <SpToast />
      </View>
    )
  }
}

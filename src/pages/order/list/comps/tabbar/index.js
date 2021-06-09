import { PureComponent } from 'react'
import { AtTabs } from 'taro-ui'
import { ORDER_STATUS } from '@/consts'

const getListAboutPage = (pageType) => {
  let returnArr = []
  if (pageType === 'orderList') {
    returnArr = Object.keys(ORDER_STATUS).map((key) => ({
      value: key,
      label: ORDER_STATUS[key]
    }))
  }
  return returnArr
}

export default class Index extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { activeStatus, onTabClick = () => {} } = this.props

    const tabList = Object.values(ORDER_STATUS).map((status) => ({ title: status }))

    return <AtTabs current={activeStatus} scroll tabList={tabList} onClick={onTabClick}></AtTabs>
  }
}

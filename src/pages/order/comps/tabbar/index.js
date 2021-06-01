import { PureComponent } from 'react'
import { AtTabs } from 'taro-ui'
import { ORDER_STATUS } from '@/consts'

export default class Index extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { activeStatus, onTabClick = () => {} } = this.props

    console.log(this.props)

    const tabList = Object.keys(ORDER_STATUS).map((status) => ({ title: status }))

    console.log('activeStatus', activeStatus)

    return <AtTabs current={activeStatus} scroll tabList={tabList} onClick={onTabClick}></AtTabs>
  }
}

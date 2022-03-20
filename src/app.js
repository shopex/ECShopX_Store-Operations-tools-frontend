import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { Provider } from 'react-redux'
import { SAPP, SAPPPay, SAPPShare } from './muiApp'
import configStore from './store'
import { cleanWeapp, isFromWebapp } from '@/utils'
import '@/muiApp/index.scss'
import 'default-passive-events'
import S from '@/spx'
// import VConsole from 'vconsole'

import './app.scss'

// new VConsole()

const { store } = configStore()

SAPP.init(Taro, store)
if (process.env.APP_DEBUG == 'true') {
  import('vconsole').then((VConsole) => {
    new VConsole.default()
  })
}
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      bottomLift: ''
    }
  }
  componentDidMount() {
    SAPP.onReady(() => {
      console.log('INIT_START', SAPP.Plus.storage.getItem('INIT_START'))
      if (!SAPP.Plus.storage.getItem('INIT_START')) {
        SAPP.Plus.storage.setItem('INIT_START', 'true')
        // Taro.redirectTo({
        //   url: '/pages/auth/agreement'
        // })
      }
    })
  }
  onLaunch() {
    // console.log('onLaunch:options',options)
    // this.getDeviceSize().then(res => {
    //   const {bottomLift} = res
    //   console.log('bottomLift:'+ bottomLift);
    //   this.setState({
    //     bottomLift
    //   })
    //   // this.globalData.bottomLift = bottomLift
    // })
  }
  // 获取设备信息
  getDeviceSize() {
    return new Promise((resolve, reject) => {
      Taro.getSystemInfo({
        success: function (res) {
          console.log(res)
          const { screenHeight, safeArea } = res
          const { bottom } = safeArea
          const bottomLift = screenHeight - bottom
          resolve({ bottomLift })
        }
      })
    })
  }

  componentDidShow(options) {
    const { company_id } = options
    if (company_id && !isFromWebapp()) {
      Taro.setStorageSync('company_id', company_id)
    }
  }

  componentDidHide() {
    console.log('app componentDidHide')
    if (isFromWebapp()) {
      S.logout()
    }
    cleanWeapp()
  }

  componentDidCatchError() {}

  // this.props.children 是将要会渲染的页面
  render() {
    return <Provider store={store}>{this.props.children}</Provider>
  }
}

export default App

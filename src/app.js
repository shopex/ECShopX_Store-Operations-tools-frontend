import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { Provider } from 'react-redux'
import { SAPP, SAPPPay, SAPPShare } from './muiApp'
import configStore from './store'
import '@/muiApp/index.scss'
import './app.scss'

const store = configStore()

SAPP.init( Taro, store )
class App extends Component {
  componentDidMount() {
    console.log( 'App', getCurrentInstance() )
    console.log( 'app componentDidMount' )
    SAPP.onReady( () => {
      console.log( 'INIT_START', SAPP.Plus.storage.getItem( 'INIT_START' ) )
      if ( !SAPP.Plus.storage.getItem( 'INIT_START' ) ) {
        SAPP.Plus.storage.setItem( 'INIT_START', "true" )
        // Taro.redirectTo({
        //   url: '/pages/auth/agreement'
        // })
      }
    })
  }

  componentDidShow() {
    console.log('app componentDidShow')
  }

  componentDidHide() {
    console.log('app componentDidHide')
  }

  componentDidCatchError () {}

  // this.props.children 是将要会渲染的页面
  render() {
    return (
      <Provider store={store}>
        {this.props.children}
      </Provider>
    )
  }
}

export default App

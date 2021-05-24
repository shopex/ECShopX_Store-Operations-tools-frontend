import Taro from '@tarojs/taro'
import { Component } from 'react'
import { Provider } from 'react-redux'
// import { SAPP, SAPPPay, SAPPShare } from './muiApp'
import configStore from './store'
import '@/muiApp/index.scss'
import './app.scss'

const store = configStore()
// Taro["APP"] = { SAPP, SAPPPay, SAPPShare }
// Taro.APP.SAPP.init( Taro, store )

class App extends Component {
  componentDidMount() {
    
  }

  componentDidShow () {}

  componentDidHide () {}

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

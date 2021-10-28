import Taro, { Component } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { ShareUrl, Tracker } from '@/service'
import S from '@/spx'

import { Loading } from '@/components'
import { liveTrackerLastChannel } from '@/utils/entry'

export default class LandingIndex extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true
    }
  }

  componentWillMount() {
    let _params = this.$router.params
    console.log('原始路径：', _params)

    // 处理转义字符
    let params = {}
    for (let _key in _params) {
      let key = _key.replace(/amp;/g, '')
      params[key] = _params[_key]
    }

    console.log('landing willmount')
    console.log(params)
    // const rt = params.rt
    // if (rt === 'pages%2Foversea%2Findex') {
    //   S.set('isOversea', 1)
    // }

    liveTrackerLastChannel()
    ShareUrl.resolveLanding(params)
  }

  componentDidShow() {}

  componentWillUnmount() {
    this.setState({
      loading: false
    })
  }
  render() {
    const { loading } = this.state
    return <View>{loading && <Loading />}</View>
  }
}

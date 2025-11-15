// +----------------------------------------------------------------------
// | ECShopX open source E-commerce
// | ECShopX 开源商城系统
// +----------------------------------------------------------------------
// | Copyright (c) 2003-2025 ShopeX,Inc.All rights reserved.
// +----------------------------------------------------------------------
// | Corporate Website:  https://www.shopex.cn
// +----------------------------------------------------------------------
// | Licensed under the Apache License, Version 2.0
// | http://www.apache.org/licenses/LICENSE-2.0
// +----------------------------------------------------------------------
// | The removal of shopeX copyright information without authorization is prohibited.
// | 未经授权不可去除shopeX商派相关版权
// +----------------------------------------------------------------------
// | Author: shopeX Team <mkt@shopex.cn>
// | Contact: 400-821-3106
// +----------------------------------------------------------------------

import { Component } from 'react'
import { Text } from '@tarojs/components'
import { classNames } from '@/utils'

import './index.scss'

export default class SpTimer extends Component {
  static options = {
    addGlobalClass: true
  }

  static defaultProps = {
    duration: 60,
    defaultMsg: '发送验证码',
    msg: '重新发送'
  }

  constructor(props) {
    super(props)

    this.state = {
      countDur: props.duration,
      sent: false
    }
  }

  componentWillUnmount() {
    this.stop()
  }

  handleClick = () => {
    if (this.timer) return

    if (!this.timer) {
      this.start()
    }
  }

  start = () => {
    this.stop()

    const next = () => {
      this.timer = setTimeout(() => {
        const countDur = this.state.countDur - 1
        this.props.onUpdateTimer && this.props.onUpdateTimer(countDur)
        this.setState({
          countDur
        })
        if (countDur > 0) {
          next()
        } else {
          this.stop()
          this.setState({
            countDur: this.props.duration
          })
          this.props.onStop && this.props.onStop()
        }
      }, 1000)
    }
    this.props.onStart((start) => {
      if (start !== false) {
        this.setState(
          {
            sent: true
          },
          () => next()
        )
      }
    }, this.state.countDur)
  }

  stop() {
    if (this.timer) {
      clearTimeout(this.timer)
      this.timer = null
    }
  }

  render() {
    const { timer } = this
    const { countDur, sent } = this.state
    const { timerMsg, className, style = '' } = this.props

    const msg = timerMsg || (timer ? `${countDur}s` : sent ? this.props.msg : this.props.defaultMsg)

    console.log('timerMsg', timerMsg)
    console.log('timer', timer)
    console.log('countDur', countDur)

    return (
      <Text
        className={classNames('sp-timer', { 'sp-timer__counting': timer }, className)}
        style={style}
        onClick={this.handleClick}
      >
        {msg}
      </Text>
    )
  }
}

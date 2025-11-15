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

import React, { PureComponent, Fragment } from 'react'
import ReactDOM from 'react-dom'

function ownerDocument(node) {
  return (node && node.ownerDocument) || document
}

function mapEventPropToEvent(eventProp) {
  return eventProp.substring(2).toLowerCase()
}

/**
 * 点击包裹组件其他地方进行操作
 */
export default class SpClickAwayListener extends PureComponent {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { touchEvent = 'onTouchEnd' } = this.props
    const dom = ReactDOM.findDOMNode(this)
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent)
      const doc = ownerDocument(dom)
      doc.addEventListener(mappedTouchEvent, this.handleClickAway)
    }
  }

  componentWillUnmount() {
    const { touchEvent = 'onTouchEnd' } = this.props
    const dom = ReactDOM.findDOMNode(this)
    if (touchEvent !== false) {
      const mappedTouchEvent = mapEventPropToEvent(touchEvent)
      const doc = ownerDocument(dom)
      doc.removeEventListener(mappedTouchEvent, this.handleClickAway)
    }
  }

  handleClickAway = (event) => {
    let insideDOM
    const { onClickAway = () => {} } = this.props
    const dom = ReactDOM.findDOMNode(this)
    const doc = ownerDocument(dom)
    if (event.composedPath) {
      insideDOM = event.composedPath().indexOf(dom) > -1
    } else {
      insideDOM = doc.documentElement.contains(event.target) || dom.contains(event.target)
    }
    if (!insideDOM) {
      onClickAway(event)
    }
  }

  render() {
    const { children } = this.props

    return <Fragment>{React.cloneElement(children)}</Fragment>
  }
}

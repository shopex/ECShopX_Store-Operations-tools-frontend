import React, { Component } from 'react';
import Taro from '@tarojs/taro'
import { AtTabBar } from 'taro-ui'

export default class SpTabBar extends Component {
  componentDidMount () {
    this.initTabbarData()
  }
}

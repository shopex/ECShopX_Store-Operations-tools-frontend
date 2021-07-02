import React, { PureComponent } from 'react'
import { SpPicker } from '@/components'
import api from '@/api'

export default class LogisticsPicker extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      list: []
    }
  }

  componentDidMount() {
    api.logistics.getCourierCompanyList().then((res) => {
      this.setState({
        list: res.list
      })
    })
  }

  handlePickerConfirm = (currentIndex) => {
    const { onConfirm = () => {} } = this.props
    onConfirm(this.state.list[currentIndex])
  }

  render() {
    const { visible, onClose = () => {} } = this.props

    const { list } = this.state

    return (
      <SpPicker
        visible={visible}
        title='选择快递公司'
        columns={list.map((item) => item.name)}
        onCancel={onClose}
        onClose={onClose}
        onConfirm={this.handlePickerConfirm}
        startIndex={3}
      />
    )
  }
}

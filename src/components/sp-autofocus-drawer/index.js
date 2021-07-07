import { AtFloatLayout } from 'taro-ui'
import { classNames } from '@/utils'
import { View } from '@tarojs/components'
import Textarea from './Textarea'
import './index.scss'

const SpAutoFocusDrawer = (props) => {
  const {
    visible,
    onClose = () => {},
    onCancel = () => {},
    onConfirm = () => {},
    title = '',
    onCancelText = '取消',
    onConfirmText = '确定',
    className
  } = props

  return (
    <AtFloatLayout
      isOpened={visible}
      onClose={onClose}
      className={classNames('sp-component-autofocus-drawer', className)}
    >
      <View className='header'>
        <View className='left' onClick={onCancel}>
          {onCancelText}
        </View>
        <View className='center'>{title}</View>
        <View className='right' onClick={onConfirm}>
          {onConfirmText}
        </View>
      </View>
      <View className='content'>{visible && <Textarea />}</View>
    </AtFloatLayout>
  )
}
export default SpAutoFocusDrawer

import { AtFloatLayout } from 'taro-ui'
import { classNames } from '@/utils'
import React, { useRef, useEffect } from 'react'
import { Textarea as TaroTextarea } from '@tarojs/components'
import './index.scss'

const Textarea = (props) => {
  const {} = props

  const textareaRef = useRef(null)

  useEffect(() => {
    console.log('textRef', textareaRef.current.focus())
  }, [])

  return <textarea autoFocus ref={textareaRef} />
}

export default Textarea

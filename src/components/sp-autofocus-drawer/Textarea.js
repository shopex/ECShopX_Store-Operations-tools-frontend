import { AtFloatLayout } from 'taro-ui'
import { classNames } from '@/utils'
import React, { useRef, useEffect } from 'react'
import { Textarea as TaroTextarea } from '@tarojs/components'
import './index.scss'

const Textarea = (props) => {
  const {} = props

  const textareaRef = useRef(null)

  useEffect(() => {
    // setTimeout(()=>{
    console.log('textRef', textareaRef.current.focus())
    // },200)
  }, [])

  return <textarea autoFocus ref={textareaRef} />
}

export default Textarea

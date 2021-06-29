export function stopPropagation(event) {
  event.stopPropagation()
}

export function preventDefault(event, isStopPropagation) {
  console.log('preventDefault', event)

  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    console.log('preventDefault2', event)
    event.preventDefault()
  }

  if (isStopPropagation) {
    stopPropagation(event)
  }
}

export function stopPropagation(event) {
  event.stopPropagation()
}

export function preventDefault(event, isStopPropagation) {
  console.log('preventDefault', event)

  /* istanbul ignore else */
  if (typeof event.cancelable !== 'boolean' || event.cancelable) {
    event.preventDefault()
  }

  if (isStopPropagation) {
    stopPropagation(event)
  }
}

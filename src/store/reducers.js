import { combineReducers } from 'redux'
import user from './user'
import planSelection from './planSelection'

export default combineReducers({
  user,
  planSelection
})

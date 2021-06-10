import { createReducer } from 'redux-create-reducer'

const initState = {
  activeShop: null
}

const planSelection = createReducer(initState, {
  ['planSelection/activeShop'](state, action) {
    console.log(state, action)
    state.activeShop = action.payload
    return {
      ...state
    }
  }
})

export default planSelection

import { createReducer } from 'redux-create-reducer'

const initState = {
  distributor_id: null
}

const planSelection = createReducer(initState, {
  ['planSelection/GET_DISTRIBUTOR_ID'](state, action) {
    console.log(state, action)
    const distributor_id = action.payload
    return {
      ...state,
      distributor_id
    }
  }
})

export default planSelection

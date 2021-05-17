export const TOGGLE_TRUE = 'TOGGLE_TRUE'
export const TOGGLE_FALSE = 'TOGGLE_FALSE'

export const toggleTrue = () => ({
  type: TOGGLE_TRUE
})
export const toggleFalse = () => ({
  type: TOGGLE_FALSE
})

const initialState = false

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TRUE:
      return true
    case TOGGLE_FALSE:
      return false
    default:
      return state
  }
}

export default loadingReducer

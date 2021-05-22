export const TOGGLE_LOAD = 'TOGGLE_LOAD'

export const toggleLoad = () => ({
  type: TOGGLE_LOAD
})

const initialState = false

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOAD:
      return !state
    default:
      return state
  }
}

export default loadingReducer

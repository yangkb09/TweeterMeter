export const TOGGLE_LOAD = 'TOGGLE_LOAD'
// export const TOGGLE_FALSE = 'TOGGLE_FALSE'

export const toggleLoad = () => ({
  type: TOGGLE_LOAD
})
// export const toggleFalse = () => ({
//   type: TOGGLE_FALSE
// })

let count = 0

export const _toggleLoad = () => dispatch => {
  try {
    count++
    console.log('HI TOGGLE LOAD THUNK', count)
    dispatch(toggleLoad())
  } catch (err) {
    console.log(err)
  }
}
//thunks useful for async actions
const initialState = false

const loadingReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_LOAD:
      return !state
    // case TOGGLE_FALSE:
    //   return false
    default:
      return state
  }
}

export default loadingReducer

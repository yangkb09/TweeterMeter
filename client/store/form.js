import axios from 'axios'
import {toggleLoad} from './loading'

export const SUBMIT_FORM = 'SUBMIT_FORM'

export const submitForm = text => ({
  type: SUBMIT_FORM,
  text
})

export const _submitForm = text => async dispatch => {
  try {
    dispatch(toggleLoad())
    const {data} = await axios.post('/api/home', text)
    dispatch(submitForm(data))
    dispatch(toggleLoad())
  } catch (err) {
    console.log(err)
  }
}

const initialState = {}

const formReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUBMIT_FORM:
      return action.text
    default:
      return state
  }
}

export default formReducer

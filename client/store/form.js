import axios from 'axios'
import {toggleLoad} from './loading'

export const SUBMIT_FORM = 'SUBMIT_FORM'

export const submitForm = text => ({
  type: SUBMIT_FORM,
  text
})

export const _submitForm = text => async dispatch => {
  try {
    const {data} = await axios.post('/api/home', text)
    dispatch(toggleLoad())
    // console.log('TOGGLE LOAD', toggleLoad)
    dispatch(submitForm(data)) //sending action to reducer
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

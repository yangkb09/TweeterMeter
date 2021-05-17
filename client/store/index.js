import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import formReducer from './form'
import loadingReducer from './loading'

const reducer = combineReducers({
  form: formReducer,
  isLoading: loadingReducer
})

const middleware = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducer, middleware)

export default store

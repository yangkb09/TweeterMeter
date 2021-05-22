import React from 'react'
import {connect} from 'react-redux'
import {_submitForm} from '../store/form'
import {_toggleLoad} from '../store/loading'

export class TextForm extends React.Component {
  constructor() {
    super()
    this.state = {
      formText: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value //incase we have multiple inputs, knows hwere to put
    })
  }

  handleSubmit(event) {
    event.preventDefault() //dont want to refresh bc unmount/mou t
    this.props.postForm(this.state)
    this.setState({
      formText: ''
    })
  }
  render() {
    return (
      <div className="card" id="formCard">
        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="container">
              <label htmlFor="formText">Enter a Twitter Handle:</label>
              <input
                type="text"
                placeholder="Username"
                name="formText"
                value={this.state.formText}
                onChange={this.handleChange}
              />
              {/* <button type="submit" onClick={() => this.props.toggleLoad()}></button> */}
              <button type="submit">Analyze</button>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    formText: state.formText,
    isLoading: state.isLoading
  }
}

const mapDispatch = dispatch => {
  return {
    postForm: text => dispatch(_submitForm(text))
    // toggleLoad: () => dispatch(_toggleLoad())
  }
}

export default connect(mapState, mapDispatch)(TextForm)

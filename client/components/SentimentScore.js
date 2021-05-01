import React from 'react'
import {connect} from 'react-redux'
import {_getScore} from '../store/form'

export class SentimentScore extends React.Component {
  componentDidMount() {
    this.props.getScore()
  }

  render() {
    if (this.props) {
      {console.log('THIS.PROPS: ', this.props)}
      return (
        <div className="card">
          Analysis
          {/* {console.log('RENDER this.props ', this.props)}
          {console.log('RENDER this.state ', this.state)} */}
          <div className="container">
            {/* RENDER PROFILE PIC HERE */}
            Score: {this.props.form.score}
            Magnitude: {this.props.form.magnitude}
            {/* {this.props.form.map(oneForm => {
              return (
                <div key={oneForm.id}>
                  Score: {oneForm.score}
                  magnitude: {oneForm.magnitude}
                </div>
              )
            })} */}
          </div>
        </div>
      )
    } else {
      return <div>nothing here</div>
    }
  }
}

const mapState = state => {
  return {
    score: state.score,
    form: state.form
  }
}

const mapDispatch = dispatch => {
  return {
    getScore: () => dispatch(_getScore())
  }
}

export default connect(mapState, mapDispatch)(SentimentScore)

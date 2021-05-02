import React from 'react'
import {connect} from 'react-redux'
import {_getScore} from '../store/form'

export class SentimentScore extends React.Component {
  componentDidMount() {
    this.props.getScore()
  }

  render() {
    if (this.props.form) {
      {console.log('THIS.PROPS: ', this.props)}
      return (
        <div className="card">
          Analysis
          <div className="container">
            <img src={this.props.form.profileBanner} alt="Twitter User Profile Banner"/>
            <img src={this.props.form.profileImg} alt="Twitter User Profile Picture"/>
            @{this.props.form.screenName}
            {this.props.form.name}
            {this.props.form.location}
            Score: {this.props.form.score}
            Magnitude: {this.props.form.magnitude}
          </div>
        </div>
      )
    } else {
      return <div className="card">Analysis</div>
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

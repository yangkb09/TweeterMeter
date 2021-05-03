import React from 'react'
import {connect} from 'react-redux'
import {_getScore} from '../store/form'

export class SentimentScore extends React.Component {
  constructor(props) {
    super(props)
    this.getSentimentScore = this.getSentimentScore.bind(this)
  }
  componentDidMount() {
    this.props.getScore()
  }

  getSentimentScore(score) {
    if (score < -.75) {return ['Very Negative']; }
    if (score < -.3) {return ['Negative']; }
    if (score < -.05) {return ['Slightly Negative']; }
    if (score < .05) {return ['Neutral']; }
    if (score < .3) {return ['Slightly Positive']; }
    if (score < .75) {return ['Positive']; }
    if (score <= 1) {return ['Very Positive']; }
  }

  // getMagnitude(magnitude) {

  // }

  render() {
    if (this.props.form) {
      return (
        <div className="card gridContainer">
          <div className="container">
            <div id="picContainer">
              <img src={this.props.form.profileBanner} alt="Twitter User Profile Banner" id="twitterProfBanner"/>
              <img src={this.props.form.profileImg} alt="Twitter User Profile Picture" id="twitterProfPic"/>
            </div>
            <div id="name">
              {this.props.form.name}
            </div>
            <div id="screenName">
              @{this.props.form.screenName}
            </div>
            <div id="location">
            <img src="/images/locationIcon.png"/>
              {this.props.form.location}
            </div>
            <div id="score">
              Sentiment: {this.getSentimentScore(this.props.form.score)}
            </div>
            <div id="magnitude">
              Magnitude: {this.props.form.magnitude}
            </div>
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

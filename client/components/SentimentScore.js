import React from 'react'
import {connect} from 'react-redux'
import {_getScore} from '../store/form'

export class SentimentScore extends React.Component {
  constructor(props) {
    super(props)
    this.getSentimentScore = this.getSentimentScore.bind(this)
    this.getMagnitude = this.getMagnitude.bind(this)
  }
  componentDidMount() {
    this.props.getScore()
  }

  getSentimentScore(score) {
    if (score < -0.75) {
      return ['Very Negative', score.toFixed(2)]
    }
    if (score < -0.3) {
      return ['Negative', score.toFixed(2)]
    }
    if (score < -0.05) {
      return ['Slightly Negative', score.toFixed(2)]
    }
    if (score < 0.05) {
      return ['Neutral', score.toFixed(2)]
    }
    if (score < 0.3) {
      return ['Slightly Positive', score.toFixed(2)]
    }
    if (score < 0.75) {
      return ['Positive', score.toFixed(2)]
    }
    if (score <= 1) {
      return ['Very Positive', score.toFixed(2)]
    }
  }

  getMagnitude(magnitude) {
    if (magnitude < 2) {
      return ['Very Low', magnitude.toFixed(2)]
    }
    if (magnitude < 5) {
      return ['Low', magnitude.toFixed(2)]
    }
    if (magnitude < 10) {
      return ['Medium', magnitude.toFixed(2)]
    }
    if (magnitude < 15) {
      return ['Medium-high', magnitude.toFixed(2)]
    }
    if (magnitude < 25) {
      return ['High', magnitude.toFixed(2)]
    }
    if (magnitude >= 25) {
      return ['Very High', magnitude.toFixed(2)]
    }
  }

  render() {
    const sentiment = this.getSentimentScore(this.props.form.score) || [];
    const magnitude = this.getMagnitude(this.props.form.magnitude) || [];
    if (this.props.form) {
      return (
        <div className="card" id="sentimentCard">
          <div className="container">
            <div id="picContainer">
              <img
                src={this.props.form.profileBanner}
                alt="Twitter User Profile Banner"
                id="twitterProfBanner"
              />
              <img
                src={this.props.form.profileImg}
                alt="Twitter User Profile Picture"
                id="twitterProfPic"
              />
            </div>
            <div id="name">{this.props.form.name}</div>
            <span className="secondary, inlineBlock" id="screenName">
              @{this.props.form.screenName}
            </span>
            <span className="secondary, inlineBlock" id="location">
              <img src="/images/locationMarker.png" id="location" />
              {this.props.form.location}
            </span>
            <div id="score">
              Sentiment:{' '}
              <span className="secondary, inlineBlock">
                {sentiment[0]},
              </span>
              <span className="secondary, inlineBlock">
                {sentiment[1]}
              </span>
            </div>
            <div id="magnitude">
              Magnitude:{' '}
              <span className="secondary, inlineBlock">
                {magnitude[0]},
              </span>
              <span className="secondary, inlineBlock">
                {magnitude[1]}
              </span>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="card" id="sentimentCard">
          Analysis
        </div>
      )
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

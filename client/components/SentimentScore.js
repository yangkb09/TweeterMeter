import React from 'react'
import {connect} from 'react-redux'
import UserDoesNotExistErr from './storyset/UserDoesNotExistErr.js'
import NotAuthorizedErr from './storyset/NotAuthorizedErr.js'
import Survey from './storyset/Survey'

export class SentimentScore extends React.Component {
  constructor(props) {
    super(props)
    this.getSentimentScore = this.getSentimentScore.bind(this) //dont have to bind, can make funcs elsewhere and import - utility.js
    this.getMagnitude = this.getMagnitude.bind(this)
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
    if (magnitude < 20) {
      return ['Very Low', magnitude.toFixed(2)]
    }
    if (magnitude < 40) {
      return ['Low', magnitude.toFixed(2)]
    }
    if (magnitude < 60) {
      return ['Medium', magnitude.toFixed(2)]
    }
    if (magnitude < 80) {
      return ['Medium-high', magnitude.toFixed(2)]
    }
    if (magnitude < 100) {
      return ['High', magnitude.toFixed(2)]
    }
    if (magnitude >= 100) {
      return ['Very High', magnitude.toFixed(2)]
    }
  }

  render() {
    const sentiment = this.getSentimentScore(this.props.form.score) || []
    const magnitude = this.getMagnitude(this.props.form.magnitude) || []
    if (this.props.form === 'User does not exist') {
      return (
        <div className="card sentimentCard">
          <div className="container">
            Sorry, that user does not exist. Try a different handle!
            <div className="container storyset">
              <UserDoesNotExistErr />
            </div>
          </div>
        </div>
      )
    } else if (this.props.form === 'User is private') {
      return (
        <div className="card sentimentCard">
          <div className="container storyset">
            Sorry, that user's account is private. Try a different handle!
            <NotAuthorizedErr />
          </div>
        </div>
      )
    } else if (Object.keys(this.props.form).length > 0) {
      return (
        <div className="card sentimentCard">
          <div className="container">
            <div id="picContainer">
              <img
                src={this.props.form.profileImg}
                alt="Twitter User Profile Picture"
                id="twitterProfPic"
              />
              <img
                src={this.props.form.profileBanner}
                alt="Twitter User Profile Banner"
                id="twitterProfBanner"
              />
            </div>
            <div id="sentimentCardBasicInfo">
              <div id="name">{this.props.form.name}</div>
              <span className="secondary, inlineBlock" id="screenName">
                @{this.props.form.screenName}
              </span>
              {this.props.form.location ? (
                <span className="secondary, inlineBlock" id="location">
                  <img src="/images/locationMarker.png" id="location" />
                  {this.props.form.location}
                </span>
              ) : (
                <div />
              )}
            </div>
            <div id="sentimentCardAnalysis">
              <div id="score">
                Sentiment:{' '}
                <span className="secondary, inlineBlock">{sentiment[0]},</span>
                <span className="secondary, inlineBlock">{sentiment[1]}</span>
              </div>
              <div id="magnitude">
                Magnitude:{' '}
                <span className="secondary, inlineBlock">{magnitude[0]},</span>
                <span className="secondary, inlineBlock">{magnitude[1]}</span>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="card sentimentCard">
          <div className="container storyset">
            <Survey />
          </div>
        </div>
      )
    }
  }
}

const mapState = state => {
  return {
    form: state.form
  }
}

export default connect(mapState, null)(SentimentScore)

import React from 'react'
import TextForm from './TextForm'
import SentimentScore from './SentimentScore'
import Instructions from './Instructions'
import LoadingScreen from './LoadingScreen'
import {connect} from 'react-redux'

export class UserHome extends React.Component {
  render() {
    return (
      <div className="gridContainer">
        <div id="title">TweeterMeter</div>
        <img
          src="/images/twitterLogo.png"
          alt="White Twitter Logo"
          id="twitterLogo"
        />
        <Instructions />
        <TextForm />
        {this.props.isLoading ? <LoadingScreen /> : <SentimentScore />}
      </div>
    )
  }
}
const mapState = state => {
  return {
    isLoading: state.isLoading
  }
}

export default connect(mapState, null)(UserHome)

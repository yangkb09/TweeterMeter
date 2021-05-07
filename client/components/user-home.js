import React from 'react'
import {connect} from 'react-redux'
import TextForm from './TextForm'
import SentimentScore from './SentimentScore'

export const UserHome = () => {

  return (
    <div className="gridContainer">
      <div id="title">TweeterMeter</div>
      <img src="/images/twitterLogo.png" alt="White Twitter Logo" id="twitterLogo" />
      <TextForm />
      <SentimentScore />
    </div>
  )
}

export default connect(null)(UserHome)

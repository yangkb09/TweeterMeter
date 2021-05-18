import React from 'react'
import TextForm from './TextForm'
import SentimentScore from './SentimentScore'
import Instructions from './Instructions'
import LoadingRocket from './storyset/LoadingRocket'

export const UserHome = () => {
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
      <LoadingRocket />
      <SentimentScore />
    </div>
  )
}

export default UserHome

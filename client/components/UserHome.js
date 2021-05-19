import React from 'react'
import TextForm from './TextForm'
import SentimentScore from './SentimentScore'
import Instructions from './Instructions'
import LoadingScreen from './LoadingScreen'

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
      {/* <LoadingScreen /> */}
      <SentimentScore />
    </div>
  )
}

export default UserHome

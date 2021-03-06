import React from 'react'
import LoadingRocket from './storyset/LoadingRocket'

export const LoadingScreen = () => {
  return (
    <div className="card sentimentCard">
      <div className="container center medText">
        Hang on - hacking into the mainframe!
        <LoadingRocket />
      </div>
    </div>
  )
}

export default LoadingScreen

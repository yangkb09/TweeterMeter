import React from 'react'
import LoadingRocket from './storyset/LoadingRocket'

export const LoadingScreen = () => {
  return (
    <div className="card sentimentCard">
      <div className="container center">
        Hang on - hacking into the mainframe!
        <div className="storyset">
          <LoadingRocket />
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen

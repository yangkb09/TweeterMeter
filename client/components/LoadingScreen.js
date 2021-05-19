import React from 'react'
import LoadingRocket from './storyset/LoadingRocket'

export const LoadingScreen = () => {
  return (
    <div className="card">
      <div className="container">
        <LoadingRocket />
        Hang on - hacking into the mainframe!
      </div>
    </div>
  )
}

export default LoadingScreen

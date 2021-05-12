import React from 'react'
import {connect} from 'react-redux'

export const Instructions = () => {
  return (
    <div className="card" id="instructions">
      <div className="container">
        Gauge the sentiment of twitter users through machine learning!
        <ol className="smallText">
          <li>Enter a Twitter Handle</li>
          <li>Click "Analyze"</li>
          <li>Let results generate</li>
        </ol>
        {/* <div className="secondary">
          <div>
            Sentiment measures emotion on a scale from negative (-1.0) to positive (1.0)
          </div>
          <div>
            Magnitude measures strength of emotion from 0 to infinity
          </div>
        </div> */}
      </div>
    </div>
  )
}

export default connect(null)(Instructions)

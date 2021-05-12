import React from 'react'
import {connect} from 'react-redux'

export const Instructions = () => {
  return (
    <div className="card" id="instructions">
      <div className="container, medText">
        Gauge the sentiment of twitter users through machine learning!
        <ol className="smallText">
          <li>Enter a Twitter Handle</li>
          <li>Click "Analyze"</li>
          <li>Let results generate</li>
        </ol>
        <div className="smallText">
          Analysis:
          <ul>
            <li>
              Sentiment: emotion on a scale from negative (-1.0) to positive
              (1.0)
            </li>
            <li>Magnitude: strength of emotion from 0 to infinity</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default connect(null)(Instructions)

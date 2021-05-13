import React from 'react'

export const Instructions = () => {
  return (
    <div className="card" id="instructions">
      <div className="container, medText">
        Gauge the sentiment of Twitter users through machine learning!
        <ol className="smallText">
          <li>Enter a Twitter handle</li>
          <li>
            Click "<span id="blue">analyze</span>"
          </li>
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

export default Instructions

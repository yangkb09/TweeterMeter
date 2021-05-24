import React from 'react'

export const Instructions = () => {
  return (
    <div className="card" id="instructions">
      <div className="container, medText">
        Gauge the sentiment of Twitter users through machine learning!
        <ol>
          <li className="smallText">Enter a Twitter handle</li>
          <li className="smallText">
            Click "<span id="blue">analyze</span>"
          </li>
          <li className="smallText">View results</li>
        </ol>
        <div className="medText">
          Analysis:
          <ul>
            <li className="smallText">
              Sentiment: emotion on a scale from negative (-1.0) to positive
              (1.0)
            </li>
            <li className="smallText">
              Magnitude: strength of emotion from 0 to infinity
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Instructions

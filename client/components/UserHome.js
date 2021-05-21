import React from 'react'
import TextForm from './TextForm'
import SentimentScore from './SentimentScore'
import Instructions from './Instructions'
import LoadingScreen from './LoadingScreen'

import {connect} from 'react-redux'

// export const UserHome = () => {
//   return (
//     <div className="gridContainer">
//       <div id="title">TweeterMeter</div>
//       <img
//         src="/images/twitterLogo.png"
//         alt="White Twitter Logo"
//         id="twitterLogo"
//       />
//       <Instructions />
//       <TextForm />
//       <LoadingScreen />
//       <SentimentScore />
//     </div>
//   )
// }
// export default UserHome

export class UserHome extends React.Component {
  render() {
    console.log('PROPS FORM', this.props.form)
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
        {this.props.isLoading ? <LoadingScreen /> : <SentimentScore />}
      </div>
    )
  }
}
const mapState = state => {
  return {
    form: state.form,
    isLoading: state.isLoading
  }
}

export default connect(mapState, null)(UserHome)

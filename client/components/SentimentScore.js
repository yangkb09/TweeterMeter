import React from 'react'
import {connect} from 'react-redux'
import {_getScore} from '../store/form'

export class SentimentScore extends React.Component {
  componentDidMount() {
    this.props.getScore()
    // console.log('CDIDMOUNT this.props ', this.props)
    // console.log('CDIDMOUNT this.state ', this.state)
  }

  render() {
    // if (this.props.form[0]) {
    //   {console.log('THIS.PROPS: ', this.props)}
    //   {console.log('THIS.PROPS.FORM[0]: ', this.props.form[0])}
    //   return (
    //     <div className="card">
    //       Analysis
    //       {/* {console.log('RENDER this.props ', this.props)}
    //       {console.log('RENDER this.state ', this.state)} */}
    //       <div className="container">
    //         Score: {this.props.form[0].score}
    //         {/* {this.props.form.map(oneForm => {
    //           return (
    //             <div key={oneForm.id}>
    //               Score: {oneForm.score}
    //               magnitude: {oneForm.magnitude}
    //             </div>
    //           )
    //         })} */}
    //       </div>
    //     </div>
    //   )
    // } else {
    //   return <div>nothing here</div>
    // }
    if (this.props) {
      {console.log('THIS.PROPS: ', this.props)}
      {console.log('THIS.PROPS.FORM[0]: ', this.props.form[0])}
      return (
        <div className="card">
          Analysis
          {/* {console.log('RENDER this.props ', this.props)}
          {console.log('RENDER this.state ', this.state)} */}
          <div className="container">
            Score: {this.props.form.score}
            {/* {this.props.form.map(oneForm => {
              return (
                <div key={oneForm.id}>
                  Score: {oneForm.score}
                  magnitude: {oneForm.magnitude}
                </div>
              )
            })} */}
          </div>
        </div>
      )
    } else {
      return <div>nothing here</div>
    }
  }
}

const mapState = state => {
  return {
    score: state.score,
    form: state.form
  }
}

const mapDispatch = dispatch => {
  return {
    getScore: () => dispatch(_getScore())
  }
}

export default connect(mapState, mapDispatch)(SentimentScore)

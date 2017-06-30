import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import AskQuestion from 'material-ui/svg-icons/social/notifications-active'
import fetchBatches from '../../actions/batches/fetch'
import './AskQuestionButton.css'

class AskQuestionButton extends PureComponent {
  static propTypes = {
    batch: PropTypes.object,
  }


  askQuestion() {
    // const {
    //   batch,
    // } = this.props.params
    //
    // const students = batch.students.filter((student) => {
    //   if (student.assessments[0] === undefined ) {
    //     return null
    //   } else {
    //     return student.assessments[student.assessments.length-1].colourCode === 1 }
    //   })
    //   console.log(students)
  }


  render() {




    return (
      <div className="AskQuestionButton">
        <RaisedButton
          onClick={ this.askQuestion.bind(this) }
          label="Ask Question"
          primary={true}
          icon={<AskQuestion />} />
      </div>
    )
  }
}

const mapStateToProps = ({ batches }, { params }) => {
  //
  // const batch = batches.reduce((prev, batch) => {
  //   if (batch._id === params.batchId) {
  //     return batch
  //   }
  //   return prev
  // }, {})
  //
  // return {
  //   ...batch
  // }
}


export default connect(mapStateToProps, {})(AskQuestionButton)

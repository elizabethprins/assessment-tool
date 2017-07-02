import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Title from '../Title'
import StudentItem from './StudentItem'
import './BatchPage.css'
import fetchBatches from '../../actions/batches/fetch'
import getCurrentBatch from '../../actions/batches/get'
import CreateStudentButton from './CreateStudentButton'
import AskQuestionButton from './AskQuestionButton'


export class BatchPage extends PureComponent {
  static propTypes = {
    fetchBatches: PropTypes.func.isRequired,
    getCurrentBatch: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchBatches()
    const { batchId } = this.props.params
    console.log(batchId)
    this.props.getCurrentBatch(batchId)
  }

  renderStudent(student, index) {
    return <StudentItem key={(index)} { ...student }  />
  }

  render() {
    if (!this.props._id) return null

    const {
      _id,
      batchNumber,
      startDate,
      endDate,
      students,
      assessments,
    } = this.props
    //
    // const allAssessments = students.reduce(function(prev, current) {
    // return [...prev, current.assessments];
    // }, []);
    // const recentAssessments = allAssessments.map((array) => array[array.length-1])


    const theGreens = students.filter((student) => student.assessments[student.assessments.length-1].colourCode === 1 )
    const theYellows = students.filter((student) => student.assessments[student.assessments.length-1].colourCode === 2 )
    const theReds = students.filter((student) => student.assessments[student.assessments.length-1].colourCode === 3 )





// console.log("allAssessments", allAssessments)
// console.log("recentAssessments", recentAssessments)
console.log("red", theReds)
console.log("yellow", theYellows)
console.log("green", theGreens)




console.log("students", students)
    return(
      <div className="batches wrapper">
        <header>
          <Title content={`Batch #${batchNumber}`} />
          <div className="statusBar">
            <div className="green" />
            <div className="yellow" />
            <div className="red" />
          </div>
          <h3>{`${startDate} --- ${endDate}`}</h3>
          <AskQuestionButton /> <br />
          <CreateStudentButton />
        </header>
        <div className="container">
          { this.props.students.map(this.renderStudent.bind(this)) }
        </div>
      </div>
    )
  }
}


const mapStateToProps = ({ batches }, { params }) => {

  const batch = batches.reduce((prev, batch) => {
    if (batch._id === params.batchId) {
      return batch
    }
    return prev
  }, {})

  return {
    ...batch,
  }
}

export default connect(mapStateToProps, { getCurrentBatch, fetchBatches })(BatchPage)

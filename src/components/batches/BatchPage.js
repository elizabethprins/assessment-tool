import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Title from '../Title'
import StudentItem from './StudentItem'
import './BatchPage.css'
import fetchBatches from '../../actions/batches/fetch'
import CreateStudentButton from './CreateStudentButton'
import AskQuestionButton from './AskQuestionButton'


export class BatchPage extends PureComponent {
  static propTypes = {
    fetchBatches: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.fetchBatches()
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

    // const green = ( students.filter((student) => {
    //   if (!student.assessments.colourCode) return false
    //   return student.assessments.colourCode === 1
    // }).length)
    // console.log(green)
    // console.log(<StudentItem />)
    // const studentList = this.props.students.filter((student) => student._id === "5953df04e1d72f7dc94000f6" )

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
    ...batch
  }
}

export default connect(mapStateToProps, { fetchBatches })(BatchPage)

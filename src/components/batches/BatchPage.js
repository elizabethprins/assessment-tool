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


console.log(students)
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

  const batchId = params.batchId
  console.log(batchId)
  return {
    ...batch, batchId
  }

}

export default connect(mapStateToProps, { fetchBatches })(BatchPage)

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
    return <StudentItem key={index} { ...student }  />
  }




  render() {
    if (!this.props._id) return null

    const {
      _id,
      batchNumber,
      startDate,
      endDate,
      students,
    } = this.props



    return(

      <div className="batches wrapper">
        <header>
          <Title content={`Batch #${batchNumber}`} />
          <div className="statusBar" />
          <h3>{`${startDate} --- ${endDate}`}</h3>
          <AskQuestionButton /> <br />
          <CreateStudentButton />
        </header>
        <main>
          { this.props.students.map(this.renderStudent.bind(this)) }
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ batches }, { params }) => {
  const batch = batches.reduce((prev, next) => {
    if (next._id === params.batchId) {
      return next
    }
    return prev
  }, {})

  return {
    ...batch
  }
}

export default connect(mapStateToProps, { fetchBatches })(BatchPage)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Title from '../Title'
import './BatchesContainer.css'
import fetchBatches from '../../actions/batches/get'
import getCurrentBatch from '../../actions/batches/get'


export class StudentPage extends PureComponent {
  static propTypes = {
    getCurrentBatch: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
  }

  componentWillMount() {
    const batch = this.props.getCurrentBatch()
    console.log(batch)
  }



  render() {
    const { batch } = this.props

    console.log(batch)

    if (!batch) return null

    const {
      students
    } = this.props

      console.log(students)

      const student = students.find((student) => (
      student._id === this.props.params.studentId
    ))
    console.log(student)



    return(
      <div className="batches wrapper">
        <header>

          <p>Hello</p>

        </header>
        <main>

        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ batches, currentBatch }, { params }) => {
  const batch = batches.reduce((prev, next) => {
    if (next._id === params.batchId) {
      return next
    }
    return prev
  }, {})

  return {
    ...currentBatch
  }
}

export default connect(mapStateToProps, { fetchBatches, getCurrentBatch })(StudentPage)

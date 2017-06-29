import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Title from '../Title'
import './BatchesContainer.css'
import fetchBatches from '../../actions/batches/fetch'
import getCurrentBatch from '../../actions/batches/get'


export class StudentPage extends PureComponent {
  static propTypes = {
    student: PropTypes.object,
  }

  componentWillMount() {
    const batch = this.props.fetchBatches();
  }

  render() {
    const { student } = this.props

    console.log("batch STUDENT", student)

    return(
      <div className="batches wrapper">
        <header>

          <p>{student.firstName}</p>

        </header>
        <main>

        </main>
      </div>
    )
  }
}
  // <Link to={`batches/${this.props.batchId}`}/>
const mapStateToProps = ({batches}, {params}) => {
    if(!batches) return {}

    const student = batches.reduce( (obj, batch) => {
      const studentFilter = batch.students.filter((student) => student._id === params.studentId)

      if(studentFilter.length === 1) {
        return obj = studentFilter[0]
      }
      return obj;
    }, {});

    // const batchId = batches.reduce()
    return { student };
}

export default connect(mapStateToProps, { fetchBatches, getCurrentBatch })(StudentPage)

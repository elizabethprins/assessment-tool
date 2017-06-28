import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Title from '../Title'
import StudentItem from './StudentItem'
import './BatchesContainer.css'
import fetchBatches from '../../actions/batches/fetch'


export class StudentPage extends PureComponent {
  static propTypes = {
    fetchBatches: PropTypes.func.isRequired,
    students: PropTypes.array.isRequired,
  }

  componentWillMount() {
    this.props.fetchBatches()
  }

  renderStudent(student, index) {
    return <student key={index} { ...student }  />
  }


  render() {


    const {
      _id,
      batchNumber,
      startDate,
      endDate,
      students,
    } = this.props

      console.log(students)


    return(
      <div className="batches wrapper">
        <header>
          <Title content={`Batch #${batchNumber}`} />
          <h1></h1>

        </header>
        <main>

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

export default connect(mapStateToProps, { fetchBatches })(StudentPage)

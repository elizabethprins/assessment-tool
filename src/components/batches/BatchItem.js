// src/recipes/RecipeItem.js
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'


export class BatchItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    batchNumber: PropTypes.number.isRequired,
    startDate: PropTypes.instanceOf(Date).isRequired,
    endDate: PropTypes.instanceOf(Date).isRequired,
    students: PropTypes.array,
  }

  render() {
    const {
      _id,
      batchNumber,
      startDate,
      endDate,
      students,
    } = this.props


    return(
      <article className="batch">
          <h1>
            <Link to={`/batches/${_id}`}>Batch #{ batchNumber }</Link>
          </h1>
          <main>
            <p>{ students.length } students</p>
            <p>Starts on: { startDate }</p>
            <p>Ends on: { endDate }</p>
          </main>
      </article>
    )
  }
}

export default connect(null, {})(BatchItem)

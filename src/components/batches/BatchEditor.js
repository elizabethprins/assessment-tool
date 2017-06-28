import React, { PureComponent } from 'react'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'
import createBatch from '../../actions/batches/create'
import { showError } from '../../actions/loading'

import 'react-datepicker/dist/react-datepicker.css';
import './BatchEditor.css'


class BatchEditor extends PureComponent {
  constructor(props) {
    super()

    const { batchNumber, startDate, endDate, students } = props

    this.state = {
      batchNumber,
      startDate,
      endDate,
      students: [],
      errors: {},
    }
    this.handleChangeStart = this.handleChangeStart.bind(this)
    this.handleChangeEnd = this.handleChangeEnd.bind(this)
  }


  updateBatchNumber(event) {
    this.setState({
      batchNumber: this.refs.batchNumber.value
    })
  }

  handleChangeStart(date) {
    this.setState({
      startDate: date
    })
  }

  handleChangeEnd(date) {
    this.setState({
      endDate: date
    })
  }



  validate(batch) {
    const { batchNumber, startDate, endDate } = batch

    let errors = {}

    if (!batchNumber || batchNumber === '') errors.batchNumber = 'Enter a batch number'
    if (!startDate ) errors.startDate = 'Pick a date'
    if (!endDate ) errors.endDate = 'Pick a date'
    if (endDate < startDate) errors.endDate = 'Impossible time frame'

    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  saveBatch() {
    const {
      batchNumber,
      startDate,
      endDate,
    } = this.state

    const batch = {
      batchNumber,
      startDate,
      endDate,
      students: [],
    }

    if (this.validate(batch)) {
      this.props.createBatch(batch)
        this.props.router.push('/')
    }
  }

  render() {
    const { errors } = this.state

    return (
      <div className="editor">
        <input
          type="number"
          ref="batchNumber"
          className="batchNumber"
          placeholder="Batch Number"
          defaultValue={this.state.batchNumber}
          onChange={this.updateBatchNumber.bind(this)}
          onKeyDown={this.updateBatchNumber.bind(this)} />

        { errors.batchNumber && <p className="error">{ errors.batchNumber }</p> }

        <DatePicker
          placeholderText="Select Start Date"
          selected={this.state.startDate}
          selectsStart
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeStart}
          />

        { errors.startDate && <p className="error">{ errors.startDate }</p> }

        <DatePicker
          placeholderText="Select End Date"
          selected={this.state.endDate}
          selectsEnd
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          onChange={this.handleChangeEnd}
          />

        { errors.endDate && <p className="error">{ errors.endDate }</p> }

        <div className="actions">
          <button className="primary" onClick={this.saveBatch.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})
export default connect(mapStateToProps, { createBatch, showError })(BatchEditor)

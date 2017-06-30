import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import DatePicker from 'react-datepicker'
import RaisedButton from 'material-ui/RaisedButton'
import Save from 'material-ui/svg-icons/navigation/check'
import SaveAndNext from 'material-ui/svg-icons/navigation/last-page'

import AssessmentItem from './AssessmentItem'
import Title from '../Title'
import './StudentPage.css'
import fetchBatches from '../../actions/batches/fetch'
import createBatch from '../../actions/batches/create'
import { showError } from '../../actions/loading'


export class StudentPage extends PureComponent {
  static propTypes = {
    student: PropTypes.object,
    batch: PropTypes.object,
  }

  constructor(props) {
    super()

    const { remarks } = props

    this.state = {
      remarks,
      errors: {},
    }
  }


  componentWillMount() {
    const batch = this.props.fetchBatches();
    console.log(batch)
  }

  updateRemarks(event) {
    this.setState({
      remarks: this.refs.remarks.value
    })
  }

  handleChange(date) {
    this.setState({
      date: this.refs.date.value
    })
  }

  validate(assessment) {
    const {remarks } = assessment
    let errors = {}
    if (!remarks || remarks === '') errors.remarks = 'Write something'

    this.setState({
      errors,
    })
    return Object.keys(errors).length === 0
  }

  saveAssessment() {
    const {
      remarks,
    } = this.state

    const assessment = {
      remarks,
    }

    if (this.validate(assessment)) {
      this.props.createBatch(assessment)
    }
  }


  renderAssessment(assessment, index) {
    return <AssessmentItem key={(index)} { ...assessment }  />
  }

  render() {
    const { errors } = this.state
    const { student, batch } = this.props
      console.log(batch)
      console.log(student)
    const assessments = student.assessments

    if (!assessments) return null

    return(
      <div className="student wrapper">
        <header>
          <Title content={`${student.firstName} ${student.lastName}`} />
        </header>
        <article className="student">
          <div className="colorPicker">
            <div className={`colourPicker pop-3`} />
            <div className={`colourPicker pop-2`} />
            <div className={`colourPicker pop-1`} />
            <h1>Pick a color for {student.firstName}!</h1>
          </div>
          <img className="image" src={student.imageURL} alt="Profile Pic" />

          <div>
            <RaisedButton className="button"
              label="Save and Next"
              primary={true}
              icon={<SaveAndNext />} />
            <RaisedButton className="button"
              label="Save"
              primary={true}
              icon={<Save />}
              onClick={this.saveAssessment.bind(this)} />
          </div>

          <div className="remarks">
            <input
              type="text"
              ref="remarks"
              className="remarks"
              placeholder="Write some remarks..."

              onChange={this.updateRemarks.bind(this)}
              onKeyDown={this.updateRemarks.bind(this)} />

              { errors.remarks && <p className="error">{ errors.remarks }</p> }

            <DatePicker placeholderText="Pick a date"
              onChange={this.handleChange} />
          </div>
        </article>

        <article className="student">
          <h1>Past Assessments</h1>
          { assessments.map(this.renderAssessment.bind(this)) }
        </article>
      </div>
    )
  }
}
  // <Link to={`batches/${this.props.batchId}`}/>
const mapStateToProps = ({batches}, {params}) => {
    if(!batches) return {}

    const student = batches.reduce((obj, batch) => {
      const studentFilter = batch.students.filter((student) => student._id === params.studentId)

      if(studentFilter.length === 1) {
        return obj = studentFilter[0]
      }
      return obj;

    }, {});


//     const batchId = batches.reduce((obj, batch) => {
//
//       const batchFilter = batches.filter((batchId) => batch._id === params.batchId)
// console.log(batchFilter)
//     //   if (batch._id === params.batchId) {
//     //     return batch
//     //   }
//     //   return prev
//     // }, {})
//     //
//     // return {
//     //   ...batch
//   }, {})


    return { student };
}

export default connect(mapStateToProps, { fetchBatches })(StudentPage)

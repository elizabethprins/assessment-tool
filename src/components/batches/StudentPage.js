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


export class StudentPage extends PureComponent {
  static propTypes = {
    student: PropTypes.object,
  }

  componentWillMount() {
    const batch = this.props.fetchBatches();
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

  renderAssessment(assessment, index) {
    return <AssessmentItem key={(index)} { ...assessment }  />
  }

  render() {
    const { student } = this.props

    const assessments = student.assessments
    console.log("batch STUDENT", student)
    console.log("Assessments", assessments)
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
              icon={<Save />} />
          </div>

          <div className="remarks">
            <input
              type="text"
              ref="remarks"
              className="remarks"
              placeholder="Write some remarks..."

              onChange={this.updateRemarks.bind(this)}
              onKeyDown={this.updateRemarks.bind(this)} />

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

export default connect(mapStateToProps, { fetchBatches })(StudentPage)

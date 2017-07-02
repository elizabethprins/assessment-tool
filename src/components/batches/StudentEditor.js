import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import joinBatch from '../../actions/batches/join'
import getCurrentBatch from '../../actions/batches/get'
import { showError } from '../../actions/loading'
import './BatchEditor.css'


class StudentEditor extends PureComponent {
  constructor(props) {
    super()

    const { firstName, lastName, imageURL } = props

    this.state = {
      firstName,
      lastName,
      imageURL,
      errors: {},
    }
  }

  updateFirstName(event) {
    this.setState({
      firstName: this.refs.firstName.value
    })
  }

  updateLastName(event) {
    this.setState({
      lastName: this.refs.lastName.value
    })
  }

  updateImageURL(event) {
    this.setState({
      imageURL: this.refs.imageURL.value
    })
  }



  validate(student) {
    const { firstName, lastName, imageURL } = student

    let errors = {}

    if (!firstName || firstName === '') errors.firstName = 'Enter a first name'
    if (!lastName || lastName === '') errors.lastName = 'Enter a last name'


    this.setState({
      errors,
    })

    return Object.keys(errors).length === 0
  }

  saveStudent() {
    const { firstName, lastName, imageURL} = this.state
    const batchId = this.props.currentBatch._id
    const student = { firstName, lastName, imageURL, batchId }
    const { currentBatch } = this.props
    console.log(currentBatch._id)
    this.props.joinBatch(currentBatch._id, { student })

    // if (this.validate(student)) {
    //   this.props.joinBatch(currentBatch._id, student)
    // }
  }

  render() {
    console.log(this.props)
    const { errors } = this.state

    return (
      <div className="editor">
        <input
          type="string"
          ref="firstName"
          className="firstName"
          placeholder="First Name"
          defaultValue={this.state.firstName}
          onChange={this.updateFirstName.bind(this)}
          onKeyDown={this.updateFirstName.bind(this)} />

        { errors.firstName && <p className="error">{ errors.firstName }</p> }

        <input
          type="string"
          ref="lastName"
          className="lastName"
          placeholder="Last Name"
          defaultValue={this.state.lastName}
          onChange={this.updateLastName.bind(this)}
          onKeyDown={this.updateLastName.bind(this)} />

        { errors.lastName && <p className="error">{ errors.lastName }</p> }

        <input
          type="string"
          ref="imageURL"
          className="imageURL"
          placeholder="Image URL"
          defaultValue={this.state.imageURL}
          onChange={this.updateImageURL.bind(this)}
          onKeyDown={this.updateImageURL.bind(this)} />

        { errors.imageURL && <p className="error">{ errors.imageURL }</p> }

        <div className="actions">
          <button className="primary" onClick={this.saveStudent.bind(this)}>Save</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, currentBatch }) => ({
  signedIn: !!currentUser && !!currentUser._id,
  currentBatch
})
export default connect(mapStateToProps, { joinBatch, showError })(StudentEditor)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import RaisedButton from 'material-ui/RaisedButton'
import AskQuestion from 'material-ui/svg-icons/social/notifications-active'
import './CreateBatchButton.css'

class CreateStudentButton extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
  }

  render() {
    if (!this.props.signedIn) return null

    return (
      <div className="CreateStudentButton">
        <Link to="/create-student">
          <RaisedButton
            label="Ask Question"
            primary={true}
            icon={<AskQuestion />} />
        </Link>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps)(CreateStudentButton)

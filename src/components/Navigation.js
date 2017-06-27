import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import signOut from '../actions/user/sign-out'
import signIn from '../actions/user/sign-in'
import AppBar from 'material-ui/AppBar'
import IconButton from 'material-ui/IconButton'
import Assessment from 'material-ui/svg-icons/action/assessment'
import FlatButton from 'material-ui/FlatButton'

class Navigation extends PureComponent {
  static propTypes = {
    signedIn: PropTypes.bool,
    push: PropTypes.func.isRequired,
    signOut: PropTypes.func.isRequired,
  }

  goHome = () => {
    this.props.push('/')
  }

  render() {
    const { signedIn, signOut } = this.props
    return (
      <AppBar
        title="Student Assessments"
        iconElementLeft={<IconButton onClick={this.goHome}><Assessment /></IconButton>}
        iconElementRight={signedIn ?
          <FlatButton label="Sign out" onClick={signOut} /> :
          <FlatButton label="Sign in" onClick={signIn} />
        }
      />
    )
  }
}

const mapStateToProps = ({ currentUser }) => ({
  signedIn: !!currentUser && !!currentUser._id,
})

export default connect(mapStateToProps, { push, signOut })(Navigation)

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import AskQuestion from 'material-ui/svg-icons/social/notifications-active'
import fetchBatches from '../../actions/batches/fetch'
import './AskQuestionButton.css'

class AskQuestionButton extends PureComponent {
  static propTypes = {
    batch: PropTypes.object,
  }

  // state = {
  //   open: false,
  // };
  //
  // handleOpen = () => {
  //   this.setState({open: true});
  // };
  //
  // handleClose = () => {
  //   this.setState({open: false});
  // };


  askQuestion() {
    const { batch } = this.props

    const theGreens = batch.students.filter((student) => student.assessments[student.assessments.length-1].colourCode === 1 )
    const theYellows = batch.students.filter((student) => student.assessments[student.assessments.length-1].colourCode === 2 )
    const theReds = batch.students.filter((student) => student.assessments[student.assessments.length-1].colourCode === 3 )

    const randomNumber = Math.floor((Math.random() * 100) + 1);

    if (randomNumber <= 50) {
      const luckyRed = Math.floor(Math.random() * theReds.length)
      alert(`Ask ${theReds[luckyRed].firstName} ${theReds[luckyRed].lastName} a question!`)
    }
    if (randomNumber > 50 && randomNumber <= 83) {
      const luckyYellow = Math.floor(Math.random() * theYellows.length)
      alert(`Ask ${theYellows[luckyYellow].firstName} ${theYellows[luckyYellow].lastName} a question!`)
    }
    if (randomNumber > 83) {
      const luckyGreen = Math.floor(Math.random() * theGreens.length)
      alert(`Ask ${theGreens[luckyGreen].firstName} ${theGreens[luckyGreen].lastName} a question!`)
    }
  }



  render() {

  //   const actions = [
  //     <FlatButton
  //       label="Done"
  //       primary={true}
  //       onTouchTap={this.handleClose}
  //     />,
  //     <FlatButton
  //       label="Next Student"
  //       primary={true}
  //       keyboardFocused={true}
  //       onTouchTap={this.handleClose}
  //     />,
  //   ];
  //
  //   return (
  //     <div className="AskQuestionButton">
  //       <RaisedButton
  //         label="Ask Question"
  //         primary={true}
  //         icon={<AskQuestion />}
  //         onTouchTap={this.handleOpen} />
  //       <Dialog
  //         title="Ask a random student!"
  //         actions={actions}
  //         modal={false}
  //         open={this.state.open}
  //         onRequestClose={this.handleClose}
  //       >
  //       <div>
  //     { this.askQuestion.bind(this) }
  //       </div>
  //       </Dialog>
  //     </div>
  //   );
  // }


    return (
      <div className="AskQuestionButton">
        <RaisedButton
          onClick={ this.askQuestion.bind(this) }
          label="Ask Question"
          primary={true}
          icon={<AskQuestion />} />
      </div>
    )
  }
}

const mapStateToProps = ({ currentBatch }) => ({
  batch: currentBatch,
})

export default connect(mapStateToProps, {})(AskQuestionButton)

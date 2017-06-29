import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import './AssessmentItem.css'


export class AssessmentItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    colourCode: PropTypes.number.isRequired,
    remarks: PropTypes.string,
  }

  render() {
    const {
      _id,
      date,
      colourCode,
      remarks,
    } = this.props


    return(

<div>
    <div className={`colourCoder pip-${colourCode}`} />
      <menu>
        <p>{`${remarks}`}</p>
        <p>{`${date}`}</p>
        <hr />

      </menu>
</div>
    )
  }
}

export default connect(null, {})(AssessmentItem)

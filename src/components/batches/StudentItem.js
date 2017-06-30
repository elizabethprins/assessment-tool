import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import './StudentItem.css'


export class StudentItem extends PureComponent {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    imageURL: PropTypes.string.isRequired,
    assessments: PropTypes.array,
  }

  render() {
    const {
      _id,
      firstName,
      lastName,
      imageURL,
      assessments,
    } = this.props


    return(
      <article className="batch">
          <Link to={`/students/${_id}`}>
            <img className="image" src={imageURL} alt="Profile Pic" />
            <h1>{`${firstName} ${lastName}`}</h1>
          </Link>
          <div className={`colourCode pop-${assessments[assessments.length-1].colourCode}`} />
          <main>
            <p>{`${assessments[assessments.length-1].remarks}`}</p>
          </main>
      </article>

    )
  }
}

export default connect(null, {})(StudentItem)

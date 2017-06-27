import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import BatchItem from './BatchItem'
import './BatchesContainer.css'
import fetchBatches from '../../actions/batches/fetch'
import subscribeToBatchesService from '../../actions/batches/subscribe'
import CreateBatchButton from './CreateBatchButton'

export class BatchesContainer extends PureComponent {
  static propTypes = {
    batches: PropTypes.array.isRequired,
    fetchBatches: PropTypes.func.isRequired,
    subscribeToBatchesService: PropTypes.func.isRequired,
    signedIn: PropTypes.bool,
  }

  componentWillMount() {
    this.props.fetchBatches()
    this.props.subscribeToBatchesService()
  }

  renderBatch(batch, index) {
    return <BatchItem key={index} { ...batch }  />
  }


  render() {
    if (!this.props.signedIn) return null

    return(
      <div className="batches wrapper">
        <header>
          <CreateBatchButton />
        </header>
        <main>
          { this.props.batches.map(this.renderBatch.bind(this)) }
        </main>
      </div>
    )
  }
}

const mapStateToProps = ({ currentUser, batches }) => ({
  signedIn: !!currentUser && !!currentUser._id,
  batches })

export default connect(mapStateToProps, {
  fetchBatches, subscribeToBatchesService
})(BatchesContainer)
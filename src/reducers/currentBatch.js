import { GOT_BATCH } from '../actions/batches/get'
import { JOINED_BATCH } from '../actions/batches/join'

export default (state = null, { type, payload } = {}) => {
  switch (type) {
    case JOINED_BATCH :
    case GOT_BATCH :
      return payload._id

    default :
      return state
  }
}

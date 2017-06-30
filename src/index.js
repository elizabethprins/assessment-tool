// src/index.js
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute } from 'react-router'
import store, { history } from './store'
import registerServiceWorker from './registerServiceWorker'
import injectTapEventPlugin from 'react-tap-event-plugin'

import App from './App'
import SignIn from './components/users/SignIn'
import BatchesContainer from './components/batches/BatchesContainer'
import BatchPage from './components/batches/BatchPage'
import StudentPage from './components/batches/StudentPage'
import BatchEditor from './components/batches/BatchEditor'
import StudentEditor from './components/batches/StudentEditor'

import './index.css'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
    <Route path="/" component={App}>
      <IndexRoute component={BatchesContainer} />
      <Route path="/sign-in" component={SignIn} />
      <Route path="/create-batch" component={BatchEditor} />
      <Route path="/add-student" component={StudentEditor} />
      <Route path="/batches/:batchId" component={BatchPage} />
      <Route path="/students/:studentId" component={StudentPage} />
    </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)

registerServiceWorker();

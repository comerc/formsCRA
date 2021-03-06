import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import thunk from 'redux-thunk'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import createLogger from 'redux-logger'
import { useScroll } from 'react-router-scroll'

import reducer from './ducks'
import routes from './routes'

import './index.css'

const logger = createLogger()
const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk, logger)))
const history = syncHistoryWithStore(browserHistory, store)
const render = applyRouterMiddleware(useScroll())

// TODO пока react-router-redux & react-router-scroll зависят от react-router v3

// TODO подключить SSR через react-router-redux-middleware

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} routes={routes} render={render}/>
  </Provider>,
  document.getElementById('root')
)

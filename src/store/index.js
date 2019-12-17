import { createStore, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import messages from "./modules/messages"

import createHistory from 'history/createBrowserHistory'
import thunk from 'redux-thunk'

// if (process.env.NODE_ENV === 'development') {
//   const devToolsExtension = window.devToolsExtension;

//   if (typeof devToolsExtension === 'function') {
//     enhancers.push(devToolsExtension());
//   }
// }

const history = createHistory({})

// Build the middleware for intercepting and dispatching navigation actions


const store = createStore(
  combineReducers({
    messages,
    router: routerReducer
  })
)

export default store
export {
	history
}

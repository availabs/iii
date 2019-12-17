import React from 'react'
import { hydrate, render } from 'react-dom'

import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'

import store, { history } from './store'
import App from './App';

import registerServiceWorker from './registerServiceWorker';

const rootElement = document.getElementById('root')

const app =
	<Provider store={store}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
	</Provider>

if (rootElement.hasChildNodes()) {
	hydrate(app, rootElement);
}
else {
	render(app, rootElement);
}

registerServiceWorker();

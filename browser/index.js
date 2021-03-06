import React from 'react';
import ReactDOM from 'react-dom';

import store from './store';
import { Provider } from 'react-redux';
import Routes from './routes';

import '../public/index.scss';

ReactDOM.render(
	<Provider store={ store } >
		<Routes />
	</Provider>,
	document.getElementById('app'));

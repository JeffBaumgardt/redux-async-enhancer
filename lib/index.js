var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { combineReducers } from 'redux';

export function asyncStoreEnhancer() {
	let asyncReducers = {};

	const makeRootReducer = (reducers, asyncReducers) => {
		return combineReducers(_extends({}, reducers, asyncReducers));
	};

	return next => (reducers, initialState, enchancer) => {
		const store = next(reducers, initialState, enchancer);

		function injectReducer(key, reducer) {
			if (!store.asyncReducers[key]) {
				store.asyncReducers[key] = reducer;
				store.replaceReducer(makeRootReducer(reducers, store.asyncReducers));
			}
		}

		return _extends({}, store, {
			injectReducer,
			asyncReducers
		});
	};
}
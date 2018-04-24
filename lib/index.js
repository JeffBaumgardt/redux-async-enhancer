var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

import { combineReducers } from 'redux';

let asyncReducers = {};
export function asyncStoreEnhancer(initReducers) {
	const makeRootReducer = asyncReducers => {
		return combineReducers(_extends({}, initReducers, asyncReducers));
	};

	return next => (reducers, initialState, enchancer) => {
		const store = next(reducers, initialState, enchancer);

		function injectReducer(key, reducer) {
			if (!asyncReducers[key]) {
				asyncReducers[key] = reducer;
				store.replaceReducer(makeRootReducer(asyncReducers));
				store.dispatch({ type: '@@redux-async-enhancer/injectReducer' });
			}
		}

		return _extends({}, store, {
			injectReducer,
			asyncReducers
		});
	};
}
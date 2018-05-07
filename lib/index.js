'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.asyncStoreEnhancer = asyncStoreEnhancer;

var _redux = require('redux');

var asyncReducers = {};
function asyncStoreEnhancer(initReducers) {
	var makeRootReducer = function makeRootReducer(asyncReducers) {
		return (0, _redux.combineReducers)(_extends({}, initReducers, asyncReducers));
	};

	return function (next) {
		return function (reducers, initialState, enchancer) {
			var store = next(reducers, initialState, enchancer);

			function injectReducer(key, reducer) {
				if (!asyncReducers[key]) {
					asyncReducers[key] = reducer;
					store.replaceReducer(makeRootReducer(asyncReducers));
					store.dispatch({ type: '@@redux-async-enhancer/injectReducer' });
				}
			}

			return _extends({}, store, {
				injectReducer: injectReducer,
				asyncReducers: asyncReducers
			});
		};
	};
}
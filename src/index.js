// @flow

import { combineReducers } from 'redux'
import type { Reducer, StoreEnhancer } from 'redux'

let asyncReducers = {}
export function asyncStoreEnhancer<S, A, D>(initReducers: ?Object) {
	const makeRootReducer = (asyncReducers: Object) => {
		return combineReducers({
			...initReducers,
			...asyncReducers
		})
	}

	return (next: function) => (reducers: Reducer<S, A>, initialState: S, enchancer: StoreEnhancer<S, A, D>) => {
		const store = next(reducers, initialState, enchancer)

		function injectReducer(key, reducer) {
			if (!asyncReducers[key]) {
				asyncReducers[key] = reducer
				store.replaceReducer(makeRootReducer(asyncReducers))
				store.dispatch({ type: '@@redux-async-enhancer/injectReducer' })
			}
		}

		return {
			...store,
			injectReducer,
			asyncReducers
		}
	}
}

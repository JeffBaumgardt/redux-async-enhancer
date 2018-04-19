import { combineReducers } from 'redux'

let asyncReducers = {}
export function asyncStoreEnhancer(initReducers) {

	const makeRootReducer = (asyncReducers) => {
		return combineReducers({
			...initReducers,
			...asyncReducers
		})
	}

	return next => (reducers, initialState, enchancer) => {
		const store = next(reducers, initialState, enchancer)

		function injectReducer(key, reducer) {
			if (!asyncReducers[key]) {
				asyncReducers[key] = reducer
				store.replaceReducer(makeRootReducer(asyncReducers))
			}
		}

		return {
			...store,
			injectReducer,
			asyncReducers
		}
	}
}

import { combineReducers } from 'redux'

export function asyncStoreEnhancer() {
	let asyncReducers = {}

	const makeRootReducer = (reducers, asyncReducers) => {
		return combineReducers({
			...reducers,
			...asyncReducers
		})
	}

	return (next) => (reducers, initialState, enchancer) => {
		const store = next(reducers, initialState, enchancer)

		function injectReducer(key, reducer) {
			if (!store.asyncReducers[key]) {
				store.asyncReducers[key] = reducer
				store.replaceReducer(makeRootReducer(reducers, store.asyncReducers))
			}
		}

		return {
			...store,
			injectReducer,
			asyncReducers
		}
	}
}

import { combineReducers } from 'redux'

export function asyncStoreEnhancer() {
	let asyncReducers = {}

	const makeRootReducer = (reducers, asyncReducers) => {
		return combineReducers({
			...reducers,
			...asyncReducers
		})
	}

	return next => (reducers, initialState, enchancer) => {
		const store = next(reducers, initialState, enchancer)

		function injectReducer(nextStore, key, reducer) {
			if (!nextStore.asyncReducers[key]) {
				nextStore.asyncReducers[key] = reducer
				nextStore.replaceReducer(makeRootReducer(reducers, nextStore.asyncReducers))
				console.log('this store', nextStore)
			}
		}

		return {
			...store,
			injectReducer,
			asyncReducers
		}
	}
}

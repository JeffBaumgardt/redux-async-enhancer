# redux-async-enhancer
Store enhancer for https://github.com/reactjs/redux which allows asynchronously inject reducers.

## The problem
Redux reducers are usually all registered up front. Usually this is ok but sometimes for code splitting purposes or just not loading admin reducers for regular users we want to register the reducers after the fact.

## This solution
Redux-async-enhancer is a store enhancer that allows you to inject reducers asynchronously at run time.

## Table of contents
* [Installation](#installation)
* [Usage](#usage)
* [Inspiration](#inspiration)
* [Other Solutions](#other-solutions)
* [License](#license)

## Installation
```cli
npm install --save redux-async-enhancer
```

## Usage
The `asyncStoreEnhancer` store enhancer is added onto `createStore`. The enhancer needs the root reducers as an argument. Reducers are added once per key and cached after that.
```javascript
import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import { asyncStoreEnhancer } from 'redux-async-enhancer'
import reducers from './reducers'

const rootReducer = combineReducers(reducers)

const enhancer = compose(
  applyMiddleware(...middleware),
  asyncStoreEnhancer(reducers)
)

const store = createStore(rootReducer, initialState, enhancer)

// inject a reducer
store.injectReducer('reducerName', (state = {}, action) => {
  // reducer
  return state
})
```

## Inspiration
I got this idea from [Dan Abramov's](https://twitter.com/dan_abramov) answer to a [Stack Overflow Question](https://stackoverflow.com/questions/32968016/how-to-dynamically-load-reducers-for-code-splitting-in-a-redux-application/33044701#33044701) about dynamically loading reducers for code splitting.

## Other Solutions
None that I know ok. Please [make a pull request](http://makeapullrequest.com) and add it.

## License
MIT

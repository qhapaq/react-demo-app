import { createStore, compose, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import { fromJS } from 'immutable'
import rootSagas, { rootReducers } from '../reducers';
import createSagaMiddleware from 'redux-saga'

const sagaMiddleware = createSagaMiddleware()

export default function configureStore(initialState = {}, history) {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history)
  ]

  const enhancers = [
    applyMiddleware(...middlewares)
  ]

  const store = createStore(
    rootReducers,
    fromJS(initialState),
    compose(...enhancers)
  )

  sagaMiddleware.run(rootSagas)
  store.asyncReducers = {}
  return store
}

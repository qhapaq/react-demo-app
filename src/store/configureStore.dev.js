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

  const composeEnhancers =
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose

  const store = createStore(
    rootReducers,
    fromJS(initialState),
    composeEnhancers(...enhancers)
  )

  //store.runSaga = sagaMiddleware.run
  sagaMiddleware.run(rootSagas)
  store.asyncReducers = {}

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      import('../reducers').then((reducerModule) => {
        const createReducers = reducerModule.default;
        const nextReducers = createReducers(store.asyncReducers);

        store.replaceReducer(nextReducers);
      });
    });
  }
  return store
}

import { combineReducers } from 'redux-immutable'
import { routerReducer } from 'react-router-redux'
import { reducer as formReducer } from 'redux-form/immutable'
import { all } from 'redux-saga/effects'

import userReducer, { userSagas } from './userReducer'
import notificationReducer, { notificationSagas } from './notificationReducer'
import ticketsReducer, { ticketsSagas } from './ticketsReducer'


export const rootReducers = combineReducers({
  route: routerReducer,
  form: formReducer,
  user: userReducer,
  notification: notificationReducer,
  tickets: ticketsReducer
})

export default function* rootSaga() {
  yield all([
    ...userSagas,
    ...notificationSagas,
    ...ticketsSagas,
  ])
}
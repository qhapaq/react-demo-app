import { fromJS } from 'immutable'
import { createAction, handleActions } from 'redux-actions'
import { put, takeEvery } from 'redux-saga/effects'

// AppConstants
export const types = {
  ADD: 'app/NOTIFICATIONS/ADD',
  ADD_SUCCESS: 'app/NOTIFICATIONS/ADD_SUCCESS',
  DELETE: 'app/NOTIFICATIONS/DELETE',
  DELETE_SUCCESS: 'app/NOTIFICATIONS/DELETE_SUCCESS'
}

// AppActions
export const actions = {
  addNotification: createAction(types.ADD),
  deleteNotification: createAction(types.DELETE)
}

const initialState = fromJS([])

// AppReducer
export default handleActions(
  {
    [types.ADD_SUCCESS]: (state, action) => state.push(fromJS(action.notification)),
    [types.DELETE_SUCCESS]: (state, action) => state.filter(item =>  item.get('id') !== action.id)
  },
  initialState
)

// redux-saga
function* addNotificationSaga({notification}) {
  const data = {
    id: new Date().getTime(),
    status: 'default',
    dismissAfter: 5000,
    allowHTML: false,
    ...notification
  }
  yield put({type: types.ADD_SUCCESS, notification: data})
}
function* deleteNotificationSaga({payload}) {
  yield put({type: types.DELETE_SUCCESS, id: payload})
}

export const notificationSagas = [
  takeEvery(types.ADD, addNotificationSaga),
  takeEvery(types.DELETE, deleteNotificationSaga)
]
import { call, put, select } from 'redux-saga/effects'

import * as ApiUser from '../api/userApi'
import reducerOptions, {createSaga} from '../helpers/reducerOptions'
import store from '../helpers/localStore'

const { types, actions, handleActions } = reducerOptions({
  model: 'user',
  types: [
    { name: 'auth' },
    { name: 'session' },
    { name: 'login' },
    { name: 'recover' }
  ]
})

export { types, actions }
export default handleActions

const getUserAuthState = (state) => state.getIn(['user','auth','response'])

// redux-saga
const authUserSaga = createSaga({ types, action: 'auth', invoke: [ApiUser.auth]})
const sessionUserSaga = createSaga({ types, action: 'session', invoke: function* (payload){
  let response = yield call(ApiUser.session)
  const authState = yield select(getUserAuthState)
  if (!authState){
    response = yield call(ApiUser.auth)
    yield put({type: types.AUTH_SUCCESS, response: response})
  }
  yield put({type: types.SESSION_SUCCESS})
}})

const loginUserSaga = createSaga({ types, action: 'login', invoke: function* (payload){
  const response = yield call(ApiUser.login, payload)
  //save token localstore
  store.add('token', response.token)
  yield put({type: types.AUTH_SUCCESS, response: response.auth})
  yield put({type: types.LOGIN_SUCCESS, response})
}})

const recoverUserSaga = createSaga({ types, action: 'recover', invoke: [ApiUser.recover]})

export const userSagas = [
  authUserSaga,
  sessionUserSaga,
  loginUserSaga,
  recoverUserSaga
]
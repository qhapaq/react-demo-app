import { fromJS } from 'immutable'
import { createAction, handleActions } from 'redux-actions'
import upperCase from 'lodash/upperCase'
import upperFirst from 'lodash/upperFirst'

import { serverError } from '../api'
import { call, put, takeEvery} from 'redux-saga/effects'
import STATUS from '../reducers/statusCode.json'
import { types as typesNotification } from '../reducers/notificationReducer'

export function createSaga({types, action, invoke}){
  const nextStep = function* (response){
    yield put({type: types[upperCase(action) + '_SUCCESS'], response: response})
    if (response.message) {
      yield put({type: typesNotification.ADD, notification: { message: response.message, status:'success'  } })
    }
  }
  const sagaFunction =  function* createSaga({payload}) {
    try {
      if (typeof invoke === 'function') {
        yield invoke(payload, nextStep)
      }else {
        if (payload) {
          invoke[1] = payload
        }
        const response = yield call(...invoke)
        yield call(nextStep, response)
      }
    } catch (er) {
      const error = serverError(er)

      if (payload.ignoreError) {
        yield put({type: types[upperCase(action) + '_SUCCESS']})
      }else {
        yield put({type: types[upperCase(action) + '_FAILURE'], error})
        yield put({type: typesNotification.ADD, notification: { message: error.result.message, status:'error'  } })
      }
    }
  }

  return takeEvery(types[upperCase(action) + '_REQUEST'], sagaFunction)
}

/*
{
  model: 'user',
  types: [
    { name: 'get' },
    { name: 'auth' }
  ]
}
*/
export default function (props) {
  let types = {}, actions = {}, reducers = {}, reducersName = {}
  for (let pi = 0, pl = props.types.length; pi < pl; pi++ ){
    let typeName = props.types[pi].name
    for(let stat in STATUS) {
      let name = `${upperCase(typeName)}_${stat}`

      //types
      types[name] = `app/${upperCase(props.model)}/${name}`
      //reducers
      switch (stat) {
        case STATUS.INITIAL:
          reducers[types[name]] = (state) => state
            .setIn([typeName, 'status'], STATUS.INITIAL)
            .setIn([typeName, 'statusText'], '')
            .setIn([typeName, 'response'], {})
          break
        case STATUS.REQUEST:
          reducers[types[name]] = (state) => state
            .setIn([typeName, 'status'], STATUS.REQUEST)
            .setIn([typeName, 'statusText'], '')
            //.setIn([typeName, 'response'], {})
          break
        case STATUS.SUCCESS:
          reducers[types[name]] = (state, action) => state
            .setIn([typeName, 'status'], STATUS.SUCCESS)
            .setIn([typeName, 'response'], action.response)
          break
        case STATUS.FAILURE:
          reducers[types[name]] = (state, action) => state
            .setIn([typeName, 'status'], STATUS.FAILURE)
            .setIn([typeName, 'statusText'], action.error)
          break
        default:
      }

    }

    //actions
    actions[`${typeName}${upperFirst(props.model)}`] = createAction(types[`${upperCase(typeName)}_${STATUS.REQUEST}`])
    if (props.types[pi].reset){
      actions[`${typeName}Reset${upperFirst(props.model)}`] = createAction(types[`${upperCase(typeName)}_${STATUS.INITIAL}`])
    }



    reducersName[typeName] = {}
  }
  return {
    types,
    actions,
    handleActions: handleActions( reducers, fromJS(reducersName))
  }
}
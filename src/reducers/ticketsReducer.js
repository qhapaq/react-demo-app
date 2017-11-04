import { put, call } from 'redux-saga/effects'
import * as ticketsApi from '../api/ticketsApi'
import reducerOptions, {createSaga} from '../helpers/reducerOptions'

const { types, actions, handleActions } = reducerOptions({
  model: 'tickets',
  types: [
    { name: 'list'},
    { name: 'save'},
  ]
})

export { types, actions }
export default handleActions


const ticketsListSaga = createSaga({ types, action: 'list', invoke: [ticketsApi.list]})
const ticketsSaveSaga = createSaga({ types, action: 'save', invoke: function* (payload, nextStep){
  const response = yield call(payload.id ? ticketsApi.save : ticketsApi.create, payload)
  //if (!payload.id || payload.closeId || payload.paidId){
    yield put({type: types.LIST_REQUEST})
  //}
  yield call(nextStep, response)
}})

export const ticketsSagas = [
  ticketsListSaga,
  ticketsSaveSaga,
]

import request from '../helpers/request'

export function* list(payload) {
  const req = yield request('GET', 'tickets')
  return req.body.result
}

export function* save(payload) {
  const req = yield request('PUT', 'tickets/update').send(payload)
  return req.body
}

export function* create(payload) {
  const req = yield request('POST', 'tickets/create').send(payload)
  return req.body
}
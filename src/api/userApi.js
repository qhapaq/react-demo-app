import request from '../helpers/request'

const b64EncodeUnicode = function b64EncodeUnicode(str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
      return String.fromCharCode('0x' + p1);
  }));
}

export function* session() {
  const req = yield request('GET', 'session')
  return req.body
}

export function* auth() {
  const req = yield request('POST', 'auth')
  return req.body.result
}

export function* login(values) {
  const req = yield request('POST', 'login')
  .set('Authorization', `Basic ${b64EncodeUnicode(values.username + ':' + values.password)}`)
  .send()
  return req.body.result
}

export function* recover(values) {
  const req = yield request('POST', 'user/recover').send(values)
  return req.body
}

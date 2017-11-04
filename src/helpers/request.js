import request from 'superagent'
import localStore from './localStore'

export default function (method, api, options = {}) {
  let req = request(method, window.app.api + api)
    .set('Authorization', 'Bearer ' + localStore.get('token'))

  if (options.type !== false){
    req.type(options.type || 'json')
  }
  return req
}
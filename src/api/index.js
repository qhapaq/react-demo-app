import * as User from './userApi'

export function serverError(error) {
  let response = JSON.parse(JSON.stringify(error)).response || {code: '', status: '', message: ''}
  return response.body || response
}
export default { User }
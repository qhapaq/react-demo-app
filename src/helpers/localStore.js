import config from './config'

const localStore = {
  get: (name) => {
    return JSON.parse(localStorage.getItem(config.app.name) || '{}')[name]
  },
  add: (name, value) => {
    let local;
    local = JSON.parse(localStorage.getItem(config.app.name) || '{}');
    local[name] = value;
    localStorage.setItem(config.app.name, JSON.stringify(local || ''))
  },
  delete: (name) => {
    let local = JSON.parse(localStorage.getItem(config.app.name) || '{}');
    delete local[name];
    localStorage.setItem(config.app.name, JSON.stringify(local || ''))
  }
}
export default localStore
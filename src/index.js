import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import createHistory from 'history/createBrowserHistory'
import { MuiThemeProvider } from 'material-ui/styles'

import Routes from './routes'
import configureStore from './store/configureStore'
//import sagas from './sagas'
import registerServiceWorker from './registerServiceWorker'
import theme from './theme'

const history = createHistory()
const store = configureStore({}, history)
//store.runSaga(sagas)

window.lgn = function(app) {
  var xhReq = new XMLHttpRequest();
  xhReq.open("POST", 'http://contab.sa-east-1.elasticbeanstalk.com/users/login', true);
  xhReq.setRequestHeader("Content-type", "application/json");
  xhReq.send('{"username": "devtorres@gmail.com", "password": "mtorres"}');
  xhReq.onload = (event ) => {
    localStorage.setItem('doclive', '{"token":"'+JSON.parse(event.target.responseText).response.token+'"}')
    if (app) document.location.href = '/app'
    else document.location.reload()
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history} >
      <MuiThemeProvider theme={theme}>
        <Routes />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('wrp')
)

registerServiceWorker()

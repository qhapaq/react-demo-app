import React from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import App from './containers/App/index'
import Login from './containers/Auth/Login'
import NotFound from './containers/Pages/404'

const Routes = () =>
  <Switch>
    <Route exact path={'/'} render={() => (<Redirect to='/login' />)} />
    <Route exact path={'/login'} component={Login} />
    <Route path={'/app'} component={App} />
    <Route component={NotFound} />
  </Switch>
export default Routes
import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import { connect } from 'react-redux'
import withStyles from 'material-ui/styles/withStyles'
import { Route, Switch, Redirect } from 'react-router-dom'

import HeaderApp from './HeaderApp'
import Notifications from '../../components/Notifications'
import config from '../../helpers/config'
import BaseContainer from '../../components/BaseContainer'
import { actions } from '../../reducers/userReducer'
import styleBase from '../../styleBase'

import Tickets from '../Tickets'
import Settings from '../Settings'

const styles = theme => ({
  ...styleBase(theme),
  root: {
    flexGrow: 1,
    height: '100%',
    flexFlow: 'column'
  }
})

class App extends BaseContainer {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
  }

  componentDidMount() {
    this.props.sessionUser()
  }

  handleClick() {
    this.props.history.push(config.path())
  }

  toRender () {
    const { classes, match, location, history } = this.props

    return <Grid
      container
      className={classes.root}
      spacing={0}
      component='main'
    >
      <HeaderApp location={location} history={history} match={match}/>
      <Switch>
        <Route path={`${match.url}/tickets/:ticketId?`} component={Tickets} />
        <Route path={`${match.url}/settings`} component={Settings}/>
        <Route exact path={match.url} render={() => (<Redirect to={match.url+'/tickets'} />)}  />
      </Switch>
      <Notifications />
    </Grid>
  }
}

App.propTypes = {
  // data
  router: PropTypes.object,
  stateMain: PropTypes.object.isRequired,
  // actions
  //actions: PropTypes.object.isRequired,
  sessionUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({stateMain: state.getIn(['user','session'])})

export default connect(mapStateToProps, {sessionUser: actions.sessionUser})(withStyles(styles)(App))
import React, {PureComponent}  from 'react'
import { connect } from 'react-redux'
import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';
import withStyles from 'material-ui/styles/withStyles'

import Notification from './Notification'

const styles = theme => {
  return {
    container: {
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: 360
      },
      position: 'fixed',
      bottom: 0,
      right: 0,
      padding: theme.spacing.unit * 2,
      zIndex: 1501
    },
    anima: {
      '&-enter': {
        opacity: 0,
        transform: 'translateX(110%)',
        transition: 'all 500ms ease',
        animationFillMode: 'forwards'
      },
      '&-enter-active': {
        opacity: 1,
        transform: 'translateX(0)',
      },
      '&-exit': {
        opacity: 1,
        transform: 'translateX(0)',
        transition: 'all 500ms ease',
        animationFillMode: 'forwards'
      },
      '&-exit-active': {
        opacity: 0,
        transform: 'translateX(110%)',
      }
    }
  }
}

class Notifications extends PureComponent {

  render() {
    const { classes, stateNotifications } = this.props
    const state = stateNotifications.toJS()
    return (
      <TransitionGroup className={classes.container}>
        {state.map((item, index) =>
          <CSSTransition key={item.id} classNames={classes.anima} timeout={500}>
            <Notification
              notification={item}
            />
          </CSSTransition>
        )}
      </TransitionGroup>
    )
  }
}

const mapStateToProps = (state) => ( {stateNotifications: state.get('notification') })
export default connect(mapStateToProps, null)(withStyles(styles)(Notifications))
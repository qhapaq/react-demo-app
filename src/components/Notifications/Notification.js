import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'material-ui-icons/Close'
import InfoOutlineIcon from 'material-ui-icons/InfoOutline'
import CheckIcon from 'material-ui-icons/Check'
import WarningIcon from 'material-ui-icons/Warning'
import RemoveCircleOutlineIcon from 'material-ui-icons/RemoveCircleOutline'
import Typography from 'material-ui/Typography'
import withStyles from 'material-ui/styles/withStyles'

import Timer from '../../helpers/Timer'
import { actions } from '../../reducers/notificationReducer'

const styles = theme => ({
  wrapper: {
    display: 'block',
    width: '100%',
    height: '100%',
    marginTop: theme.spacing.unit * 2
  },
  main: {
    display: 'table',
    width: '100%',
    height: '100%',
    position: 'relative',
    minHeight: 40,
    border: 'none',
    zIndex: 2,
    boxShadow: theme.shadows[2],
    background: 'white'
  },
  'status-default': {

  },
  'status-info': {
    boxShadow: `${theme.shadows[2]}, inset 4px 0px 0px 0px ${theme.palette.primary[500]}`,
    '& > svg': {
      fill: theme.palette.primary[500]
    }
  },
  'status-success': {
    boxShadow: `${theme.shadows[2]}, inset 4px 0px 0px 0px #00C853`,
    '& > svg': {
      fill: '#00C853'
    }
  },
  'status-warning': {
    boxShadow: `${theme.shadows[2]}, inset 4px 0px 0px 0px #FFC107`,
    '& > svg': {
      fill: '#FFC107'
    }
  },
  'status-error': {
    boxShadow: `${theme.shadows[2]}, inset 4px 0px 0px 0px ${theme.palette.error.A400}`,
    '& > svg': {
      fill: theme.palette.error.A400
    }
  },
  imageContainer: {
    display: 'table-cell',
    padding: [theme.spacing.unit, 0, theme.spacing.unit, theme.spacing.unit*2]
  },
  image: {
    display: 'inline-block',
    verticalAlign: 'top',
    borderRadius: 40,
    width: 40,
    height: 40,
    backgroundSize: 'cover',
  },
  icon: {
    display: 'inline-block',
    margin: [theme.spacing.unit, 0, theme.spacing.unit, theme.spacing.unit*2],
    fontSize: 20,
  },
  buttonClose: {
    height: theme.spacing.unit * 5,
    width: theme.spacing.unit * 5,
    float: 'left'
  },
  meta: {
    display: 'table-cell',
    verticalAlign: 'top',
    width: '100%',
    padding: [10, theme.spacing.unit*2],
  },
  buttons: {
    display: 'table-cell',
    height: '100%',
    verticalAlign: 'top'
  }
})

function createTimer(dismissAfter, callback) {
  if (dismissAfter > 0) {
    return new Timer(dismissAfter, callback)
  }
  return null
}

class Notification extends PureComponent {

  constructor(props) {
    const {dismissAfter} = props.notification
    super(props)
    this.timer = createTimer(dismissAfter, this.handleRemove)
  }

  handleRemove = () => {
    const {deleteNotification, notification: {id}} = this.props
    deleteNotification(id)
  }

  handlePauseTimer = () => {
    if (this.timer) {
      this.timer.pause()
    }
  }

  handleResumeTimer = () => {
    if (this.timer){
      this.timer.resume()
    }
  }

  setHTML = (content) => {
    return {
      __html: content
    }
  }

  render() {

    const {
      classes,
      notification: {
        title,
        message,
        status,
        image,
        allowHTML
      }
    } = this.props
    const notificationClass = [
      classes.main,
      classes[`status-${status}`]
    ].join(' ')

    if (this.timer) {
      this.handleResumeTimer()
    }
    return (
      <div
        className={classes.wrapper}
        onMouseEnter={this.timer ? this.handlePauseTimer : ''}
        onMouseLeave={this.timer ? this.handleResumeTimer : ''}
      >
        <div className={notificationClass}>
          {image
            ?
              <div className={classes.imageContainer}>
                <span className={classes.image} style={{backgroundImage: `url(${image})`}}/>
              </div>
            :
              status === 'info' ? <InfoOutlineIcon className={classes.icon} /> :
              status === 'success' ? <CheckIcon  className={classes.icon} /> :
              status === 'warning' ? <WarningIcon  className={classes.icon} /> :
              status === 'error' ? <RemoveCircleOutlineIcon  className={classes.icon} /> : null
          }
          <div className={classes.meta}>
            {title
              ?
                allowHTML
                  ? <Typography component='span' type="body2" dangerouslySetInnerHTML={this.setHTML(title)} gutterBottom />

                  : <Typography component='span' type="body2" gutterBottom >{title} </Typography>
              :
                null
            }
            {message
              ?
                allowHTML
                  ? <Typography component='span' dangerouslySetInnerHTML={this.setHTML(message)} />

                  : <Typography component='span' >{message} </Typography>
              :
                null
            }
          </div>
          <IconButton className={classes.buttonClose} aria-label="Close" onClick={this.handleRemove}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
    )
  }
}

export default connect(null, {deleteNotification: actions.deleteNotification})(withStyles(styles)(Notification))
import React from 'react'
import PropTypes from 'prop-types'
import { Typography, Grid, Divider } from 'material-ui'
import Link from 'react-router-dom/Link'

import withStyles from 'material-ui/styles/withStyles'
import Loading from './Icons/Loading'

const styles = theme => (
  {
    container: {
      height: '100%',
      flex: '1 1 auto'
    },
    paper: {
      padding: theme.spacing.unit * 2,
    },
    status: {
      fontWeight: '300',
    },
    statusText: {
      borderLeft: `1px solid ${theme.palette.text.divider}`,
      paddingLeft: theme.spacing.unit * 2,
      marginLeft: theme.spacing.unit * 2,
    },
    containerError: {
      composes: '$container',
    },
    containerLoading: {
      composes: '$container',
      '& .ldr': {
        position: 'initial',
        bottom: 'initial',
        right: 'initial',
        transform: 'initial'
      },
    },
    login: {
      borderTop: `1px solid ${theme.palette.text.divider}`,
      display: 'block',
      textAlign: 'center',
      marginTop: theme.spacing.unit * 4,
      fontSize: 14,
      textTransform: 'uppercase'
    }
  }
)

const Error = ({ error, loading, info, classes, message }) => {
  let content = null, classContainer = classes.container
  if (error) {
    let { status, code } = error
    content = <Typography type="headline" component="h3" className={classes.status}>
      {code}<small className={classes.statusText}>{status}</small>
      {code === 401 && <Link to="/login" className={classes.login}>Iniciar sessión</Link>}
    </Typography>
    classContainer = classes.containerError
  } else if (loading){
    content = Loading
    classContainer = classes.containerLoading
  } else if (info){
    content = <Typography type="headline" component="h3" className={classes.status}>
      {info}
    </Typography>
  }

  return (
    <Grid container spacing={0} alignItems="center" justify="center" className={classContainer}>
      <div className={classes.paper}>
        {content}
        {message && <Divider light />}
        {message}
      </div>
    </Grid>
  )
}

Error.propTypes = {
  error: PropTypes.object,
  loading: PropTypes.bool,
  info: PropTypes.string,
  message: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object
  ])
}

export default withStyles(styles)(Error)

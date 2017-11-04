import React, { PureComponent } from 'react'
import withStyles from 'material-ui/styles/withStyles'
import Card, { CardContent, CardHeader } from 'material-ui/Card'
import { Grid } from 'material-ui'

import config from '../../helpers/config'
import Notifications from '../../components/Notifications'
import LoginForm from './LoginForm'
import {Isotipo} from '../../components/Icons/App'
import styles from './styles'

class Edit extends PureComponent {

  constructor(props) {
    super(props)
    this.handleChangeState = this.handleChangeState.bind(this)
    this.handleClickSave = this.handleClickSave.bind(this)
    this.state = {
      ready: false,
      wait: false,
      waitError: false,
      pristine: false
    }
  }

  handleChangeState(state) {
    this.setState(state)
  }

  handleClickSave (event, companyId) {
    let form = this.formEdit.ref.getWrappedInstance().refs.wrapped
    form.formSubmit()
  }

  render () {
    const {classes, history} = this.props

    return (
      <Grid container justify={'center'} alignItems='center' spacing={0} className={classes.root}>
        <Card className={classes.card}>
          <CardHeader
            avatar={Isotipo}
            className={classes.cardHeader}
            title="Bienvenido"
            subheader={"Iniciar sesión en " + config.app.label} />
          <CardContent className={classes.cardContent}>
            <LoginForm
              history={history}
              changeStateMom={this.handleChangeState}
              innerRef={(form) => this.formEdit = form }
            />
          </CardContent>
        </Card>
        <Notifications />
      </Grid>
    )
  }
}

export default withStyles(styles)(Edit)
import React  from 'react'
import { Field } from 'redux-form/immutable'
import { CircularProgress } from 'material-ui/Progress'
import { Button } from 'material-ui'

import TextField from '../../components/Controls/TextField'
import createForm from '../../components/BaseForm'
import { actions } from '../../reducers/userReducer'
import STATUS from '../../reducers/statusCode'


const LoginForm =  createForm({
  name: 'loginForm',
  validate: {
    username: 'required',
    password: 'required'
  },
  actions: actions,
  states: {
    stateMain: ['user','auth'],
    processingThreadStatus: ['user', 'login', 'status'],
  },
  styles: (theme) => ({
    button: {
      margin: [theme.spacing.unit * 3,  0, theme.spacing.unit * 2]
    },
    iconButton: {
      color: 'white',
      margin: [-4, theme.spacing.unit, -4, -4]
    }
  }),
  methods: (owner) => function() {
    return {
      componentWillUpdate: (nextProps, nextState) => {
        if (this.props.stateMain.get('status') === STATUS.REQUEST && nextProps.stateMain.get('status') === STATUS.SUCCESS) {
          if (nextProps.stateMain.get('response')) {
            this.props.history.push('/app')
          }
        }
        if (nextProps.processingThreadStatus === STATUS.SUCCESS) {
          this.props.history.push('/app')
        }
      },
      componentDidMount: () => {
        this.props.actions.authUser({ignoreError: true})
      },
      handleSubmit: (values) => {
        this.props.actions.loginUser(values.toJS())
      },
      toRender: () => {
        const {classes} = this.props
        const wait = this.props.processingThreadStatus === STATUS.REQUEST
        return (
          <form onSubmit={this.props.handleSubmit(this.handleSubmit.bind(this))}>
            <Field
              id="username"
              label="Nombre de usuario"
              name="username"
              type="text"
              margin="normal"
              placeholder="ej: mtorres"
              fullWidth
              component={TextField}
            />
            <Field
              id="password"
              label="Contraseña"
              name="password"
              type="password"
              autoComplete="current-password"
              margin="normal"
              fullWidth
              component={TextField}
            />
            <Button type="submit" raised color="primary" className={classes.button}>
              {wait && <CircularProgress size={22} className={classes.iconButton} />}
              {wait ? '...' : 'Iniciar sesión'}
            </Button>
          </form>
        )
      }
    }
  }.bind(owner)
})
export default LoginForm
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'
import { CircularProgress } from 'material-ui/Progress'

class BaseEditModal extends PureComponent {

  constructor(props) {
    super(props)
    this.handleClickAgree = this.handleClickAgree.bind(this)
    this.handleClickCancel = this.handleClickCancel.bind(this)
    this.handleEscapeCancel = this.handleEscapeCancel.bind(this)
    this.handleChangeState = this.handleChangeState.bind(this)
    this.state = {
      ready: false,
      wait: false,
      waitError: false,
      pristine: false,
      open: this.props.open || false,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.open !== 'undefined') {
      this.setState({ open: nextProps.open})
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.wait === true && this.state.wait === false && this.state.waitError === false) {
      this.handleClose()
    }
  }


  handleClose() {
    this.setState({ open: false })
    if (this.props.handleClose){
      this.props.handleClose()
    }
    if (this.props.history) {
      let pathname = this.props.history.location.pathname
      if (pathname.endsWith('/add')) {
        this.props.history.push(pathname.replace('/add',''))
      }
    }
  }

  handleChangeState(state) {
    this.setState(state)
  }

  handleEscapeCancel() {
    if (this.state.wait) return

    if (!this.state.pristine) {
      if(window.confirm('¿Desea descartar los cambios?')) {
        this.handleClose()
      }
    }else {
      this.handleClose()
    }
  }

  handleClickCancel () {
    this.handleClose()
  }

  handleClickAgree () {
    let form = this.formEdit.ref.getWrappedInstance().refs.wrapped
    form.formSubmit()
  }

  toRender() {
    return 'empty'
  }

  render () {
    const {title} = this.props

    return (
      <Dialog open={this.state.open} onRequestClose={this.handleEscapeCancel}>
        <DialogTitle>
          {title}
        </DialogTitle>
        <DialogContent>
          {this.toRender()}
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClickCancel} disabled={!this.state.ready || this.state.wait}>
            Cerrar
          </Button>
          <Button onClick={this.handleClickAgree} color="primary" disabled={!this.state.ready || this.state.pristine || this.state.wait}>
            {this.state.wait && <CircularProgress size={22} style={{margin: '-8px 8px -8px 0', width: 22, height: 22}} />}
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

BaseEditModal.propTypes = {
  title:PropTypes.string,
}

export default BaseEditModal

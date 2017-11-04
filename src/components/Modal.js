import React, { PureComponent } from 'react'
import Button from 'material-ui/Button'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

class Modal extends PureComponent {

  constructor(props) {
    super(props)
    this.handleRequestClose = this.handleRequestClose.bind(this)
    this.state = {
      show: !!props.show,
    }
  }

  handleRequestClose () {
    this.setState({ show: false })
    if (this.props.handleModalCancel) {
      setTimeout(function() {
        this.props.handleModalCancel()
      }.bind(this), 500)
    }
  }

  render () {
    const { handleModalAgree, handleModalCancel, dialogActions = true } = this.props

    return (
      <Dialog open={this.state.show} onRequestClose={this.handleRequestClose}>
        <DialogTitle>
          {this.props.title}
        </DialogTitle>
        <DialogContent>
          {this.props.children}
        </DialogContent>
        {dialogActions && <DialogActions>
          <Button onClick={handleModalCancel}>
            Cancelar
          </Button>
          <Button onClick={handleModalAgree} color="primary">
            Aceptar
          </Button>
        </DialogActions>}
      </Dialog>
    )
  }
}

export default Modal

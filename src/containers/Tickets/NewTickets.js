import React, { PureComponent } from 'react'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import Dialog, { DialogActions, DialogContent, DialogTitle } from 'material-ui/Dialog'

import {TextField} from '../../components/Controls/TextField'
import { actions } from '../../reducers/ticketsReducer'

class NewTickets extends PureComponent {

  constructor(props) {
    super(props)
    this.handleClose = this.handleClose.bind(this)
    this.handleAgree = this.handleAgree.bind(this)
    this.state = {
      show: props.show,
      table: 0
    }
  }

  componentWillReceiveProps(nextProps) {
    const show = nextProps.show
    if (this.state.show !==  show) {
      this.setState({show: show})
    }
  }

  handleAgree() {
    this.props.saveTickets({table: this.state.table})
    this.handleClose(true)
  }

  handleClose(ticketId) {
    this.props.handleClose(ticketId)
  }

  render () {
    return (
      <Dialog open={this.state.show} onRequestClose={this.handleClose}>
        <DialogTitle>
          Crear ticket
        </DialogTitle>
        <DialogContent>
          <TextField
            name="table"
            type="number"
            label="En mesa N°"
            value={this.state.table}
            margin="normal"
            autoFocus
            style={{width: 200}}
            onChange={event =>
              this.setState({table: parseFloat(event.target.value) || 0})
            }
            onFocus={event => event.target.select()}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose}>
            Cancelar
          </Button>
          <Button onClick={this.handleAgree} color="primary">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(
  null,
  {saveTickets: actions.saveTickets}
)(NewTickets)
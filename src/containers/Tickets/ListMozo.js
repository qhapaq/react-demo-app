import React, {PureComponent} from "react"
import Card, { CardHeader,  CardActions } from 'material-ui/Card'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import withStyles from 'material-ui/styles/withStyles'
import Grid from 'material-ui/Grid'
import Avatar from 'material-ui/Avatar'
import red from 'material-ui/colors/red'

import { actions } from '../../reducers/ticketsReducer'

class ListMozo extends PureComponent {

  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
  }

  handleSave(id) {
    this.props.saveTickets({id: id, paidId: id})
  }

  handleEdit(id) {
    this.props.history.push(this.props.match.path.replace('/:ticketId?','/' + id))
  }

  render () {
    const {classes} = this.props
    return <div className={classes.root}>
      <Grid container spacing={24}>
        {this.props.data.map((item, index) =>
        <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
          <Card className={classes.card}>
            <CardHeader
              avatar={
                <Avatar aria-label="Mesa" className={classes.avatar} title={'Número de mesa ' +  item.table}>
                  {item.table}
                </Avatar>
              }
              title={"Ticket N° " + item.id}
              subheader={item.date}
            />
            <CardActions>
            <Button dense color="primary" onClick={event => this.handleEdit(item.id) }>
                Editar
              </Button>
              <div className={classes.flexGrow} />
              <Button dense color="primary" onClick={event => this.handleSave(item.id) }>
                Pagar
              </Button>
            </CardActions>
          </Card>
        </Grid>
        )}
      </Grid>
    </div>
  }

}



export default connect(
  null,
  {saveTickets: actions.saveTickets}
)(withStyles(theme=>({
  root: {
    flexGrow: 1,
    padding: 18
  },
  card: {
    maxWidth: 400,
    margin: '0 auto',
  },
  flexGrow: {
    flex: '1 1 auto',
  },
  avatar: {
    backgroundColor: red[500],
  }
}))(ListMozo))



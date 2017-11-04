import React, {PureComponent} from "react"
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card'
import Table, { TableBody, TableCell, TableHead, TableRow } from 'material-ui/Table'
import Button from 'material-ui/Button'
import { connect } from 'react-redux'
import withStyles from 'material-ui/styles/withStyles'
import Grid from 'material-ui/Grid'
import Avatar from 'material-ui/Avatar'

import { actions } from '../../reducers/ticketsReducer'

class ListCocinero extends PureComponent {

  constructor(props) {
    super(props)
    this.handleSave = this.handleSave.bind(this)
  }

  handleSave(id) {
    this.props.saveTickets({id: id, closeId: id})
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
              title={"Comanda N° " + item.id}
              subheader={item.date}
            />

            <CardContent>
              <Table className={classes.table}>
                <TableHead>
                  <TableRow>
                    <TableCell>Descripción</TableCell>
                    <TableCell numeric>Cantidad</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {item.detail && item.detail.map((itemDetail, indexDetail) => {
                    return (
                      <TableRow key={indexDetail}>
                        <TableCell>{itemDetail.product_id.label}</TableCell>
                        <TableCell numeric>{itemDetail.quantity}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
            <CardActions>

              <div className={classes.flexGrow} />
              <Button dense color="primary" onClick={event => this.handleSave(item.id) }>
                Atendido
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
    backgroundColor: '#53c419',
  }
}))(ListCocinero))



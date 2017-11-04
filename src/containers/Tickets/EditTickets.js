import React  from 'react'
import { Field, FieldArray } from 'redux-form/immutable'
import Table, { TableBody, TableCell, TableHead, TableRow, TableFooter } from 'material-ui/Table'
import { CardHeader } from 'material-ui/Card'
import IconButton from 'material-ui/IconButton'
import ClearIcon from 'material-ui-icons/Clear'
import AddIcon from 'material-ui-icons/Add'
import { fromJS } from 'immutable'
import Avatar from 'material-ui/Avatar'
import red from 'material-ui/colors/red'

import request from '../../helpers/request'
import SelectField from '../../components/Controls/SelectField'
import BaseEditModal from '../../components/BaseEditModal'
import TextField from '../../components/Controls/TextField'
import createForm from '../../components/BaseForm'
import { actions } from '../../reducers/ticketsReducer'


const renderRequire = ({fields, cab, meta, classes, handleAdd, handleChangeItem}) => {
  return <div>
    <CardHeader
      className={classes.cardHeader}
      avatar={
        <Avatar aria-label="Mesa" className={classes.avatar} title={'Número de mesa ' +  cab.table}>
          {cab.table}
        </Avatar>
      }
      title={"Ticket N° " + cab.id}
      subheader={cab.date}
    />
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">Producto</TableCell>
          {/*<TableCell padding="none" style={{width:60}}>Precio</TableCell>*/}
          <TableCell padding="none">Cantidad</TableCell>
          <TableCell padding="none"></TableCell>
        </TableRow >
      </TableHead>
      <TableBody>
        {fields.map((item, index) => {
          //const itemData = fields.get(index).toJS()

          return (
            <TableRow key={index}>
              <TableCell padding="none">
                <Field
                async
                fullWidth
                clearable={false}
                autoload={false}
                name={`${item}.product_id`}
                component={SelectField}
                className={classes.selectField}
                loadOptions={value => {
                  if (!value) {
                    return Promise.resolve({ options: [] });
                  }
                  return request('GET', 'products/').query({filter: value})
                  .then(response => {
                    let options = response.body.result.map(item => ({label:item.name , value:item.id, price: item.price}))
                    return { options }
                  })
                }}
              />
              </TableCell>
              {/*<TableCell padding="none">
                {itemData.price}
              </TableCell>*/}
              <TableCell padding="none">
                <Field name={`${item}.quantity`} type='number' component={TextField} margin="normal" style={{width: 60}} />
              </TableCell>
              <TableCell padding="none">
                <IconButton className={classes.clearIcon} aria-label="Borrar item" onClick={event=>fields.remove(index)}>
                  <ClearIcon className={classes.clearIcon} />
                </IconButton>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell padding="none">
            <IconButton color="primary" aria-label="Agregar item" onClick={event=>fields.push(fromJS({
              quantity:1,
              ticket_id: cab.id
            }))}>
              <AddIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  </div>
}

const Form =  createForm({
  name: 'formEditTickets',

  actions: actions,
  states: {
    stateMain: ['tickets','list'],
    processingThreadStatus: ['tickets', 'save', 'status'],
  },
  styles: theme => ({
    root: {
      minHeight: 300
    },
    table: {
      overflow:'inherit'
    },
    selectField: {
      marginTop: 10,
      paddingRight: 18,
      [theme.breakpoints.up('sm')]: {
        minWidth: 300,
      },

    },
    avatar: {
      backgroundColor: red[500],
    },
    cardHeader: {
      padding: 0
    },
  }),
  methods: (owner) => function() {
    return {
      nameChild: () => 'FormEditTickets',
      handleSubmit: (values) => {
        let data = values.toJS()
        this.props.actions.saveTickets(data)
      },

      toRender: () => {
        const {classes} = this.props
        const data = this.props.initialValues.toJS()
        return <form className={classes.root}>
          <FieldArray
            name='detail'
            cab={data}
            component={renderRequire}
            classes={classes}
          />
        </form>
      }
    }
  }.bind(owner)
})

class EditAreas extends BaseEditModal {
  toRender() {
    return <Form
      ignoreStatus={true}
      initialValues={this.props.data === true ? {} : this.props.data}
      changeStateMom={this.handleChangeState}
      innerRef={(form) => this.formEdit = form }
    />
  }
}

export default EditAreas

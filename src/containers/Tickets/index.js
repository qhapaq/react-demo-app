import React  from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import withStyles from 'material-ui/styles/withStyles'
import { fromJS } from 'immutable'

import Alert from '../../components/Alert'
import BaseContainer from '../../components/BaseContainer'
import { actions } from '../../reducers/ticketsReducer'
import New from './NewTickets'
import Edit from './EditTickets'
import ListMozo from './ListMozo'
import ListCocinero from './ListCocinero'
import STATUS from '../../reducers/statusCode'

const styles = theme => {
  return {
    root: {
      width: '100%',
      flex: '1 1 auto',

    },
    empty: {
      display: 'flex',
      alignItems: 'center'
    },
    box: {
      padding: [theme.spacing.unit, theme.spacing.unit * 2],
      '&:not(:first-of-type)': {
        borderTop: `1px solid ${theme.palette.text.divider}`
      }
    },
    boxTitle: {
      display: 'inline-block',
      fontWeight: 400,
      marginRight: theme.spacing.unit,
      cursor: 'pointer',
      lineHeight: 1.4,
      '&:hover': {
        color: theme.app.color1
      }
    }
  }
}

class IndexTickets extends BaseContainer {
  constructor(props) {
    super(props)
    this.handleCloseModalNew = this.handleCloseModalNew.bind(this)
    //let edit = parseFloat(props.match.params.ticketId)
    //edit = edit >= 0 || false
    this.state = {
      modalNew: props.match.params.ticketId === 'add',
      modalEdit: false,
      modalEditData: false
    }
    this.isNew = false
  }

  componentDidMount() {
    this.props.actions.listTickets()
  }

  componentWillUnmount() {
    //this.props.actions.listResetTickets()
  }

  componentWillReceiveProps(nextProps) {
    if (!this.state.modalNew && nextProps.match.params.ticketId === 'add') {
      this.setState({modalNew: true})
    }else {
      this.setState({modalNew: false})
    }

    const stateMain = nextProps.stateMain.toJS()
    if (stateMain.status === STATUS.SUCCESS && stateMain.response.length) {
      let edit = parseFloat(nextProps.match.params.ticketId)
      this.setState({modalEdit: edit >= 0 || false})
      if (edit>=0){
        let index = stateMain.response.map(function(d) { return d['id']; }).indexOf(edit)
        this.setState({modalEditData: stateMain.response[index]})
        //this.setState({modalEditData: stateMain.response.find(item=> item.id=edit )})
      }else {
        this.setState({modalEditData: fromJS({})})
      }
    }

    const stateSave = nextProps.stateSave.toJS()
    const stateSaveOld = this.props.stateSave.toJS()

    if (stateSaveOld.status !== STATUS.SUCCESS && stateSave.status === STATUS.SUCCESS && this.isNew) {
      this.props.history.push(this.props.match.path.replace('/:ticketId?','/' + parseFloat(stateSave.response.result)))
      this.isNew = false
    }
  }

  handleCloseModalNew(isNew) {
    if (isNew === true) {
      this.isNew = true
    }else {
      this.props.history.push(this.props.match.path.replace('/:ticketId?',''))
    }
  }

  toRender () {
    const { classes, history, stateMain, match } = this.props
    const data = stateMain.get('response')
    let content
    if (data.length>0){
      if (this.props.auth.user.level === 'Mozo') {
        content = <ListMozo data={data} match={match} history={history} />
      }else {
        content = <ListCocinero data={data} />
      }
    }else {
      content = <Alert info='Local vacío' />
    }

    return (
      <div className={classes.root + ' '+ (data.length===0 ? classes.empty :'')}>
        {content}
        <Edit
          open={this.state.modalEdit}
          data={this.state.modalEditData}
          match={match} history={history}
          handleClose={this.handleCloseModalNew}
        />
        <New
          show={this.state.modalNew}
          match={match}
          history={history}
          handleClose={this.handleCloseModalNew}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  stateMain: state.getIn(['tickets','list']),
  stateSave: state.getIn(['tickets','save']),
  auth: state.getIn(['user', 'auth', 'response'])
})

const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators({
  listTickets: actions.listTickets,
  listResetTickets: actions.listResetTickets
}, dispatch) })

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IndexTickets))
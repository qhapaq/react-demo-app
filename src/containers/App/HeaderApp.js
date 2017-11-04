import React, {PureComponent} from 'react'
import { connect } from 'react-redux'
import Link from 'react-router-dom/Link'
import { Select, ButtonBase, Input, Grid, IconButton, Typography, Divider } from 'material-ui'
import Menu, { MenuItem } from 'material-ui/Menu'
import { fade } from 'material-ui/styles/colorManipulator'
import withStyles from 'material-ui/styles/withStyles'
import AddIcon from 'material-ui-icons/Add';

import localStore from '../../helpers/localStore'
import {Isotipo} from '../../components/Icons/App'

const styles = theme => {
  return {
    root: {
      height: theme.spacing.unit * 6,
      zIndex: 1,
      boxShadow: '0px 0px 2px 1px rgba(69, 69, 84, .2), inset 0px -.6px 0px 0px rgba(69, 69, 84, .4)'
    },
    btnLogo:{
      color: theme.app.color3,
      padding: [theme.spacing.unit, theme.spacing.unit * 2],
      '& svg': {
        width: 26,
        height: 26,
        fill: theme.app.color4
      }
    },
    btnLogo2: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4,
      marginLeft: theme.spacing.unit,
      borderRadius: '50%',
      '& svg': {
        width: 26,
        height: 26,
        fill: theme.app.color4
      }
    },
    btnMenu: {
      width: theme.spacing.unit * 4,
      height: theme.spacing.unit * 4,
      marginRight: theme.spacing.unit * 2,
      borderRadius: '50%',
      '&:hover': {
        backgroundColor: fade(theme.app.color1, 0.12),
      },
      '& img': {
        maxWidth: '100%'
      }
    },
    dividerLogo: {
      width: 1,
      height: 26,
      margin: [0, theme.spacing.unit * 2, 0, 0]
    },
    menuTitle: {
      margin: theme.spacing.unit * 2,
      textTransform: 'uppercase',
      outline: 'none'
    },
    select: {
      textTransform: 'uppercase',
      padding: 0,
      '&:before': {
        content: 'initial',
      },
      '& [role=button]': {
        lineHeight: (theme.spacing.unit * 4) + 'px',
        paddingRight: '28px',
        width: 'calc(100% - 28px)'
      }
    }
  }
}

class Header extends PureComponent {

  constructor (props) {
    super(props)
    this.handleClickMenuOpen = this.handleClickMenuOpen.bind(this)
    this.handleClickSettingsOpen = this.handleClickSettingsOpen.bind(this)
    this.handleClickMenu = this.handleClickMenu.bind(this)
    this.handleCompanyChange = this.handleCompanyChange.bind(this)
    this.state = {
      anchorEl: undefined,
      anchorSettings: undefined,
      openMenu: false,
      openSettings: false
    }
  }

  handleCompanyChange (event) {

  }

  handleClickSettingsOpen(event) {
    this.setState({ openSettings: true, anchorSettings: event.currentTarget })
  }

  handleClickMenuOpen(event) {
    this.setState({ openMenu: true, anchorEl: event.currentTarget })
  }

  handleClickMenu(event) {
    this.setState({ openMenu: false, openSettings: false })
    if (event==='add'){
      this.props.history.push(this.props.match.url + '/tickets/add')
    }else if (event.target.dataset.type === 'close') {
      localStore.delete('token')
      document.location.href = '/login'
    }else if (event.target.dataset.type){
      this.props.history.push(this.props.match.url + '/' + event.target.dataset.type)
      //this.props.history.push(this.props.match.url + '/tickets/add')
    }else{

      //this.props.history.push(this.props.match.url + '/' + event.target.dataset.type)
    }
  }

  render() {
    const { classes, auth: {user}, companies } = this.props
    let userData = user || {}
    let companyId = this.props.location.pathname.split('/')[2]

    companyId = companyId && companyId.length === 24 ? companyId : false

    let contentCompany

    if (companyId) {
      if (companies.length > 1) {
        contentCompany = <Select
          value={companyId}
          onChange={this.handleCompanyChange}
          className={classes.select}
          input={<Input id="defaultCompany" />}
        >
          {companies.map((company, index) => <MenuItem key={index} value={company._id}>{company.commercialName}</MenuItem>)}
        </Select>
      }else{
        contentCompany = <span>{companies[0].commercialName}</span>
      }
    }
    return (
      <Grid item container alignItems='center' wrap='nowrap' justify='space-between' spacing={0} className={classes.root}>
        <ButtonBase focusRipple className={classes.btnLogo} to='/app' component={Link}>
          {Isotipo}
        </ButtonBase>
        <Divider className={classes.dividerLogo} />
        <Typography component="span" type="subheading" style={{
          textTransform: 'uppercase',
          //fontWeight: 300
        }}>
          Resto - {this.props.auth.user.level}
        </Typography>

        {contentCompany}
        <div style={{marginLeft: 'auto'}}></div>

        {this.props.auth.user.level === 'Mozo' && <IconButton
          aria-owns={this.state.openSettings ? 'add-menu' : null}
          aria-haspopup="true"
          onClick={event => this.handleClickMenu('add')}
          className={classes.btnMenu}
          title='Crear ticket'
          style={{marginRight: 8}}>

          <AddIcon />
        </IconButton>}

        <IconButton
          aria-owns={this.state.openMenu ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClickMenuOpen}
          className={classes.btnMenu}
          title={userData.username}
          color="primary" >
          <img src='http://doclive.devtorres.net/static/avatar.png'
            alt={userData.username}
            title={userData.username}
          />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.openMenu}
          elevation={10}
          onRequestClose={this.handleClickMenu}>
          <Typography component="p" className={classes.menuTitle}>
            {userData.username}
          </Typography>
          <Divider light />
          <MenuItem onClick={this.handleClickMenu} data-type="tickets">{this.props.auth.user.level === 'Mozo' ? 'Tickets' : 'Comandas'}</MenuItem>
          <MenuItem onClick={this.handleClickMenu} data-type="settings">Ajustes</MenuItem>
          <MenuItem onClick={this.handleClickMenu} data-type="close">Cerrar sesión</MenuItem>
        </Menu>
      </Grid>
    )
  }
}

export default connect((state) => ({
  auth: state.getIn(['user', 'auth', 'response'])
}), {})(withStyles(styles)(Header))
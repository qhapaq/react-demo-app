import React, {PureComponent}  from 'react'
import Select from 'react-select'
import withStyles from 'material-ui/styles/withStyles'
import Typography from 'material-ui/Typography'
import classNames from 'classnames'

import './SelectField.css'

class SelectField extends PureComponent {

  constructor(props){
    super(props)
    this.handleFocus = this.handleFocus.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      isFocus: false
    }
  }

  handleChange(value) {
    const {input, onChangeValue} = this.props
    if (onChangeValue) {
      value = onChangeValue(value)
    }
    if (input){
      /*
      if (simpleValue){
        value = value[valueKey || 'value']
      }
      */
      input.onChange(value)
    }
  }

  handleFocus() {
    this.setState({isFocus: true})
  }

  handleBlur(value) {
    let input = this.props.input
    this.setState({isFocus: false})
    if (input) {
      //input.onBlur(input.value)
    }
  }

  render() {
    const {async, input, creatable, classes, label, fullWidth, className, margin, onChangeValue, meta, ...props} = this.props
    const classRoot = classNames(classes.root, className, {
      [classes.focused]: this.state.isFocus,
      [classes.fullWidth]: fullWidth,
      [classes.marginNormal]: margin === 'normal',
      [classes.error]: meta && ((meta.submitFailed || meta.touched) && meta.error)
    })
    let ComponentSelect
    if (creatable) {
      ComponentSelect = Select.Creatable
    }else if(async){
      ComponentSelect = Select.Async
    }else{
      ComponentSelect = Select
    }
    if (input) {
      input.value = input.value.toJS ? input.value.toJS() : input.value
    }
    return (
      <div className={classRoot}>
        {label && <Typography type="caption" component='label' className={classes.label}>{label}</Typography>}
        <ComponentSelect
          className={classes.select}
          placeholder="Seleccione"
          searchPromptText='Digite para buscar'
          noResultsText='Sin resultados'
          promptTextCreator={label => `Crear opción "${label}"`}
          {...input}
          {...props}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
        />
        </div>
    )
  }
}

SelectField = withStyles(theme => ({
  root: {
    margin: 0,
    border: 0,
    display: 'inline-flex',
    padding: 0,
    position: 'relative',
    minWidth: 140,
    flexDirection: 'column',
    '& $label + $select' : {
      marginTop: 16
    }
  },
  marginNormal: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit
  },
  focused: {
    '& $label': {
      color: theme.palette.primary['A700']
    },
    '& $select:after': {
      transform: 'scaleX(1)',
    }
  },
  error: {
    '& $label': {
      color: theme.palette.error.A400
    },
    '& $select:after': {
      transform: 'scaleX(1)',
      backgroundColor: theme.palette.error.A400
    }
  },
  label: {
    color: theme.palette.input.labelText,
    position: 'absolute',
    whiteSpace: 'nowrap'
  },
  select: {
    paddingBottom: 2,
    '& > div.Select-control': {
      height: '1em',
      border: 0
    },
    '& .Select-control': {
      boxShadow: 'none!important'
    },
    '&:before': {
      backgroundColor: 'rgba(0, 0, 0, 0.25)',
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '""',
      height: 1,
      position: 'absolute',
      right: 0,
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.ease,
      })
    },
    '&:after': {
      backgroundColor: theme.palette.primary['A700'],
      left: 0,
      bottom: 0,
      // Doing the other way around crash on IE11 "''" https://github.com/cssinjs/jss/issues/242
      content: '""',
      height: 2,
      position: 'absolute',
      right: 0,
      transform: 'scaleX(0)',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shorter,
        easing: theme.transitions.easing.easeOut,
      }),
    }
  },
  fullWidth: {
    width: '100%'
  }
}))(SelectField)

export {
  Select
}
export default SelectField
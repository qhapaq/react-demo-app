import { fromJS } from 'immutable'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { reduxForm } from 'redux-form/immutable'
import withStyles from 'material-ui/styles/withStyles'

import STATUS from '../reducers/statusCode'
import BaseContainer from './BaseContainer'
import validate from '../helpers/validate'

export default function createForm(props) {
  class BaseForm extends BaseContainer {

    constructor(propsBase) {
      super(propsBase)
      this.handleSubmit = this.handleSubmit.bind(this)
      let methods = props.methods(this)()
      for(let method in methods) {
        this[method] = methods[method]
      }
    }

    componentWillReceiveProps(nextProps) {
      let nextStatus = nextProps.stateMain.get('status')
      this.props.changeStateMom({
        ready: nextStatus === STATUS.SUCCESS,
        wait: nextProps.processingThreadStatus === STATUS.REQUEST,
        waitError: nextProps.processingThreadStatus === STATUS.FAILURE
      })
    }

    componentWillUpdate(nextProps, nextState) {
      this.props.changeStateMom({
        pristine: nextProps.pristine,
      })
    }

    formSubmit(values) {
      this.props.handleSubmit(this.handleSubmit)()
    }

    handleSubmit(values) { }
    nameChild = () => 'BaseForm'
  }

  let baseFormOptions = {
    form: props.name,
    enableReinitialize: true,
    destroyOnUnmount: true
  }
  if (props.validate) {
    baseFormOptions.asyncValidate = values => {
      let result = validate(values, props.validate)
      return result
    }
  }
  if (props.keepDirtyOnReinitialize) {
    baseFormOptions.keepDirtyOnReinitialize = true
  }

  BaseForm = reduxForm(baseFormOptions)(BaseForm)

  const mapStateToProps = (state, ownProps) => {

    let stateProps = {}
    for(let stateProp in props.states) {
      if (stateProp === 'initialValues') {
        stateProps[stateProp] = fromJS(state.getIn(props.states[stateProp]))
      }else {
        stateProps[stateProp] = state.getIn(props.states[stateProp])
      }
    }
    if(ownProps.initialValues) {
      stateProps.initialValues = ownProps.initialValues
    }
    return stateProps
  }

  const mapDispatchToProps = (dispatch) => ({ actions: bindActionCreators(props.actions, dispatch) })
  return connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(withStyles(props.styles)(BaseForm))
}
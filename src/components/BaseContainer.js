import React, { PureComponent } from 'react'

import STATUS from '../reducers/statusCode'
import Alert from '../components/Alert'
import config from '../helpers/config'

class BaseContainer extends PureComponent {
  nameChild() { return 'BaseContainer' }
  toTitle() {
    return false
  }
  render () {
    /*
    if (this.props.ignoreStatus) {
      return this.toRender()
    }
    */
    const status = this.props.stateMain.get('status')
    const statusText = this.props.stateMain.get('statusText')

    //replace title
    const title = this.toTitle()
    document.title = (title ? (title + ' / ') :'') + config.app.label;

    if (status === STATUS.REQUEST || status === STATUS.INITIAL) {
      return <Alert loading={true} />
    }

    if (status === STATUS.FAILURE) {
      return <Alert error={statusText} />
    }

    if (status === STATUS.SUCCESS ) {
      return this.toRender()
    }
    return null
  }
}
export default BaseContainer
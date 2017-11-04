import React from 'react'
import Alert from '../../components/Alert'
const NotFound = props => {
  return <Alert error={{code: '404', status: 'Not Found'}}/>
}
export default NotFound
import React  from 'react'
import TextField from 'material-ui/TextField'

const RenderTextField = ({
  input,
  meta: { touched, error },
  ...custom
}) =>
  <TextField
    error={!!touched && !!error}
    {...input}
    {...custom}
  />
export {
  TextField
}
export default RenderTextField
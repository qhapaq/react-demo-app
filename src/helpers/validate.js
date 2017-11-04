import indicative from './indicative'

export default async function validate(data, rules, messages = {}) {
  data = data.toJS ? data.toJS() : data
  messages = {
    ...{
      alpha_numeric: 'The {{field}} field can only contain letters and numbers.',
      boolean: 'The {{field}} field must be true or false.',
      date_format: 'The {{field}} field has an invalid date format.',
      email: 'The {{field}} provided is not a valid email address.',
      integer: 'The {{field}} must be an integer.',
      max: 'The {{field}} field is too long.',
      min: 'The {{field}} field is too short.',
      required: 'The {{field}} field is required.',
      string: 'The {{field}} field must be a string'
    },
    ...messages
  }
  try {
    await indicative.validateAll(data, rules, messages)
    return {}
  } catch (errors) {
    /* eslint-disable array-callback-return */
    let ret = {}
    errors.map(function(item,index){ ret[item.field]= item.message})
    return ret
  }
}


/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import Validations from '../Validations'
import Messages from '../Messages'
import _ from 'lodash'
import pSettle from '../Utils/p-settle'

const ValidationEngine = {}

/**
 * validates a field with all assigned validations for that
 * field.
 *
 * @param  {Object}  data
 * @param  {String}  field
 * @param  {Object}  validations
 * @param  {Object}  messages
 * @param  {Boolean} [runAll]
 *
 * @return {Promise<Array>}
 */
ValidationEngine.validateField = function (data, field, validations, messages, runAll) {
  const validationsMap = _.map(validations, (validation) => {
    return ValidationEngine.runValidationOnField(data, field, validation.name, messages, validation.args)
  })
  return runAll ? pSettle(validationsMap) : Promise.all(validationsMap)
}

/**
 * runs a single validation on a given field.
 *
 * @param  {Object} data
 * @param  {String} field
 * @param  {String} validation
 * @param  {Object} messages
 * @param  {Array}  [args]
 *
 * @return {Promise}
 */
ValidationEngine.runValidationOnField = function (data, field, validation, messages, args) {
  const message = Messages.make(messages, field, validation, args)
  const validationMethod = ValidationEngine.getValidationMethod(validation)

  return new Promise((resolve, reject) => {
    validationMethod(data, field, message, args, _.get)
    .then(resolve)
    .catch((error) => {
      /* eslint-disable */
      reject({field, validation, message: error})
      /* eslint-enable */
    })
  })
}

/**
 * returns the validation method from the Validations
 * store or throws an error saying validation not
 * found.
 *
 * @param  {String} validation
 *
 * @return {Function}
 *
 * @throws {Error} If validation is not found
 */
ValidationEngine.getValidationMethod = function (validation) {
  return _.get(Validations, _.camelCase(validation), function () {
    throw new Error(`${validation} is not defined as a validation`)
  })
}
export default ValidationEngine
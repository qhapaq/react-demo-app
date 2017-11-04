/**
 * indicative
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/
import Validator from './src/Validator'
import Sanitization from './src/Sanitization'
import Rule from './src/Rule'

export default  {
  validate: Validator.validate,
  validateAll: Validator.validateAll,
  extend: Validator.extend,
  is: Validator.is,
  'is.extend': Validator.is.extend,
  sanitize: Sanitization.sanitize,
  sanitizor: Sanitization.sanitizor,
  rule: Rule,
  'sanitizor.extend': Sanitization.sanitizor.extend
}

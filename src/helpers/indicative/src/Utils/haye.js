
/*
 * haye
 *
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import Parser from './haye-parser'
import _ from 'lodash'
const entryMethods = ['fromArray', 'fromJSON', 'fromJson', 'fromQS', 'fromPipe']

let Haye = {}

entryMethods.forEach((method) => {
  Haye[method] = function () {
    const parserInstance = new Parser()
    return parserInstance[method].apply(parserInstance, _.toArray(arguments))
  }
})
/**
 * Get access to the parser instance for advanced stuff
 */
Haye.Parser = Parser

export default Haye
/**
 * patch operators
 */

import { responseStatus } from './response-status';
import { Observable } from 'rxjs/Observable';


export function patchOperators() {
  Observable.prototype.responseStatus = responseStatus;
}


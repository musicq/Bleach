/**
 * patch operators
 */

import { Observable } from 'rxjs/Observable';
import { responseStatus } from './response-status';

export function patchOperators() {
  Observable.prototype.responseStatus = responseStatus;
}

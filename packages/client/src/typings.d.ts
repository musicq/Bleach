/* SystemJS module definition */
declare var module: NodeModule;

interface NodeModule {
  id: string;
}

/**
 * 自定义 rxjs 操作符 d.ts
 */
import { Observable } from 'rxjs/Observable';


declare module 'rxjs/Observable' {
  // members d.ts
  interface Observable<T> {
    responseStatus: <T>() => Observable<T>;
  }

  // static members d.ts
  // namespace Observable {
  //   export let responseStatus: <T>() => Observable<T>;
  // }
}


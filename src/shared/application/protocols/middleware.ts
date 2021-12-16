import { HttpResponse } from ".";

export interface Middleware<T = any> {
  handle(httoRequest: T): Promise<HttpResponse>;
}

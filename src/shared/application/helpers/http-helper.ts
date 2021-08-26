import { HttpResponse } from "../protocols";

export const success = (body?: any): HttpResponse => ({
  status_code: 201,
  body,
});

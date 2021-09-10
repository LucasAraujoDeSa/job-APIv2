import { HttpResponse } from "../protocols";

export const success = (body?: any): HttpResponse => ({
  status_code: 201,
  body,
});

export const badRequest = (message: string): HttpResponse => ({
  status_code: 400,
  body: message,
});

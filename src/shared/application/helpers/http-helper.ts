import { Err, HttpResponse } from "../protocols";

export const ok = (body?: any): HttpResponse => ({
  status_code: 200,
  body,
});

export const success = (body?: any): HttpResponse => ({
  status_code: 201,
  body,
});

export const badRequest = (message: string): HttpResponse => ({
  status_code: 400,
  body: message,
});

export const handleError = (error: Err): HttpResponse => ({
  status_code: error.status_code || 500,
  body: error.message || "Server Error",
});

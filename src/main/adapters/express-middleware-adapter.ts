import { Request, Response, NextFunction } from "express";
import { Middleware } from "@/shared/application/protocols";

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      access_token: req.headers.authorization,
      ...(req.headers || {}),
    };
    const httpResponse = await middleware.handle(request);
    if (httpResponse.status_code === 200) {
      Object.assign(req, httpResponse.body);
      next();
    } else {
      res.status(httpResponse.status_code).json({
        error: httpResponse.body,
      });
    }
  };
};

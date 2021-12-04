import { Request, Response } from "express";
import { Controller } from "@/shared/application/protocols";

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const request = {
      ...(req.body || {}),
      ...(req.params || {}),
    };
    const httpResponse = await controller.handle(request);
    if (httpResponse.status_code >= 200 && httpResponse.status_code <= 299) {
      // 200-299 success case, read more https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
      res.status(httpResponse.status_code).json(httpResponse.body);
    } else {
      res.status(httpResponse.status_code).json({
        error: httpResponse.body,
      });
    }
  };
};

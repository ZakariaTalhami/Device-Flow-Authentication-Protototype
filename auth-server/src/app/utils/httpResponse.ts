import { Response } from "express";

export class HTTPResponse {
  ok = (res: Response, data: any, message: string) =>
    res.status(200).send({
      status: 200,
      message,
      data,
    });

  delete = (res: Response, message: string) =>
    res.status(204).send({
      status: 204,
      message,
    });
}

export const httpResponse = new HTTPResponse();

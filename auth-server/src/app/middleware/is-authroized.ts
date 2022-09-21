import { NextFunction, Request, Response } from "express";
import { HttpErrors } from "../error";

export const isAuthorized = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    // TODO: add authorization logic here

    next();
  };
};

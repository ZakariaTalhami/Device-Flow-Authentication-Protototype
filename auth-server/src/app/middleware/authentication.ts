import { Request, Response, NextFunction } from "express";

export const authenticationMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  // TODO: add authentication logic here

  next();
};

import express, { json, urlencoded, NextFunction, Request, Response } from "express";
import bearerToken from "express-bearer-token";
import { HttpErrorHandlerMiddleware } from "./app/middleware";
import { authenticationMiddleware } from "./app/middleware/authentication";
import { openRouter, secureRouter } from "./app/route";

const app = express();

app.use(json());
app.use(bearerToken());
app.use(urlencoded({ extended: true }));

// OPEN ROUTER
app.use(openRouter);

// AUTHENTICATION
app.use(authenticationMiddleware);

// SECURE ROUTER
app.use(secureRouter);

// Fallback
app.all("*", async (req: Request, res: Response) => {
  res.status(404).send({
    message: "Not Found",
  });
});

// HTTP error handling
app.use(HttpErrorHandlerMiddleware);

app.use(function (err: Error, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

export { app };

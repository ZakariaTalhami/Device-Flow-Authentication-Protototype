import { Request, Response, Router } from "express";
import { httpResponse } from "../../utils/httpResponse";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  httpResponse.ok(
    res,
    {
      random: Math.floor(Math.random() * 100),
    },
    ""
  );
});

export { router as randomNumberRouter };

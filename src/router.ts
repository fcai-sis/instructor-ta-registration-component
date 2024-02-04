import { Router } from "express";
import instructorsRoutes from "features/Instructor/logic/instructors.routes";

export const instructorsRouter = (): Router => {
  const router = Router();
  instructorsRoutes(router);
  return router;
}


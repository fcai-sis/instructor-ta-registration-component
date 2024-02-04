import { Router } from "express";

import teacherAssistantsRoutes from "features/ta/teacherAssistants.routes";

export const teacherAssistantsRouter = (): Router => {
  const router = Router();
  teacherAssistantsRoutes(router);
  return router;
};
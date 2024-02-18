import { Router } from "express";
import instructorsRoutes from "./features/Instructor/logic/instructors.routes";
import teacherAssistantsRoutes from "./features/ta/teacherAssistants.routes";

export const teacherAssistantsRouter = (): Router => {
  const router = Router();
  teacherAssistantsRoutes(router);
  return router;
};
export const instructorsRouter = (): Router => {
  const router = Router();
  instructorsRoutes(router);
  return router;
};
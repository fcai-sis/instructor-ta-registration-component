import { Router } from "express";
import instructorsRoutes from "./features/Instructor/logic/instructors.routes";


const router: Router = Router();

export default (): Router => {
  instructorsRoutes(router);

  return router;
};

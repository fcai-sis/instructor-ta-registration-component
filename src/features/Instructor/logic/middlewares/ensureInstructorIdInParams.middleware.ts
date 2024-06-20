import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";
import * as validator from "express-validator";

const middlewares = [
  validator
    .param("instructorId")

    .exists()
    .withMessage("Instructor ID is required")

    .isMongoId()
    .withMessage("Instructor ID must be a valid Mongo ID"),
  validateRequestMiddleware,
];

const ensureInstructorIdInParamsMiddleware = middlewares;
export default ensureInstructorIdInParamsMiddleware;

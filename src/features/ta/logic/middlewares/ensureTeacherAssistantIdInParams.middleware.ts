import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";
import * as validator from "express-validator";

const middlewares = [
  validator
    .param("teachingAssistantId")

    .exists()
    .withMessage("Teacher Assistant ID is required")

    .isMongoId()
    .withMessage("Teacher Assistant ID must be a valid Mongo ID"),

  validateRequestMiddleware,
];

const ensureTeacherAssitantIdInParamsMiddleware = middlewares;
export default ensureTeacherAssitantIdInParamsMiddleware;

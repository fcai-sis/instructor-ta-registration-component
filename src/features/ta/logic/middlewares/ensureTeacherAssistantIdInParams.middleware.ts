import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";

const middlewares = [
  validator
    .param("teacherAssistantId")

    .exists()
    .withMessage("Teacher Assistant ID is required")

    .isMongoId()
    .withMessage("Teacher Assistant ID must be a valid Mongo ID"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    req.params.teacherAssistantId = req.params.teacherAssistantId.trim();

    next();
  },
];

const ensureTeacherAssitantIdInParamsMiddleware = middlewares;
export default ensureTeacherAssitantIdInParamsMiddleware;

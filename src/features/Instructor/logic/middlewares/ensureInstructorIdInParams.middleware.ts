import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";

const middlewares = [
  validator
    .param("instructorId")

    .exists()
    .withMessage("Instructor ID is required")

    .isMongoId()
    .withMessage("Instructor ID must be a valid Mongo ID"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    req.params.instructorId = req.params.instructorId.trim();

    next();
  },
];

const ensureInstructorIdInParamsMiddleware = middlewares;
export default ensureInstructorIdInParamsMiddleware;

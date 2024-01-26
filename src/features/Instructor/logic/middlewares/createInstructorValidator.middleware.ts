import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";

import logger from "../../../../core/logger";
import { departments } from "features/Instructor/data/models/Instructor.model";

/**
 * Validates the request body of the create Instructor endpoint.
 */
const middlewares = [
  validator
    .body("fullName")

    .exists()
    .withMessage("fullName is required")

    .isString()
    .withMessage("fullName must be a string"),

  validator
    .body("email")

    .exists()
    .withMessage("email is required")

    .isEmail()
    .withMessage("email must be a valid email"),

  validator
    .body("department")

    .exists()
    .withMessage("department is required")

    .isIn(departments)
    .withMessage(`department must be one of these values: ${departments.join(", ")} `),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(
      `Validating create Instructor req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for create Instructor req body: ${JSON.stringify(
          req.body
        )}`
      );

      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    // Attach the validated data to the request body
    req.body.fullName = req.body.fullName.trim();
    req.body.email = req.body.email.trim();
    req.body.department = req.body.department;

    next();
  },
];

const CreateInstructorValidatorMiddleware = middlewares;
export default CreateInstructorValidatorMiddleware;


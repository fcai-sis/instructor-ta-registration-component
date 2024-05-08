import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";

import logger from "../../../../core/logger";
import {
  DepartmentModel,
  TeacherAssistantModel,
} from "@fcai-sis/shared-models";

/**
 * Validates the request body of the create Teacher Assistant endpoint.
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
    .withMessage("email must be a valid email")

    .custom(async (value) => {
      // Check if the email already exists in the database
      const instructor = await TeacherAssistantModel.findOne({ email: value });

      if (instructor) {
        throw new Error("email already exists");
      }

      return true;
    }),

  validator
    .body("department")

    .exists()
    .withMessage("department is required")

    .isMongoId()
    .withMessage("department must be a valid department id")

    .custom(async (value) => {
      // Check if the department exists in the database
      const department = await DepartmentModel.findById(value);

      if (!department) {
        throw new Error("department does not exist");
      }

      return true;
    }),

  (req: Request, res: Response, next: NextFunction) => {
    logger.debug(`Validating create TA req body: ${JSON.stringify(req.body)}`);

    // If any of the validations above failed, return an error response
    const errors = validator.validationResult(req);

    if (!errors.isEmpty()) {
      logger.debug(
        `Validation failed for create TA req body: ${JSON.stringify(req.body)}`
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

const createTeacherAssistantValidatorMiddleware = middlewares;
export default createTeacherAssistantValidatorMiddleware;

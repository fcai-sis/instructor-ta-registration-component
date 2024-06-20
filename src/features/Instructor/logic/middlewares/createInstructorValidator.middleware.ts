import * as validator from "express-validator";
import { NextFunction, Request, Response } from "express";

import logger from "../../../../core/logger";
import { DepartmentModel, InstructorModel } from "@fcai-sis/shared-models";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

/**
 * Validates the request body of the create Instructor endpoint.
 */
const middlewares = [
  validator
    .body("instructor.fullName")

    .exists()
    .withMessage("fullName is required")

    .isString()
    .withMessage("fullName must be a string"),

  validator
    .body("instructor.email")

    .exists()
    .withMessage("email is required")

    .isEmail()
    .withMessage("email must be a valid email")

    .custom(async (value) => {
      // Check if the email already exists in the database
      const instructor = await InstructorModel.findOne({ email: value });

      if (instructor) {
        throw new Error("Instructor with this email already exists");
      }

      return true;
    }),

  validator
    .body("instructor.department")

    .exists()
    .withMessage("department is required")

    .isString()
    .withMessage("department must be a string"),

  validateRequestMiddleware,
];

const createInstructorValidatorMiddleware = middlewares;
export default createInstructorValidatorMiddleware;

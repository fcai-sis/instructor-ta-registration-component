import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

import logger from "../../../../core/logger";
import {
  DepartmentModel,
  TeacherAssistantModel,
} from "@fcai-sis/shared-models";

const updateTeacherAssistantValidator = [
  body("fullName")
    .optional()
    .isString()
    .withMessage("fullName must be a string"),

  body("email")
    .optional()
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

  body("department")
    .optional()
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
    logger.debug(
      `Validating update announcement req body: ${JSON.stringify(req.body)}`
    );

    // If any of the validations above failed, return an error response
    const allowedFields = ["fullName", "email", "department", "user"];
    const receivedFields = Object.keys(req.body);
    const invalidFields = receivedFields.filter(
      (field) => !allowedFields.includes(field)
    );
    if (invalidFields.length > 0) {
      logger.debug(
        `Invalid req body provided ${JSON.stringify(invalidFields)}`
      );
      return res.status(400).json({
        error: {
          message: `Invalid fields provided: ${invalidFields}`,
        },
      });
    }

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.debug(
        `Invalid req body provided ${JSON.stringify(errors.array())}`
      );
      return res.status(400).json({
        error: {
          message: errors.array()[0].msg,
        },
      });
    }

    if (req.body.fullName) req.body.fullName = req.body.fullName.trim();
    if (req.body.email) req.body.email = req.body.email.trim();
    if (req.body.department) req.body.department = req.body.department;

    next();
  },
];

export default updateTeacherAssistantValidator;

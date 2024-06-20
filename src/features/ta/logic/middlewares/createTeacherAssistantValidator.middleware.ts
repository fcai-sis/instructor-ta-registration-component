import * as validator from "express-validator";
import { TeachingAssistantModel } from "@fcai-sis/shared-models";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

/**
 * Validates the request body of the create Ta endpoint.
 */
const middlewares = [
  validator
    .body("teachingAssistant.fullName")

    .exists()
    .withMessage("fullName is required")

    .isString()
    .withMessage("fullName must be a string"),

  validator
    .body("teachingAssistant.email")

    .exists()
    .withMessage("email is required")

    .isEmail()
    .withMessage("email must be a valid email")

    .custom(async (value) => {
      // Check if the email already exists in the database
      const instructor = await TeachingAssistantModel.findOne({ email: value });

      if (instructor) {
        throw new Error("Teaching Assistant with this email already exists");
      }

      return true;
    }),

  validator
    .body("teachingAssistant.department")

    .exists()
    .withMessage("department is required")

    .isString()
    .withMessage("department must be a string"),

  validateRequestMiddleware,
];

const createTaValidatorMiddleware = middlewares;
export default createTaValidatorMiddleware;

import { body } from "express-validator";
import { TeachingAssistantModel } from "@fcai-sis/shared-models";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

const updateTaValidator = [
  body("teachingAssistant.fullName")
    .optional()
    .isString()
    .withMessage("fullName must be a string"),

  body("teachingAssistant.email")
    .optional()
    .isEmail()
    .withMessage("email must be a valid email")
    .custom(async (value) => {
      // Check if the email already exists in the database
      const instructor = await TeachingAssistantModel.findOne({ email: value });

      if (instructor) {
        throw new Error("email already exists");
      }

      return true;
    }),

  body("teachingAssistant.department")
    .optional()
    .isString()
    .withMessage("department must be a string"),

  validateRequestMiddleware,
];

export default updateTaValidator;

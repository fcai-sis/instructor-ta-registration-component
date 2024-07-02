import { body } from "express-validator";
import { InstructorModel } from "@fcai-sis/shared-models";
import { validateRequestMiddleware } from "@fcai-sis/shared-middlewares";

const updateInstructorValidator = [
  body("instructor.fullName")
    .optional()
    .isString()
    .withMessage("fullName must be a string"),

  body("instructor.email")
    .optional()
    .isEmail()
    .withMessage("email must be a valid email")
    .custom(async (value) => {
      // Check if the email already exists in the database
      const instructor = await InstructorModel.findOne({ email: value });

      if (instructor) {
        throw new Error("email already exists");
      }

      return true;
    }),

  body("instructor.department")
    .optional()
    .isString()
    .withMessage("department must be a string"),
  body("instructor.officeHours")
    .optional()
    .isString()
    .withMessage("officeHours must be a string"),

  validateRequestMiddleware,
];

export default updateInstructorValidator;

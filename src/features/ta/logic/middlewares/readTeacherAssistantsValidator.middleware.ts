import { Request, Response, NextFunction } from "express";
import { query, validationResult } from "express-validator";

const readTeacherAsssistantsValidator = [
  query("search").optional().isString().withMessage("Search must be a string"),
  query("department")
    .optional()
    .isString()
    .withMessage("Department must be a string"),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default readTeacherAsssistantsValidator;

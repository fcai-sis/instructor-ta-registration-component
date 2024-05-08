import { Request, Response } from "express";

import { InstructorModel, UserModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {
    fullName: string;
    email: string;
    department: string;
    password: string;
  }
>;

/*
 * Creates an instructor.
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  const { fullName, email, department, password } = req.body;

  const user = new UserModel({ password: password });
  const instructor = new InstructorModel({
    fullName,
    email,
    department,
    userId: user._id,
  });

  await instructor.save();

  const response = {
    message: "Instructor created successfully",
    instructor,
  };

  return res.status(201).json(response);
};

const createInstructorHandler = handler;
export default createInstructorHandler;

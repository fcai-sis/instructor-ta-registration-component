import { Request, Response } from "express";

import { TeacherAssistantModel } from "@fcai-sis/shared-models";
import { UserModel } from "@fcai-sis/shared-models";

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
 * Creates a TA.
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  const { fullName, email, department, password } = req.body;

  const user = new UserModel({ password: password });
  const teacherAssistant = new TeacherAssistantModel({
    fullName,
    email,
    department,
    userId: user._id,
  });

  await teacherAssistant.save();

  const response = {
    message: "TA created successfully",
    teacherAssistant,
  };

  return res.status(201).json(response);
};

const createTeacherAssistantHandler = handler;
export default createTeacherAssistantHandler;

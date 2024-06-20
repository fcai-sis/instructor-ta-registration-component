import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { TeachingAssistantModel } from "@fcai-sis/shared-models";
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

  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await UserModel.create({ password: hashedPassword });
  const teacherAssistant = new TeachingAssistantModel({
    fullName,
    email,
    department,
    user: user._id,
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

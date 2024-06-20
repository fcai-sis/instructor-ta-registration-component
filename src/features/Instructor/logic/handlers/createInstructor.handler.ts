import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  InstructorModel,
  InstructorType,
  UserModel,
} from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {
    instructor: Omit<InstructorType, "user">;
    password: string;
  }
>;

/*
 * Creates an instructor.
 * */
const createInstructorHandler = async (req: HandlerRequest, res: Response) => {
  const { instructor, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await UserModel.create({ password: hashedPassword });
  const createdInstructor = await InstructorModel.create({
    fullName: instructor.fullName,
    department: instructor.department,
    email: instructor.email,
    user: user._id,
  });

  await createdInstructor.save();

  const response = {
    message: "Instructor created successfully",
    instructor: {
      ...createdInstructor.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  };

  return res.status(201).json(response);
};

export default createInstructorHandler;

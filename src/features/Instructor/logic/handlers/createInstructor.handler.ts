import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  InstructorModel,
  InstructorType,
  RoleEnum,
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
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    password: hashedPassword,
    role: RoleEnum[3],
  });
  const createdInstructor = await InstructorModel.create({
    fullName: instructor.fullName,
    department: instructor.department,
    email: instructor.email,
    user: user._id,
    // title: instructor.title,
    ...(instructor.officeHours && { officeHours: instructor.officeHours }),
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

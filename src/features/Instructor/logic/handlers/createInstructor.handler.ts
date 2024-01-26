import { Request, Response } from "express";

import InstructorModel, {DepartmentTypes} from "../../data/models/Instructor.model";

type HandlerRequest = Request<
  {},
  {},
  {
    fullName: string;
    email: string;
    department: DepartmentTypes;
  }
>;

/*
 * Creates an instructor.
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  const { fullName, email, department } = req.body;


  const instructor = new InstructorModel({
    fullName,
    email,
    department,
  });

  await instructor.save();

  const response = {
    instructor: {
      _id: instructor._id,
      fullName: instructor.fullName,
      email: instructor.email,
      department: instructor.department,
    }
  }

  return res.status(201).json(response);
}

const createInstructorHandler = handler;
export default createInstructorHandler;

import { Request, Response } from "express";
import { InstructorModel, InstructorType } from "@fcai-sis/shared-models";

type HandlerRequest = Request<{}, {}, {}, {
  fullName?: string,
  email?: string,
  department?: string,
  skip?: number,
  limit?: number
}>;

/*
 * Reads all Instructors
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  const { fullName, email, department } = req.query;
  // read the instructors from the db
  const instructors = await InstructorModel.find(
    {
      ...(fullName && { fullName: fullName }),
      ...(email && { email: email }),
      ...(department && { department: department }),
    },
    {
      __v: 0,
      // _id: 0, // TODO: should probably not reveal the _id but likely needed for frontend
      user: 0,
    },
    {
      skip: req.skip ?? 0,
      limit: req.query.limit as unknown as number,
    }
  ).populate({
    path: "department",
    select: "-_id -__v",
  });

  const totalInstructors = await InstructorModel.countDocuments({});

  const response = {
    instructors,
    totalInstructors,
  };

  return res.status(200).json(response);
};

const readInstructorsHandler = handler;
export default readInstructorsHandler;

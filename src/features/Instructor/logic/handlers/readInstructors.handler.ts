import { Request, Response } from "express";
import { InstructorModel, InstructorType } from "@fcai-sis/shared-models";

type HandlerRequest = Request<{}, {}, {}, {
  search?: string,
  department?: string,
  skip?: number,
  limit?: number
}>;

/*
 * Reads all Instructors
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  const { search, department, skip, limit } = req.query;
  // read the instructors from the db
  const searchQuery: any = {
    ...(department && { department: department }),
    ...(search && {
      $or: [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ]
    }),
  };

  const instructors = await InstructorModel.find(
    searchQuery,
    {
      __v: 0,
      // _id: 0, // TODO: should probably not reveal the _id but likely needed for frontend
      user: 0,
    },
    {
      skip: skip ?? 0,
      limit: limit as unknown as number,
    }
  ).populate({
    path: "department",
    select: "-_id -__v",
  });

  const totalInstructors = await InstructorModel.countDocuments(searchQuery);

  const response = {
    instructors,
    totalInstructors,
  };

  return res.status(200).json(response);
};

const readInstructorsHandler = handler;
export default readInstructorsHandler;

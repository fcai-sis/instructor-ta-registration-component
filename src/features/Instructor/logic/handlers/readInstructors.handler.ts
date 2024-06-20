import { Request, Response } from "express";
import { InstructorModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request;

/*
 * Reads all Instructors
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  // read the instructors from the db
  const instructors = await InstructorModel.find(
    {},
    {
      __v: 0,
      // _id: 0, // TODO: should probably not reveal the _id but likely needed for frontend
      user: 0,
    },
    {
      skip: req.skip,
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

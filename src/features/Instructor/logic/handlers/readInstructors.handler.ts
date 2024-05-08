import { Request, Response } from "express";
import { InstructorModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request;

/*
 * Reads all Instructors
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  // get the pagination parameters
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  // read the instructors from the db
  const instructors = await InstructorModel.find(
    {},
    {
      __v: 0,
      // _id: 0, // TODO: should probably not reveal the _id but likely needed for frontend
      userId: 0,
    }
  )
    .populate({
      path: "department",
      select: "-_id -__v",
    })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const response = {
    instructors,
    page,
    pageSize,
  };

  return res.status(200).json(response);
};

const readInstructorsHandler = handler;
export default readInstructorsHandler;

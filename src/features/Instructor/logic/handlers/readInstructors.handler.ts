import { Request, Response } from "express";
import InstructorModel from "../../data/models/Instructor.model";


type HandlerRequest = Request;


/*
 * Reads all Instructors
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  // get the pagination parameters
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  // read the instructors from the db
  const instructors = await InstructorModel.find()
    .skip((page - 1) * pageSize) // pagination
    .limit(pageSize);

  return res.status(200).send({
    instructors: instructors.map(instructors => ({
      ...instructors.toObject(),
    })),
  });
};

const readInstructorsHandler = handler;
export default readInstructorsHandler;

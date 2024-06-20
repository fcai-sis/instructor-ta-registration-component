import { Request, Response } from "express";
import { TeachingAssistantModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request;

/*
 * Reads all TAs
 * */
const readTeachingAssistantsHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  // read the instructors from the db
  const teachingAssistants = await TeachingAssistantModel.find(
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

  const totalInstructors = await TeachingAssistantModel.countDocuments({});

  const response = {
    teachingAssistants,
    totalInstructors,
  };

  return res.status(200).json(response);
};

export default readTeachingAssistantsHandler;

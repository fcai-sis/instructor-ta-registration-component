import { Request, Response } from "express";
import { TeachingAssistantModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request;

/*
 * Reads all Teacher Assistants from the database
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  // get the pagination parameters
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  // read the instructors from the db
  const teacherAssistant = await TeachingAssistantModel.find(
    {},
    {
      __v: 0,
      user: 0,
      // _id: 0, TODO: should probably not reveal the _id but likely needed for frontend
    }
  )
    .populate({
      path: "department",
      select: "-_id -__v",
    })
    .skip((page - 1) * pageSize)
    .limit(pageSize);

  const response = {
    teacherAssistant,
    page,
    pageSize,
  };

  return res.status(200).json(response);
};

const readTeacherAssistantsHandler = handler;
export default readTeacherAssistantsHandler;

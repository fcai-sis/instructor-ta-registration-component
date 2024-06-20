import { Request, Response } from "express";
import { TeachingAssistantModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {
    teacherAssistantId: string;
  },
  {},
  {}
>;

/*
 * Find a TA by id.
 * */
const findTeacherAssistantById = async (req: HandlerRequest, res: Response) => {
  const teacherAssistantId = req.params.teacherAssistantId;
  // read the TA from the database
  const teacherAssistant = await TeachingAssistantModel.findById(
    teacherAssistantId,
    {
      __v: 0,
      user: 0,
      // _id: 0,
    }
  ).populate({
    path: "department",
    select: "-_id -__v",
  });

  if (!teacherAssistant) {
    return res.status(404).json({
      error: {
        message: "TA not found",
      },
    });
  }

  return res.status(200).send({
    teacherAssistant,
  });
};
export default findTeacherAssistantById;

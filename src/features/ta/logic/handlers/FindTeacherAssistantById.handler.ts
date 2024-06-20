import { Request, Response } from "express";
import { TeachingAssistantModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {
    teachingAssistantId: string;
  },
  {},
  {}
>;

/*
 * Find a TA by id.
 * */
const findTeachingAssistantByIdHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const teachingAssistantId = req.params.teachingAssistantId;
  // read the TA from the database
  const teachingAssistant = await TeachingAssistantModel.findById(
    teachingAssistantId,
    {
      __v: 0,
      user: 0,
      // _id: 0,
    }
  ).populate({
    path: "department",
    select: "-_id -__v",
  });

  if (!teachingAssistant) {
    return res.status(404).json({
      error: {
        message: "TA not found",
      },
    });
  }

  return res.status(200).send({
    teachingAssistant,
  });
};
export default findTeachingAssistantByIdHandler;

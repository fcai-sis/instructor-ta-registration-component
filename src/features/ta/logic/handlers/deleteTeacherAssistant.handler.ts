import { Request, Response } from "express";
import { TeachingAssistantModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<{ teachingAssistantId: string }>;

/*
 * Deletes a TA.
 * */
const deleteTeacherAssistantHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const teachingAssistant = req.params.teachingAssistantId;

  const deletedTeachingAssistant =
    await TeachingAssistantModel.findByIdAndDelete(teachingAssistant);

  if (!deletedTeachingAssistant) {
    return res.status(404).send({
      error: {
        message: "TA not found",
      },
    });
  }

  return res.status(200).send({
    data: deletedTeachingAssistant,
    message: "TA deleted successfully",
  });
};

export default deleteTeacherAssistantHandler;

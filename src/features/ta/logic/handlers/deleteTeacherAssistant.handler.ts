import { Request, Response } from "express";
import { TeacherAssistantModel } from "@fcai-sis/shared-models";


type HandlerRequest = Request<{ teacherAssistantId: string }>;

/*
 * Deletes a TA.
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  const teacherAssistant = req.params.teacherAssistantId;

  const deletedTeacherAssistant = await TeacherAssistantModel.findByIdAndDelete(
    teacherAssistant
  );

  if (!deletedTeacherAssistant) {
    return res.status(404).send({
      error: {
        message: "TA not found",
      },
    });
  }

  return res.status(200).send({
    data: deletedTeacherAssistant,
    message: "TA deleted successfully",
  });
};

const deleteTeacherAssistantHandler = handler;
export default deleteTeacherAssistantHandler;

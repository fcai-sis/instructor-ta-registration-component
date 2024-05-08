import { Request, Response } from "express";
import { TeacherAssistantModel } from "@fcai-sis/shared-models";

type UpdateHandlerRequest = Request<
  {
    teacherAssistantId: string;
  },
  {},
  { fullName?: string; email?: string; department?: any }
>;

const updateTeacherAssistantHandler = async (
  req: UpdateHandlerRequest,
  res: Response
) => {
  const teacherAssistantId = req.params.teacherAssistantId;
  const { fullName, email, department } = req.body;

  // Check if the teacher assistant exists
  const teacherAssistant = await TeacherAssistantModel.findByIdAndUpdate(
    teacherAssistantId,
    {
      ...(fullName && { fullName }),
      ...(email && { email }),
      ...(department && { department }),
    },
    { new: true }
  );

  if (!teacherAssistant) {
    return res.status(404).json({
      error: {
        message: "Teacher Assistant not found",
      },
    });
  }

  const response = {
    teacherAssistant: {
      _id: teacherAssistant._id,
      fullName: teacherAssistant.fullName,
      email: teacherAssistant.email,
      department: teacherAssistant.department,
    },
  };

  return res.status(200).json(response);
};

export default updateTeacherAssistantHandler;

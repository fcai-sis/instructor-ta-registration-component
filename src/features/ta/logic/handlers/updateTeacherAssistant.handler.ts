import { Request, Response } from "express";
import TeacherAssistantModel, { DepartmentTypes } from "../../data/models/TeacherAssistantmodel";

//TODO: Create middleware to check for if user authorized to update Teacher Assistant
type UpdateHandlerRequest = Request<
  {
    teacherAssistantId: string;
  },
  {},
  { fullName?: string; email?: string; department?: DepartmentTypes }
>;

const updateTeacherAssistantHandler = async (
  req: UpdateHandlerRequest,
  res: Response
) => {
  const teacherAssistantId = req.params.teacherAssistantId;

  if (req.body.email) {
    const email = req.body.email;
    const existingTeacherAssistant = await TeacherAssistantModel.findOne({ email });
    if (existingTeacherAssistant) {
      return res.status(400).json({ error: "Email already exists" });
    }
  }

  // Check if the teacher assistant exists
  const teacherAssistant = await TeacherAssistantModel.findByIdAndUpdate(
    teacherAssistantId,
    { ...req.body },
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

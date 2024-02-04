import { Request, Response } from "express";

import TeacherAssistantModel , { DepartmentTypes }from "../../data/models/TeacherAssistantmodel";

type HandlerRequest = Request<
  {},
  {},
  {
    fullName: string;
    email: string;
    department: DepartmentTypes;
  }
>;

/*
 * Creates an TA.
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  const { fullName, email, department } = req.body;
  const existingTeacherAssistant = await TeacherAssistantModel.findOne({ email });

  if (existingTeacherAssistant) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const teacherAssistant = new TeacherAssistantModel({
    fullName,
    email,
    department,
  });

  await teacherAssistant.save();

  const response = {
    teacherAssistant: {
      _id: teacherAssistant._id,
      fullName: teacherAssistant.fullName,
      email: teacherAssistant.email,
      department: teacherAssistant.department,
    }
  }

  return res.status(201).json(response);
}

const createTeacherAssistantHandler = handler;
export default createTeacherAssistantHandler;

import { Request, Response } from "express";
import TeacherAssistantModel from "../../data/models/TeacherAssistantmodel";


type HandlerRequest = Request;


/*
 * Reads all Teacher Assistants from the database
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  // get the pagination parameters
  const page = req.context.page;
  const pageSize = req.context.pageSize;

  // read the instructors from the db
  const teacherAssistants = await TeacherAssistantModel.find()
    .skip((page - 1) * pageSize) // pagination
    .limit(pageSize);

  return res.status(200).send({
    teacherAssistants: teacherAssistants.map(teacherAssistants => ({
      ...teacherAssistants.toObject(),
    })),
  });
};

const readTeacherAssistantsHandler = handler;
export default readTeacherAssistantsHandler;

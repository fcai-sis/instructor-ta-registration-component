import { Request, Response } from "express";
import TeacherAssistantModel from "../../data/models/TeacherAssistantmodel";


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
    const teacherAssistant = await TeacherAssistantModel.findById(teacherAssistantId);
    
    if (!teacherAssistant) {
        return res.status(404).json({
        error: {
            message: "TA not found",
        },
        });
    }
    
    return res.status(200).send({
      teacherAssistant: {
        ...teacherAssistant.toObject(),
        },
    });
    }
    export default findTeacherAssistantById;
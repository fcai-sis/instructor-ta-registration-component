import { Request, Response } from "express";
import InstructorModel from "../../data/models/Instructor.model";


type HandlerRequest = Request<
  {
    instructorId: string;
  },
  {},
  {}
>;

/*
 * Find Instructor by Id
 * */
const findInstructorById = async (req: HandlerRequest, res: Response) => {
    const instructorId = req.params.instructorId;
    // read the instructor from the db
    const instructor = await InstructorModel.findById(instructorId);
    
    if (!instructor) {
        return res.status(404).json({
        error: {
            message: "Instructor not found",
        },
        });
    }
    
    return res.status(200).send({
        instructor: {
        ...instructor.toObject(),
        },
    });
    }
    export default findInstructorById;
    

import { Request, Response } from "express";
import { InstructorModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<{ instructorId: string }>;

/*
 * Deletes an instructor
 * */
const deleteInstructorHandler = async (req: HandlerRequest, res: Response) => {
  const instructor = req.params.instructorId;

  const deletedInstructor = await InstructorModel.findByIdAndDelete(instructor);

  if (!deletedInstructor) {
    return res.status(404).send({
      errors: [
        {
          message: "Instructor not found",
        },
      ],
    });
  }

  return res.status(200).send({
    instructor: deletedInstructor,
    message: "Instructor deleted successfully",
  });
};

export default deleteInstructorHandler;

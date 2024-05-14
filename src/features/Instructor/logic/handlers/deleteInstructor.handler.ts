import { Request, Response } from "express";
import { InstructorModel } from "@fcai-sis/shared-models";

type HandlerRequest = Request<{ instructorId: string }>;

/*
 * Deletes an instructor
 * */
const handler = async (req: HandlerRequest, res: Response) => {
  const instructor = req.params.instructorId;

  const deletedInstructor = await InstructorModel.findByIdAndDelete(instructor);

  if (!deletedInstructor) {
    return res.status(404).send({
      error: {
        message: "Instructor not found",
      },
    });
  }

  return res.status(200).send({
    instructor: deletedInstructor,
    message: "Instructor deleted successfully",
  });
};

const deleteInstructorHandler = handler;
export default deleteInstructorHandler;

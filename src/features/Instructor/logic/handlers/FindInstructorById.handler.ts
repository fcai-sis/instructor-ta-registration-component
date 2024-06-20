import { Request, Response } from "express";
import { InstructorModel } from "@fcai-sis/shared-models";

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
  const instructor = await InstructorModel.findById(instructorId, {
    __v: 0,
    // _id: 0,
    user: 0,
  }).populate({
    path: "department",
    select: "-_id -__v",
  });

  if (!instructor) {
    return res.status(404).json({
      error: {
        message: "Instructor not found",
      },
    });
  }

  return res.status(200).send({
    instructor,
  });
};
export default findInstructorById;

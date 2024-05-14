import { Request, Response } from "express";
import { InstructorModel } from "@fcai-sis/shared-models";

type UpdateHandlerRequest = Request<
  {
    instructorId: string;
  },
  {},
  { fullName?: string; email?: string; department?: string }
>;

const updateInstructorHandler = async (
  req: UpdateHandlerRequest,
  res: Response
) => {
  const instructorId = req.params.instructorId;
  const { fullName, email, department } = req.body;

  const instructor = await InstructorModel.findByIdAndUpdate(
    instructorId,
    {
      ...(fullName && { fullName }),
      ...(email && { email }),
      ...(department && { department }),
    },
    { new: true }
  );

  if (!instructor) {
    return res.status(404).json({
      error: {
        message: "Instructor not found",
      },
    });
  }

  const response = {
    instructor: {
      _id: instructor._id,
      fullName: instructor.fullName,
      email: instructor.email,
      department: instructor.department,
    },
  };

  return res.status(200).json(response);
};

export default updateInstructorHandler;

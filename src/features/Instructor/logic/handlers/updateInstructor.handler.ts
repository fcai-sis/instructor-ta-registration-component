import { Request, Response } from "express";
import { InstructorModel, InstructorType } from "@fcai-sis/shared-models";

type UpdateHandlerRequest = Request<
  {
    instructorId: string;
  },
  {},
  {
    instructor: Partial<InstructorType>;
  }
>;

const updateInstructorHandler = async (
  req: UpdateHandlerRequest,
  res: Response
) => {
  const instructorId = req.params.instructorId;
  const { instructor } = req.body;

  const updatedInstructor = await InstructorModel.findByIdAndUpdate(
    instructorId,
    {
      ...(instructor.fullName && { fullName: instructor.fullName }),
      ...(instructor.email && { email: instructor.email }),
      ...(instructor.department && { department: instructor.department }),
    },
    { new: true, runValidators: true }
  );

  if (!updatedInstructor) {
    return res.status(404).json({
      error: {
        message: "Instructor not found",
      },
    });
  }

  const response = {
    message: "Instructor updated successfully",
    instructor: {
      ...updatedInstructor.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  };

  return res.status(200).json(response);
};

export default updateInstructorHandler;

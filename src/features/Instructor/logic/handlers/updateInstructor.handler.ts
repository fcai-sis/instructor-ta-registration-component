import { Request, Response } from "express";
import InstructorModel, { DepartmentTypes } from "../../data/models/Instructor.model";

//TODO: Create middleware to check for if user authorized to update announcement
type UpdateHandlerRequest = Request<
  {
    instructorId: string;
  },
  {},
  { fullName?: string; email?: string; department?: DepartmentTypes }
>;

const updateInstructorHandler = async (
  req: UpdateHandlerRequest,
  res: Response
) => {
  const instructorId = req.params.instructorId;

  if (req.body.email) {
    const email = req.body.email;
    const existingInstructor = await InstructorModel.findOne({ email });
    if (existingInstructor) {
      return res.status(400).json({ error: "Email already exists" });
    }
  }

  // Check if the announcement exists
  const instructor = await InstructorModel.findByIdAndUpdate(
    instructorId,
    { ...req.body },
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

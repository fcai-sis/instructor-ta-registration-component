import { Request, Response } from "express";
import { InstructorModel } from "@fcai-sis/shared-models";
import { TokenPayload } from "@fcai-sis/shared-middlewares";

type HandlerRequest = Request<
  {},
  {},
  {
    user: TokenPayload;
  }
>;

/*
 * Find authenticated Instructor
 * */
const findAuthenticatedInstructorHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { user } = req.body;
  // read the instructor from the db
  const instructor = await InstructorModel.findOne(
    {
      user: user.userId,
    },
    {
      __v: 0,
      // _id: 0,
      user: 0,
    }
  ).populate({
    path: "department",
    select: "-_id -__v",
  });

  if (!instructor) {
    return res.status(404).json({
      errors: [
        {
          message: "Instructor not found",
        },
      ],
    });
  }

  return res.status(200).send({
    instructor,
  });
};
export default findAuthenticatedInstructorHandler;

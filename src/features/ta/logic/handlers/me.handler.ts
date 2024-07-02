import { Request, Response } from "express";
import { TeachingAssistantModel } from "@fcai-sis/shared-models";
import { TokenPayload } from "@fcai-sis/shared-middlewares";

type HandlerRequest = Request<
  {},
  {},
  {
    user: TokenPayload;
  }
>;

/*
 * Find authenticated TA
 * */
const findAuthenticatedTaHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  const { user } = req.body;
  // read the instructor from the db
  const teachingAssistant = await TeachingAssistantModel.findOne(
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

  if (!teachingAssistant) {
    return res.status(404).json({
      errors: [
        {
          message: "TA not found",
        },
      ],
    });
  }

  return res.status(200).send({
    teachingAssistant,
  });
};
export default findAuthenticatedTaHandler;

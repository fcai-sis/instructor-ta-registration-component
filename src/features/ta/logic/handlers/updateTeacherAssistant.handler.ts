import { Request, Response } from "express";
import {
  TeachingAssistantModel,
  TeachingAssistantType,
} from "@fcai-sis/shared-models";

type UpdateHandlerRequest = Request<
  {
    teachingAssistantId: string;
  },
  {},
  {
    teachingAssistant: Partial<TeachingAssistantType>;
  }
>;

const updateTeachingAssistantHandler = async (
  req: UpdateHandlerRequest,
  res: Response
) => {
  const teachingAssistantId = req.params.teachingAssistantId;
  const { teachingAssistant } = req.body;

  const updatedTa = await TeachingAssistantModel.findByIdAndUpdate(
    teachingAssistantId,
    {
      ...(teachingAssistant.fullName && {
        fullName: teachingAssistant.fullName,
      }),
      ...(teachingAssistant.email && { email: teachingAssistant.email }),
      ...(teachingAssistant.department && {
        department: teachingAssistant.department,
      }),
    },
    { new: true, runValidators: true }
  );

  if (!updatedTa) {
    return res.status(404).json({
      errors: [
        {
          message: "Teaching Assistant not found",
        },
      ],
    });
  }

  const response = {
    message: "Teaching Assistant updated successfully",
    instructor: {
      ...updatedTa.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  };

  return res.status(200).json(response);
};

export default updateTeachingAssistantHandler;

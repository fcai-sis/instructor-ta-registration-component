import { Request, Response } from "express";
import {
  DepartmentModel,
  TeachingAssistantModel,
} from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {},
  {
    search?: string;
    department?: string;
    title?: string;
    limit?: number;
  }
>;

/*
 * Reads all TAs
 * */
const readTeachingAssistantsHandler = async (
  req: HandlerRequest,
  res: Response
) => {
  // read the instructors from the db
  const { search, department, title, limit } = req.query;

  const searchQuery: any = {
    ...(department && {
      department: await DepartmentModel.find({ code: department }),
    }),
    ...(title && {
      title,
    }),
    ...(search && {
      $or: [
        { fullName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ],
    }),
  };

  const teachingAssistants = await TeachingAssistantModel.find(
    searchQuery,
    {
      __v: 0,
      // _id: 0, // TODO: should probably not reveal the _id but likely needed for frontend
      user: 0,
    },
    {
      skip: req.skip ?? 0,
      limit: limit as unknown as number,
    }
  ).populate({
    path: "department",
    select: "-_id -__v",
  });

  const totalTeachingAssistants = await TeachingAssistantModel.countDocuments(
    searchQuery
  );

  const response = {
    teachingAssistants,
    totalTeachingAssistants,
  };

  return res.status(200).json(response);
};

export default readTeachingAssistantsHandler;

import { Request, Response } from "express";
import bcrypt from "bcrypt";
import {
  TeachingAssistantType,
  TeachingAssistantModel,
  UserModel,
  RoleEnum,
  DepartmentModel,
} from "@fcai-sis/shared-models";

type HandlerRequest = Request<
  {},
  {},
  {
    teachingAssistant: Omit<TeachingAssistantType, "user">;
    password: string;
  }
>;

/*
 * Creates a teaching assistant.
 * */
const createTaHandler = async (req: HandlerRequest, res: Response) => {
  const { teachingAssistant, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password, 10);

  const user = await UserModel.create({
    password: hashedPassword,
    role: RoleEnum[4],
  });

  const department = await DepartmentModel.findOne({
    code: teachingAssistant.department,
  });

  if (!department) {
    return res.status(400).json({
      errors: [
        {
          message: "Department not found",
        },
      ],
    });
  }

  const createdTa = await TeachingAssistantModel.create({
    fullName: teachingAssistant.fullName,
    department: department._id,
    email: teachingAssistant.email,
    user: user._id,
    title: teachingAssistant.title,
    ...(teachingAssistant.officeHours && {
      officeHours: teachingAssistant.officeHours,
    }),
  });

  await createdTa.save();

  const response = {
    message: "Teaching Assistant created successfully",
    ta: {
      ...createdTa.toJSON(),
      _id: undefined,
      __v: undefined,
    },
  };

  return res.status(201).json(response);
};

export default createTaHandler;

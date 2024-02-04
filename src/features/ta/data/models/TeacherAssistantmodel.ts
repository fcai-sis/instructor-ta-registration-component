import mongoose, { InferSchemaType, Schema } from "mongoose";

export const departments = ["IS", "Cs", "AI", "IT","Ds"] as const;
export type DepartmentTypes = typeof departments[number];

const teacherAssistantSchema: Schema = new Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  department: {
    //TODO: Change the type to be a reference to the Department model
    // type: Types.ObjectId,
    // ref: "Department",
    // required: true,
    type: String,
    enum: departments,
    required: true,
  },
});

export type TeacherAssistantType = InferSchemaType<typeof teacherAssistantSchema>;

export const teacherAssistantModelName = "TeacherAssistant";

const TeacherAssistantModel = mongoose.model<TeacherAssistantType>(
  teacherAssistantModelName,
  teacherAssistantSchema
);

export default TeacherAssistantModel;

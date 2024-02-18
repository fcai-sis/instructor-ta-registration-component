import mongoose, { InferSchemaType, Schema } from "mongoose";

export const departments = ["IS", "Cs", "AI", "IT","Ds"] as const;
export type DepartmentTypes = typeof departments[number];

const instructorSchema: Schema = new Schema({
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

export type InstructorType = InferSchemaType<typeof instructorSchema>;

export const instructorModelName = "Instructor";

const InstructorModel = mongoose.model<InstructorType>(
  instructorModelName,
  instructorSchema
);

export default InstructorModel;

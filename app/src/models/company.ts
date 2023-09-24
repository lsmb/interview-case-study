import { Schema, model } from "mongoose";

const CompanySchema = new Schema({
  name: { type: String, required: true },
  balance: { type: Number, required: true },
  limit: { type: Number, required: true },
});

export default model("Company", CompanySchema);

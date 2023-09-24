import { Schema, model } from "mongoose";

const CardDetailSchema = new Schema({
  company: { type: Schema.Types.ObjectId, required: true, ref: "Company" },
  cardNumber: { type: String, required: true, minlength: 16, maxlength: 16 },
  cardHolderName: { type: String, required: true },
  expirationMonth: { type: Number, required: true, min: 0, max: 11 },
  expirationYear: { type: Number, required: true },
  cvv: { type: String, required: true, maxlength: 3 },
  active: { type: Boolean, required: true },
  balance: { type: Number, required: true },
  limit: { type: Number, required: true }
});

export default model("CardDetail", CardDetailSchema);

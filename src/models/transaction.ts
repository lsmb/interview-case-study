import { Schema, model } from "mongoose";

export enum TRANSACTION_TYPES {
  PreAuthorization = "PRE_AUTHORIZATION",
  Authorization = "AUTHORIZATION",
  Capture = "CAPTURE",
  Purchase = "PURCHASE",
  Refund = "REFUND",
  Void = "VOID",
  Chargeback = "CHARGEBACK",
  Verification = "VERIFICATION",
  Settlement = "SETTLEMENT"
}

const TransactionSchema = new Schema({
  company: { type: Schema.Types.ObjectId, required: true, ref: "Company" },
  transactionId: { type: String, required: true },
  // For simplicity's sake I'm using a Date format for this,
  // but likely it should be a UNIX epoch
  transactionDate: { type: Date, required: true },
  transactionType: { type: String, enum: TRANSACTION_TYPES, required: true },
  amount: { type: Number, required: true },
  cardDetails: { type: Schema.Types.ObjectId, required: true, ref: "CardDetail" },
  recipient: {
    merchantName: String,
    location: String,
    bankAccountNumber: { type: String, required: true, minlength: 5, maxlength: 17 }
  },
  description: { type: String },
});

export default model("Transaction", TransactionSchema);

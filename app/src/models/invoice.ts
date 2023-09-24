import { Schema, model } from "mongoose";

// Skipping marking required fields, for times' sake
const InvoiceSchema = new Schema({
  company: { type: Schema.Types.ObjectId, required: true, ref: "Company" },
  invoiceNumber: String,
  issueDate: Date,
  dueDate: Date,
  seller: {
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
  },
  buyer: {
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      postalCode: String,
      country: String,
    },
  },
  items: [
    {
      itemName: String,
      quantity: Number,
      unitPrice: Number,
    },
  ],
  totals: {
    subTotal: Number,
    tax: Number,
    totalAmount: Number,
  },
  paymentStatus: String,
});

export default model("Invoice", InvoiceSchema);

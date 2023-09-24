import { connect, connection } from "mongoose";
import 'dotenv/config'
import Company from '../src/models/company'
import CardDetail from '../src/models/card_detail'
import Invoice from '../src/models/invoice'
import Transaction, { TRANSACTION_TYPES } from '../src/models/transaction'
import { randomInt, randomUUID } from "crypto";
import { generateRandomNumberString, randomEnumValue } from "../src/utils/general";

const mongoDB = process.env.MONGODB_TEST_URL || "mongodb://127.0.0.1/qred";

before(() => {
  connect(mongoDB);
  connection
    .on("error", error => console.warn("Warning", error));
});

beforeEach(async () => {
  await Company.deleteMany({})
  await CardDetail.deleteMany({})

  const testCompany = new Company({
    name: "Company 1",
    balance: randomInt(10000),
    limit: randomInt(10000, 20000),
  })
  await testCompany.save()

  const invoice = new Invoice({
    company: testCompany,
    invoiceNumber: "INV2023001",
    issueDate: new Date("2023-09-23T14:30:00Z"),
    dueDate: new Date("2023-10-23T14:30:00Z"),
    seller: {
      name: "ABC Company",
      address: {
        street: "123 Seller St",
        city: "Seller City",
        state: "Seller State",
        postalCode: "12345",
        country: "Seller Country"
      }
    },
    buyer: {
      name: "XYZ Corporation",
      address: {
        street: "456 Buyer St",
        city: "Buyer City",
        state: "Buyer State",
        postalCode: "54321",
        country: "Buyer Country"
      }
    },
    items: [
      {
        itemName: "Product 1",
        quantity: 2,
        unitPrice: 50.00
      },
      {
        itemName: "Product 2",
        quantity: 1,
        unitPrice: 30.00
      }
    ],
    totals: {
      subTotal: 130.00,
      tax: 10.40,
      totalAmount: 140.40
    },
    paymentStatus: "unpaid"
  })
  await invoice.save()

  const cardDetail = new CardDetail({
    company: testCompany,
    cardHolderName: "Example Holder Name",
    cardNumber: generateRandomNumberString(16),
    expirationMonth: randomInt(11),
    expirationYear: randomInt(23, 30),
    cvv: randomInt(999),
    active: true,
    balance: randomInt(200),
    limit: randomInt(200, 400)
  })

  await cardDetail.save();

  Array.from(Array(3), async () => {
    const transaction = new Transaction({
      company: testCompany,
      transactionId: randomUUID(),
      transactionDate: new Date(),
      transactionType: randomEnumValue(TRANSACTION_TYPES),
      amount: randomInt(300),
      cardDetails: cardDetail,
      recipient: {
        merchantName: `Example merchant ${randomInt(10)}`,
        location: `Example location ${randomInt(10)}`,
        bankAccountNumber: generateRandomNumberString(16)
      },
      description: `Random description ${randomInt(10)}`,
    });

    await transaction.save();
  })
});

import { Router, Request, Response } from 'express';
import Company from '../models/company'
import Transaction from '../models/transaction'
import Invoice from '../models/invoice'
import { BackendError, COMPANY_NOT_FOUND, NOT_FOUND } from '../utils/error'

export const company = Router();


// Gets basic company details
company.get('/:id', async (req: Request, res: Response, next) => {
  try {
    // In practice, we would be getting id from some kind of authentication
    // middlewares context
    const { id } = req.params

    const company = await Company.where({ name: `Company ${id}` })
      .findOne()
    if (!company) throw new BackendError(COMPANY_NOT_FOUND)

    const invoices = await Invoice.where({ company })
      .find()

    return res.json({ company, invoices })
  } catch (error) {
    next(error)
  }
})

company.get('/:id/transactions', async (req: Request, res: Response, next) => {
  try {
    const { id } = req.params

    const company = await Company.where({ name: `Company ${id}` }).findOne()
    if (!company) throw new BackendError(COMPANY_NOT_FOUND)

    const transactions = await Transaction.where({ company: company })
      .find()
      .sort({ transactionDate: -1 })
      .select({
        transactionDate: 1,
        transactionType: 1,
        amount: 1,
        recipient: 1
      })

    return res.json({ transactions })
  } catch (error) {
    next(error)
  }
})

company.get('/:id/transactions/:transactionId', async (req: Request, res: Response, next) => {
  try {
    const { id, transactionId } = req.params

    const company = await Company.where({ name: `Company ${id}` }).findOne()
    if (!company) throw new BackendError(COMPANY_NOT_FOUND)

    const transaction = await Transaction.where({ _id: transactionId, company })
      .findOne().populate(['cardDetails'])

    if (!transaction) throw new BackendError(NOT_FOUND)

    return res.json(transaction)
  } catch (error) {
    next(error)
  }
})

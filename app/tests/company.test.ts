import supertest from 'supertest';

import assert from 'assert';
import { app } from '../src/app';

describe('GET /company/:id', () => {

  it('Can get correct company details', async () => {
    const res = await supertest(app)
      .get('/company/1')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')

    assert.equal(res.body['company'].name, 'Company 1')
    assert.equal(res.body['invoices'][0].invoiceNumber, 'INV2023001')
  });
  it('Cannot get non-existing company details', async () => {
    await supertest(app)
      .get('/company/2')
      .expect(404)
  });
});

describe('GET /company/:id/transactions', () => {
  it('Can get own transactions', async () => {
    const res = await supertest(app)
      .get('/company/1/transactions')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')

    assert.equal(res.body['transactions'].length, 3)
  });
});

describe('GET /company/:id/transactions/:transactionId', () => {
  it('Can get individual transactions details', async () => {
    const transactionsRes = await supertest(app)
      .get('/company/1/transactions')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')

    const transactions = transactionsRes.body['transactions']
    assert.equal(transactions.length, 3)

    const res = await supertest(app)
      .get(`/company/1/transactions/${transactions[0]._id}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')

    const keys = Object.keys(res.body)
    const fieldsFound = ['recipient', 'cardDetails'].every((key) => keys.includes(key))
    assert.equal(fieldsFound, true)
  });
});

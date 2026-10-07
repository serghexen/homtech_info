import assert from 'node:assert/strict'
import test from 'node:test'
import { readToken, shouldPoll, topupRequest } from '../src/utils/steamTopup.js'

const token = '00000000-0000-4000-8000-000000000000.' + 'a'.repeat(64)
test('only a full capability token is accepted, never amount or order id', () => {
  assert.equal(readToken('#topup=' + token), token)
  for (const value of ['#amount=100', '#topup=100', '#topup=<script>', '', '#topup=' + token + 'x']) assert.equal(readToken(value), '')
})
test('completed and invalid links stop polling', () => {
  for (const state of ['succeeded','failed','expired','cancelled','ready']) assert.equal(shouldPoll(state), false)
  for (const state of ['queued','processing','attention',undefined]) assert.equal(shouldPoll(state), true)
})
test('submit keeps the supplied idempotency key and never sends credentials in URL', async () => {
  const payload = { token, account: 'test_account', request_key: 'same-request' }
  const requests = []
  const fetcher = async (...args) => { requests.push(args); return { ok:true, json:async()=>({state:'queued'}) } }
  await topupRequest('submit',payload,fetcher)
  await topupRequest('submit',payload,fetcher)
  assert.deepEqual(requests[0], requests[1])
  assert.equal(requests[0][0], '/topup-api/submit')
  assert.equal(requests[0][1].credentials, 'omit')
  assert.deepEqual(JSON.parse(requests[0][1].body),payload)
  await assert.rejects(topupRequest('pay',payload,fetcher))
})

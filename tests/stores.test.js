import assert from 'node:assert/strict'
import test from 'node:test'
import { resolveStore } from '../src/config/stores.js'

test('production hostname resolves JoyCards', () => {
  assert.equal(resolveStore('market.homtech.app').code, 'joycards')
})

test('unknown hostname uses JoyCards fallback', () => {
  assert.equal(resolveStore('preview.example').name, 'JoyCards')
})

test('JoyCards contacts use secure external links', () => {
  const store = resolveStore('market.homtech.app')
  assert.deepEqual(store.contacts.map((contact) => contact.code), ['telegram', 'vk', 'max'])
  assert.ok(store.contacts.every((contact) => contact.url.startsWith('https://')))
})

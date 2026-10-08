import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const appSource = readFileSync(new URL('../src/App.vue', import.meta.url), 'utf8')
const indexSource = readFileSync(new URL('../index.html', import.meta.url), 'utf8')

test('header logo is not an interactive control', () => {
  const headerMarkup = appSource.match(/<header[\s\S]*?<\/header>/)?.[0]

  assert.ok(headerMarkup)
  assert.match(headerMarkup, /<BrandLogo\s*\/>/)
  assert.doesNotMatch(headerMarkup, /<(a|button)\b/)
})

test('page uses the JoyCards PNG favicon', () => {
  assert.match(indexSource, /<link rel="icon" type="image\/png"[^>]+href="\/joycards-favicon\.png"/)
})

test('Steam form is conditional and personal link changes remount it', () => {
  assert.match(appSource, /<SteamTopup v-if="showTopup" :key="routeHash"/)
  assert.match(appSource, /<template v-else>[\s\S]*?store.heroTitleLead/)
  assert.match(appSource, /addEventListener\('hashchange', syncRoute\)/)
  assert.match(appSource, /removeEventListener\('hashchange', syncRoute\)/)
})

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { readToken, topupRequest, shouldPoll } from '../utils/steamTopup.js'

const props = defineProps({ copy: { type: Object, required: true } })
const token = readToken(window.location.hash)
const preview = import.meta.env.DEV && new URLSearchParams(window.location.search).get('preview') === 'steam'
const data = ref(preview ? { amount: '100.00', currency: 'RUB', state: 'ready', can_submit: true } : null)
const account = ref('')
const loading = ref(Boolean(token))
const sending = ref(false)
const error = ref('')
let timer
let requestKey
let disposed = false
const canSubmit = computed(() => data.value?.can_submit && !loading.value && !sending.value)
const amount = computed(() => data.value ? new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 2 }).format(Number(data.value.amount)) : '—')
const stateText = computed(() => props.copy.states[data.value?.state] || '')

function schedule() {
  clearTimeout(timer)
  if (!disposed && token && shouldPoll(data.value?.state)) timer = setTimeout(refresh, 4000)
}

async function refresh() {
  try {
    const previousState = data.value?.state
    data.value = await topupRequest('status', { token })
    if (previousState && previousState !== 'ready' && data.value.state === 'ready') requestKey = null
    if (data.value.account) account.value = data.value.account
    error.value = ''
  } catch {
    error.value = props.copy.networkError
  } finally {
    loading.value = false
    schedule()
  }
}

async function submit() {
  if (!canSubmit.value || preview) return
  sending.value = true
  error.value = ''
  // После потери ответа сохраняем тот же ключ: сервер вернёт прежнюю попытку.
  requestKey ||= crypto.randomUUID()
  try {
    data.value = await topupRequest('submit', { token, account: account.value.trim(), request_key: requestKey })
    if (data.value.state === 'ready') requestKey = null
  } catch (failure) {
    error.value = failure.message || props.copy.networkError
  } finally {
    sending.value = false
    schedule()
  }
}

onMounted(() => { if (token) refresh() })
onBeforeUnmount(() => { disposed = true; clearTimeout(timer) })
</script>

<template>
  <div class="steam-topup">
    <p class="availability"><span></span>{{ preview ? copy.preview : copy.eyebrow }}</p>
    <h1 id="hero-title">{{ copy.title }} <em>Steam</em></h1>
    <div class="steam-topup__amount"><span>{{ copy.amountLabel }}</span><strong>{{ amount }} <small>₽</small></strong></div>
    <form class="steam-topup__form" @submit.prevent="submit">
      <label for="steam-login">{{ copy.loginLabel }}</label>
      <div class="steam-topup__controls">
        <input
          id="steam-login" v-model="account" name="steam-login" type="text" :placeholder="copy.placeholder"
          autocomplete="off" autocapitalize="none" spellcheck="false" maxlength="100" minlength="2"
          pattern="[A-Za-z0-9_]{2,100}" required :disabled="!canSubmit" aria-describedby="steam-login-hint"
        />
        <button type="submit" :disabled="!canSubmit || !account.trim() || preview">{{ sending ? copy.sending : copy.button }}</button>
      </div>
      <p id="steam-login-hint" class="steam-topup__hint">{{ copy.loginHint }}</p>
    </form>
    <div class="steam-topup__status" :class="{ 'steam-topup__status--success': data?.state === 'succeeded' }" aria-live="polite">
      <p v-if="loading">{{ copy.loading }}</p>
      <p v-else-if="!token && !preview">{{ copy.missingLink }}</p>
      <template v-else-if="data && data.state !== 'ready'">
        <strong>{{ stateText }}</strong>
        <p v-if="data.account">{{ copy.accountLabel }}: {{ data.account }}</p>
      </template>
      <p v-else-if="data && !data.can_submit">{{ copy.paused }}</p>
      <p v-if="data?.public_message">{{ data.public_message }}</p>
      <p v-if="error" role="alert">{{ error }}</p>
      <button v-if="error && token" type="button" class="steam-topup__refresh" @click="refresh">{{ copy.refresh }}</button>
    </div>
    <p class="steam-topup__conversion">{{ copy.conversion }}</p>
  </div>
</template>

<style scoped>
.steam-topup { max-width: 620px; }
.steam-topup h1 { font-size: clamp(38px, 4.3vw, 58px); line-height: 1.06; }
.steam-topup__amount { display: flex; align-items: baseline; justify-content: flex-start; gap: 16px; margin-top: 24px; padding: 0 0 18px; border-bottom: 1px solid var(--line); }
.steam-topup__amount > span { color: #c8cee1; font-size: 16px; }
.steam-topup__amount strong { font-size: 34px; line-height: 1; letter-spacing: -.04em; font-variant-numeric: tabular-nums; }
.steam-topup__amount small { color: var(--muted); font-size: 22px; font-weight: 500; }
.steam-topup__form { margin-top: 20px; }
.steam-topup__form label { display: block; margin-bottom: 9px; font-size: 13px; font-weight: 700; }
.steam-topup__controls { display: flex; gap: 8px; max-width: 480px; }
.steam-topup__controls input { min-width: 0; flex: 1; height: 44px; padding: 0 12px; border: 1px solid #465078; border-radius: 12px; background: #090f2b; color: white; font: inherit; font-size: 14px; }
.steam-topup__controls input::placeholder { color: #8e98b8; }
.steam-topup__controls button { padding: 0 17px; font-size: 13px; border: 1px solid #a66cff; border-radius: 12px; background: #8d42f5; color: #fff; font-weight: 750; cursor: pointer; }
.steam-topup__controls button:hover:not(:disabled) { background: #9b56ff; }
.steam-topup__controls :disabled { opacity: .5; cursor: not-allowed; }
.steam-topup__controls :focus-visible, .steam-topup__refresh:focus-visible { outline: 3px solid #b690ff; outline-offset: 3px; }
.steam-topup__hint, .steam-topup__conversion { font-size: 11px; line-height: 1.6; color: #aeb5d2; }
.steam-topup__hint { margin: 9px 0 0; }
.steam-topup__conversion { margin: 17px 0 0; }
.steam-topup__status { font-size: 13px; color: #d7c5f3; line-height: 1.55; }
.steam-topup__status p { margin: 12px 0 0; }
.steam-topup__status > strong { display: block; margin-top: 14px; }
.steam-topup__status--success { color: var(--green); }
.steam-topup__refresh { margin-top: 8px; background: none; color: white; border: 0; padding: 3px 0; text-decoration: underline; cursor: pointer; }
@media (max-width: 620px) {
  .steam-topup h1 { font-size: 38px; }
  .steam-topup__controls { flex-direction: column; }
  .steam-topup__controls input { flex: auto; }
  .steam-topup__controls button { min-height: 44px; }
}
</style>

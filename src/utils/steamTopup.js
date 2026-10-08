export function isTopupPage(hash = '', search = '', development = false) {
  // Повреждённая персональная ссылка тоже открывает Steam с сообщением об ошибке.
  // Обычная главная и якоря поддержки не монтируют форму и не запрашивают статус.
  return new URLSearchParams(hash.replace(/^#/, '')).has('topup')
    || (development && new URLSearchParams(search).get('preview') === 'steam')
}

export function readToken(hash = '') {
  // Секрет ссылки хранится во фрагменте: он не попадает в access-log и Referer.
  const token = new URLSearchParams(hash.replace(/^#/, '')).get('topup') || ''
  return /^[0-9a-f-]{36}\.[0-9a-f]{64}$/.test(token) ? token : ''
}

export function shouldPoll(state) {
  return !state || ['queued', 'processing', 'attention'].includes(state)
}

export async function topupRequest(action, payload, fetcher = fetch) {
  if (!['status', 'submit'].includes(action)) throw new Error('Недоступное действие')
  const response = await fetcher(`/topup-api/${action}`, {
    method: 'POST', credentials: 'omit', cache: 'no-store',
    headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload),
  })
  const data = await response.json()
  if (!response.ok) throw new Error(typeof data?.detail === 'string' ? data.detail : 'Не удалось выполнить запрос')
  return data
}

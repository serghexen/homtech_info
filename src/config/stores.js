const joyCards = {
  code: 'joycards',
  name: 'JoyCards',
  pageTitle: 'Поддержка JoyCards',
  hostname: 'market.homtech.app',
  eyebrow: 'Мы всегда на связи',
  title: 'Нужна помощь?',
  heroTitleLead: 'Нужна',
  heroTitleAccent: 'помощь?',
  heroBenefits: [
    { icon: 'clock', title: 'Быстро', text: '5–15 минут', mobileTitle: 'Быстро', mobileText: '5–15 минут' },
    { icon: 'chat', title: 'Каждый день', text: 'Без выходных', mobileTitle: 'Ежедневно', mobileText: '11:00–22:00' },
    { icon: 'lock', title: 'Безопасно', text: 'Не просим пароли', mobileTitle: 'Безопасно', mobileText: 'Без паролей' },
  ],
  description: 'Поддержка JoyCards ответит на вопросы и поможет в любой ситуации.',
  topup: {
    eyebrow: 'Пополнение по вашей ссылке',
    title: 'Пополнить',
    amountLabel: 'Сумма пополнения',
    loginLabel: 'Логин Steam',
    placeholder: 'Введите логин',
    loginHint: 'Логин для входа в Steam — не никнейм и не ссылка на профиль. Проверьте его перед пополнением.',
    button: 'Пополнить',
    sending: 'Проверяем…',
    loading: 'Проверяем вашу ссылку…',
    missingLink: 'Откройте персональную ссылку на пополнение. Без неё отправить средства нельзя.',
    conversion: 'Сумма будет конвертирована в валюту кошелька. Итоговое зачисление может отличаться.',
    networkError: 'Не удалось получить статус. Обновите его, чтобы проверить результат.',
    paused: 'Пополнения временно приостановлены. Обратитесь в поддержку ниже.',
    refresh: 'Обновить статус',
    accountLabel: 'Аккаунт',
    preview: 'Предпросмотр · без пополнения',
    states: {
      queued: 'Проверяем логин Steam…',
      processing: 'Пополнение обрабатывается',
      succeeded: 'Пополнение выполнено',
      attention: 'Уточняем результат пополнения',
      failed: 'Пополнение не выполнено',
      expired: 'Срок действия ссылки истёк',
      cancelled: 'Ссылка отменена',
    },
  },
  schedule: 'Ежедневно с 11:00 до 22:00 (МСК)',
  responseTime: 'Обычно отвечаем в течение 5–15 минут',
  contacts: [
    {
      code: 'telegram',
      name: 'Telegram',
      description: 'Быстрый ответ в чате',
      action: 'Написать в Telegram',
      url: 'https://t.me/asat_support',
    },
    {
      code: 'vk',
      name: 'ВКонтакте',
      description: 'Напишите нам в сообщения',
      action: 'Написать во ВКонтакте',
      url: 'https://vk.com/im?sel=-221983140',
    },
    {
      code: 'max',
      name: 'MAX',
      description: 'Свяжитесь с нами через MAX',
      action: 'Написать в MAX',
      url: 'https://max.ru/u/f9LHodD0cOK9ZCoOl_3MdlAzudF4yXhV2nur4eJoMAg6tJtAMpAZHLKO9vE',
    },
  ],
}

export const stores = { joycards: joyCards }

export const storeByHostname = {
  'market.homtech.app': 'joycards',
  'www.market.homtech.app': 'joycards',
  localhost: 'joycards',
  '127.0.0.1': 'joycards',
}

export function resolveStore(hostname = '') {
  // Выбирает магазин по домену и оставляет JoyCards безопасным вариантом для локальной разработки.
  return stores[storeByHostname[hostname.toLowerCase()] || 'joycards']
}

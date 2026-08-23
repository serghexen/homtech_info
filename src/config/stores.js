const joyCards = {
  code: 'joycards',
  name: 'JoyCards',
  pageTitle: 'Поддержка JoyCards',
  hostname: 'market.homtech.app',
  eyebrow: 'Мы всегда на связи',
  title: 'Нужна помощь?',
  description: 'Поддержка JoyCards ответит на вопросы и поможет в любой ситуации.',
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

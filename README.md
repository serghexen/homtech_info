# HomTech Market Support

Одностраничный сайт поддержки магазинов HomTech. Первая конфигурация — JoyCards на `market.homtech.app`.

## Стек

- Vue 3 + Vite;
- ESLint и Node Test Runner;
- production-сборка в Docker;
- Nginx для статических файлов;
- Caddy для HTTPS.

## Локальная разработка

```bash
npm ci
npm run dev
```

Перед завершением изменений:

```bash
npm run check
```

## Магазины

Данные магазинов находятся в `src/config/stores.js`. Новый магазин добавляется в три шага:

1. Создать конфигурацию с названием, текстами и контактами.
2. Добавить её в `stores`.
3. Связать домен с кодом магазина в `storeByHostname`.

Компоненты страницы не должны содержать ссылки или тексты конкретного магазина.

## Production

DNS-запись `market.homtech.app` должна указывать на VM. На сервере:

```bash
git clone https://github.com/serghexen/homtech_info.git /apps/homtech-info
cd /apps/homtech-info
sudo docker compose up -d --build
sudo docker compose ps
curl -fsS https://market.homtech.app/health
```

Caddy автоматически получает и обновляет TLS-сертификат. В firewall должны быть разрешены только SSH, HTTP и HTTPS.

## Обновление

```bash
cd /apps/homtech-info
git pull --ff-only
sudo docker compose up -d --build
sudo docker image prune -f
```

# Деплой на GitHub Pages

Этот проект настроен для автоматического деплоя на GitHub Pages.

## Настройка

1. **Создайте репозиторий на GitHub** и загрузите код
2. **Включите GitHub Pages** в настройках репозитория:
   - Перейдите в Settings → Pages
   - Выберите "GitHub Actions" как источник
3. **Настройте ветку main** как основную ветку для деплоя

## Автоматический деплой

Проект настроен на автоматический деплой при каждом push в ветку `main`. GitHub Actions workflow:

- Устанавливает Node.js 18
- Устанавливает зависимости
- Собирает проект с конфигурацией для GitHub Pages
- Деплоит в ветку `gh-pages`

## Ручной деплой

Для ручного деплоя выполните:

```bash
# Установите зависимости
npm install

# Соберите проект для GitHub Pages
npm run build:github-pages

# Деплой (требует настройки GitHub токена)
npm run deploy
```

## Структура файлов для GitHub Pages

- `angular.json` - настроен с конфигурацией `github-pages` и `baseHref: "/vus-wiki/"`
- `.github/workflows/deploy.yml` - GitHub Actions workflow для автоматического деплоя
- `public/404.html` - обработка SPA роутинга для GitHub Pages
- `public/index.html` - редирект на основное приложение
- `public/.nojekyll` - отключение Jekyll для GitHub Pages

## URL приложения

После деплоя приложение будет доступно по адресу:
`https://[username].github.io/vus-wiki/`

## Troubleshooting

1. **Проблемы с роутингом**: Убедитесь, что файлы `404.html` и `index.html` находятся в папке `public/`
2. **Проблемы с ассетами**: Проверьте, что `baseHref` правильно настроен в `angular.json`
3. **Проблемы с деплоем**: Проверьте логи GitHub Actions в разделе Actions репозитория

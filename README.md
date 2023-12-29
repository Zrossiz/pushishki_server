### REST API для pushishki.ru

## Для начала разработки

```bash
npm i
npm run start:dev
```

Откройте [http://localhost:9000](http://localhost:9000) в браузере. Для корректной работы требуется создать и запустить SQL базу pushishki, либо подключиться к удаленной.

### .env файл должен содержать следующие поля:

```bash
DATABASE_URL="postgresql://{DB_USER}:{DB_PASSWORD}@localhost:5432/{DB_NAME}?schema=public"
-DB_USER={DB_USER}
-DB_PASSWORD={DB_PASSWORD}
-DB_NAME={DB_NAME}
PORT=9000
JWT_SECRET={SECRET_KEY}
```

DB_USER - имя базы данных(логин) пример: admin

DB_PASSWORD - пароль от базы данны

DB_NAME - имя базы данных для подключения к ней. пример: pushishki

## Для запуска продакшен-билда

```bash
npm run build
npm run start:prod
# или
yarn dev
```

Приложение так же запустится на 9000 порту.

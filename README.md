# Board Games BattleGround

Web application for organize meetings for users to play board games.

Following technologies and tool using:

- HTML + CSS(Responsive, Adaptive)
- JS
- Nginx
- npm
- Node.js
- Express.js
- Passport.js
- MongoDB
- Multer

## Running

Для запуска REST api, необходимо:

1. Запустить **MongoDB** (на порту по умолчанию `27017`).
2. Запустить node.js с помощью команды:

```sh
npm start
```

3. Заполнить MongoDB тестовыми данными. Для этого выполнить команду:

```sh
curl localhost:3000/api/db/init
```

или

вызвать данный endpoint с помощью браузера.

## GoIT Node.js Course Homework

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок

## Пути:

### http://localhost:3000/api/users

- post **'/signup'** - регистрация;
- post **'/login'** - авторизация;
- get **'/logout'** - выход;
- get **'/current'** - инфо про конткретного пользователя;
- patch **'/avatars'** - смена аватарки;
- get **'/verify/:verificationToken'** - подтверждение email;
- post **'/verify'** - повторная отправка письма с подтверждением;
- patch **'/:id/subscription'** - изменение типа подписки пользователя ('starter', 'pro', 'business') по айди;

### http://localhost:3000/api/contacts

- get **'/'** - получаем все контактыпользователя;
- get **'/:contactId'** - получаем нужный контакт пользователя по ID;
- post **'/'** - добавляем контакт;
- put **'/:contactId'** - обновляем часть информации о контакте;
- patch **'/:contactId/favorite'** - добавляем/удаляем контакт из избранного;
- delete **'/:contactId'** - удаляем контакт;

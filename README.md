# Baitau Partners — React + Bootstrap + MongoDB/Mongoose

Проект сделан по структуре, похожей на пример с React frontend и Node.js backend.

## Что есть в проекте

- React + Vite frontend
- Bootstrap 5 дизайн в бело-синих цветах
- Страницы: Главная, Услуги, Галерея, О компании, Вход, Регистрация, Админ-панель
- Express backend
- MongoDB Atlas / локальная MongoDB через Mongoose
- Обязательная проверка вводных данных:
  - frontend validation
  - backend validation через express-validator
  - schema validation в Mongoose
- Форма заявки сохраняется в MongoDB
- Админ-панель показывает заявки из MongoDB
- Регистрация и вход администратора через JWT

## Структура

```text
baitau-react-mongo-site/
├── client/                     # Frontend React application
│   ├── public/
│   │   └── images/             # Image assets
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Header.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── LeadForm.jsx
│   │   │   ├── Gallery.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/              # Route pages
│   │   │   ├── Home.jsx
│   │   │   ├── Services.jsx
│   │   │   ├── Gallery.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Register.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── utils/              # Utility functions
│   │   │   ├── api.js
│   │   │   └── validation.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
└── server/                     # Backend Node.js application
    ├── config/
    │   └── db.js               # Database configuration
    ├── middleware/
    │   ├── authMiddleware.js
    │   └── validateRequest.js
    ├── models/
    │   ├── User.js             # User model
    │   ├── Service.js          # Service model
    │   └── Lead.js             # Lead/application model
    ├── routes/
    │   ├── authRoutes.js       # Authentication routes
    │   ├── serviceRoutes.js    # Service routes
    │   └── leadRoutes.js       # Lead routes
    ├── seed/
    │   └── seed.js             # Fill database with services and admin
    ├── .env.example
    ├── package.json
    └── server.js               # Server entry point
```

## Запуск

### 1. Установить зависимости

В корневой папке проекта:

```bash
npm install
npm run install-all
```

### 2. Настроить MongoDB

Перейди в `server` и создай `.env`:

```bash
cd server
copy .env.example .env
```

Для Windows PowerShell можно так:

```powershell
Copy-Item .env.example .env
```

В `.env` вставь свою строку MongoDB Atlas:

```env
PORT=5000
MONGO_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/baitau_partners_react_db?retryWrites=true&w=majority
JWT_SECRET=change_this_secret_key
CLIENT_URL=http://localhost:5173
ADMIN_EMAIL=admin@baitau.kz
ADMIN_PASSWORD=Admin12345
```

### 3. Заполнить базу услугами

Из корневой папки:

```bash
npm run seed
```

### 4. Запустить frontend и backend одновременно

Из корневой папки:

```bash
npm run dev
```

Открой:

```text
http://localhost:5173
```

Backend API будет здесь:

```text
http://localhost:5000
```

## Данные для входа после seed

```text
Email: admin@baitau.kz
Password: Admin12345
```

Пароль можно поменять в `.env`, затем снова выполнить `npm run seed`.

## Проверка в Postman

### Получить услуги

```http
GET http://localhost:5000/api/services
```

### Отправить заявку

```http
POST http://localhost:5000/api/leads
Content-Type: application/json
```

```json
{
  "name": "Айгерим",
  "phone": "+7 777 123 45 67",
  "email": "aigerim@test.com",
  "company": "Test Company",
  "service": "NEBOSH IGC",
  "message": "Хочу узнать стоимость и расписание обучения."
}
```

### Проверить ошибку валидации

```json
{
  "name": "A",
  "phone": "abc",
  "email": "wrong-email",
  "service": "",
  "message": "test"
}
```

Должен вернуться статус `400` и список ошибок.

### Войти

```http
POST http://localhost:5000/api/auth/login
Content-Type: application/json
```

```json
{
  "email": "admin@baitau.kz",
  "password": "Admin12345"
}
```

Скопируй token и используй его для просмотра заявок:

```http
GET http://localhost:5000/api/leads
Authorization: Bearer YOUR_TOKEN
```

## Request status and client course linking

When an administrator changes a request status:

- `New` removes the linked course from the client account.
- `In progress` adds or updates the course in the client account with `Active` status.
- `Completed` adds or updates the course in the client account with `Completed` status.

The request is linked to a client account by email. The email used in the request form must be the same as the email of the registered client account.

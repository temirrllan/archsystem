# Physics Bot — Архитектура және Railway деплой

## Railway сервистері (5 кубик)

```
┌─────────────────────────────────────────────────────────────────┐
│                     Railway Project                              │
│                                                                  │
│  ┌──────────────┐   ┌──────────────────┐   ┌────────────────┐  │
│  │  archsystem  │   │ pleasant-alignment│   │ vigilant-passion│  │
│  │  (Backend)   │   │   (Frontend)      │   │   (Admin)       │  │
│  │  FastAPI     │◄──│   React + Vite    │   │  React + Vite   │  │
│  │  Python 3.12 │   │   Nginx           │   │  Nginx          │  │
│  │  Port: $PORT │   │   Port: $PORT     │   │  Port: $PORT    │  │
│  └──────┬───────┘   └──────────────────┘   └────────────────┘  │
│         │                                                        │
│  ┌──────┴───────┐   ┌──────────────────┐                        │
│  │   Postgres   │   │ desirable-respect │                        │
│  │  PostgreSQL  │   │     (Bot)         │                        │
│  │  Persistent  │   │  aiogram 3.7      │                        │
│  │   storage    │   │  Polling mode     │                        │
│  └──────────────┘   └──────────────────┘                        │
└─────────────────────────────────────────────────────────────────┘
```

---

## 1. archsystem (Backend) — FastAPI

**Негізгі сервис.** Барлық бизнес-логика, API, деректер базасы осында.

### Технологиялар:
| Технология | Нұсқа | Мақсаты |
|-----------|-------|---------|
| **FastAPI** | 0.109+ | REST API фреймворк |
| **SQLAlchemy** | 2.0+ | ORM (деректер базасымен жұмыс) |
| **PostgreSQL** | 16 | Негізгі деректер базасы (Railway) |
| **Pydantic** | 2.5+ | Деректерді валидация |
| **OpenAI SDK** | 1.10+ | AI репетитор (GPT-4o-mini) |
| **PyJWT** | 2.8+ | Админ авторизация |
| **uvicorn** | 0.27+ | ASGI сервер |
| **psycopg2** | 2.9+ | PostgreSQL драйвер |

### API эндпоинттер (8 роутер):
```
/health                     → Healthcheck
/api/users/*                → Пайдаланушы тіркеу, аватар, деңгей
/api/theory/*               → Теория тақырыптары (6 бөлім)
/api/problems/*             → Есептер банкі (деңгей бойынша)
/api/tests/*                → Тесттер (күнделікті + кездейсоқ)
/api/progress/*             → Оқу прогресі
/api/rating/*               → Рейтинг кестесі (апта/ай)
/api/ai/*                   → AI репетитор (GPT-4o-mini)
/api/admin/*                → Админ панель API (JWT)
```

### Деректер базасы моделдері (8 модель):
```
User              → Telegram пайдаланушы (score, streak, level)
Problem           → Физика есептері (topic, difficulty, formula)
TestResult        → Тест нәтижелері (score, answers JSON)
Progress          → Тақырып бойынша прогресс (%)
TheoryContent     → Теория мазмұны (blocks JSON)
ChatHistory       → AI чат тарихы
AdminUser         → Админ аккаунттар (JWT auth)
AdminTestQuestion → Тест сұрақтар банкі
BroadcastLog      → Хабарлама тарихы
```

### AI репетитор:
- **Модель:** OpenAI GPT-4o-mini (бірінші кезекте) немесе Groq LLaMA 3.3 70B
- **Тіл:** Тек қазақ тілінде жауап береді
- **Контекст:** Оқушының тест нәтижелерін, прогресін ескереді
- **Қорғаныс:** Jailbreak сұрақтардан қорғалған
- **Тарих:** Соңғы 20 хабарлама сақталады, 6-сы AI-ға жіберіледі

### Env айнымалылары:
```
DATABASE_URL      → PostgreSQL қосылу URL (Railway ішкі)
BOT_TOKEN         → Telegram бот токені
ADMIN_USERNAME    → Админ логин
ADMIN_PASSWORD    → Админ пароль
JWT_SECRET_KEY    → JWT құпия кілт
OPENAI_API_KEY    → OpenAI API кілті (AI репетитор)
GROQ_API_KEY      → Groq API кілті (резерв)
```

---

## 2. pleasant-alignment (Frontend) — React Mini App

**Telegram Mini App.** Пайдаланушылар осы арқылы оқиды.

### Технологиялар:
| Технология | Мақсаты |
|-----------|---------|
| **React 18** | UI фреймворк |
| **Vite** | Жылдам билд жүйесі |
| **TailwindCSS** | CSS стильдер |
| **Zustand** | State management |
| **Axios** | HTTP сұраныстар |
| **@twa-dev/sdk** | Telegram Web App SDK |
| **KaTeX** | LaTeX формулалар рендері |
| **Lucide React** | Иконкалар |
| **Nginx** | Статикалық файлдар сервері |

### Беттер (8 бет):
```
/           → Басты бет (статистика, streak, күнделікті тест)
/theory     → Теория (6 физика тақырыбы, формулалар)
/problems   → Есептер (easy/medium/hard деңгей)
/test       → Тесттер (күнделікті + тақырып бойынша)
/progress   → Прогресс (графиктер, статистика)
/rating     → Рейтинг (апталық/айлық лидерборд)
/ask-ai     → AI репетитор (чат интерфейсі)
/help       → Көмек (қолданба нұсқаулығы)
```

### Env айнымалылары:
```
VITE_API_URL → Backend API URL (билд кезінде бекітіледі)
```

---

## 3. vigilant-passion (Admin Panel) — React

**Админ панель.** Контентті басқару, пайдаланушылар, статистика.

### Мүмкіндіктері:
- Dashboard статистика (пайдаланушылар, тесттер, есептер)
- Есептер CRUD + CSV импорт
- Тест сұрақтар CRUD
- Теория контент редактор
- Пайдаланушылар тізімі + бан/экспорт
- Broadcast хабарлама жіберу
- JWT авторизация

### Технологиялар:
- React 18 + Vite + TailwindCSS
- React Hook Form + Zod (валидация)
- Recharts (графиктер)
- @hello-pangea/dnd (drag-and-drop)
- Nginx (сервер)

---

## 4. desirable-respect (Bot) — aiogram

**Telegram бот.** Пайдаланушылармен тікелей байланыс.

### Технологиялар:
| Технология | Мақсаты |
|-----------|---------|
| **aiogram 3.7** | Telegram Bot Framework |
| **httpx** | Backend-ке HTTP сұраныстар |
| **Python 3.12** | Негізгі тіл |

### Командалар:
```
/start      → Ботты іске қосу + Mini App сілтемесі
/help       → Көмек
/profile    → Профиль (streak, score)
/rating     → Рейтинг
/menu       → Негізгі мәзір
```

### Режим: **Polling** (webhook емес)
- Публичный домен қажет емес
- Backend-ке API сұрау жібереді

### Env айнымалылары:
```
BOT_TOKEN    → Telegram бот токені
MINI_APP_URL → Frontend URL (Mini App ашу)
BACKEND_URL  → Backend API URL
```

---

## 5. Postgres — Деректер базасы

**Railway PostgreSQL** — автоматты бэкап, тұрақты сақтау.

- **Нұсқа:** PostgreSQL 16
- **Сақтау:** Persistent Volume (postgres-volume)
- **Қосылу:** Ішкі Railway желісі арқылы (`${{Postgres.DATABASE_URL}}`)
- **Миграция:** SQLAlchemy `create_all()` автоматты

---

## Сервистер арасындағы байланыс

```
Telegram User
     │
     ▼
┌─────────┐   /start    ┌─────────┐
│ Telegram │◄───────────►│   Bot   │
│   App    │             │(aiogram)│
└────┬─────┘             └────┬────┘
     │ Mini App URL           │ HTTP
     ▼                        ▼
┌──────────┐  HTTP API  ┌──────────┐
│ Frontend │───────────►│ Backend  │
│ (React)  │  /api/*    │(FastAPI) │
└──────────┘            └────┬─────┘
                             │ SQL
┌──────────┐                 │
│  Admin   │─── /api/admin──►│
│ (React)  │    JWT auth     │
└──────────┘            ┌────▼─────┐
                        │ Postgres │
                        │   (DB)   │
                        └──────────┘
                             │
                        ┌────▼─────┐
                        │  OpenAI  │
                        │ GPT-4o-  │
                        │  mini    │
                        └──────────┘
```

---

## Деплой процесі

1. **GitHub Push** → Railway автоматты webhooks арқылы біледі
2. **Build** → Әр сервис Dockerfile бойынша Docker image құрады
3. **Deploy** → Контейнерді іске қосады, $PORT тағайындайды
4. **Health Check** → `/health` эндпоинтін тексереді (backend)
5. **Online** → Публичный домен арқылы қолжетімді болады

### Railway конфигурация:
```json
{
  "build": { "builder": "DOCKERFILE" },
  "deploy": {
    "healthcheckPath": "/health",
    "restartPolicyType": "ON_FAILURE",
    "restartPolicyMaxRetries": 5
  }
}
```

### Docker стратегиялар:
- **Backend:** Python 3.12-slim → pip install → uvicorn (динамик $PORT)
- **Frontend/Admin:** Node 20 → npm build → Nginx (envsubst $PORT)
- **Bot:** Python 3.12-slim → pip install → polling mode

---

## URL-дер

| Сервис | URL |
|--------|-----|
| Backend API | https://archsystem-production.up.railway.app |
| Frontend Mini App | https://pleasant-alignment-production-5a13.up.railway.app |
| Admin Panel | https://vigilant-passion-production-d13b.up.railway.app |
| Bot | — (polling, домен жоқ) |
| Postgres | — (ішкі Railway желісі) |

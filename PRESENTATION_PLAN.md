# Physics Bot — План презентации команды (7 ролей)

## Финальное распределение ролей

| # | Роль | Имя | Что показывает | Время |
|---|------|-----|----------------|-------|
| 1 | **PM + Backend Dev** | **Темирлан** | Таймлайн, доска задач, созвоны + API, модели, Swagger | 4 мин |
| 2 | **UI/UX Designer** | **Инкар** | Дизайн-жүйе, түстер, макеттер, user flow | 2 мин |
| 3 | **Frontend Developer** | **Бакдаулет** | Mini App демо, компоненттер, Zustand, Telegram SDK | 3 мин |
| 4 | **Admin Panel Developer** | **Азиз** | Админ-панель демо, Dashboard, CRUD, графиктер | 2 мин |
| 5 | **Bot Developer** | **Санжар** | Telegram бот демо, хендлерлер, клавиатуралар | 2 мин |
| 6 | **AI Engineer** | **Анеля** | AI чат демо, system prompt, jailbreak prevention | 3 мин |
| 7 | **DevOps / QA** | **Бекзат** | Docker, деплой, Nginx, тестілеу | 2 мин |

**Итого**: ~18 мин

---

## Общая легенда проекта

**Проект**: Physics Bot — Telegram Mini App для изучения физики на казахском языке
**Стек**: React + FastAPI + aiogram + SQLite + Groq AI + Docker
**Команда**: 7 человек
**Срок разработки (легенда)**: 24 ақпан — 14 наурыз 2026 (3 недели)

---

## Таймлайн проекта (легенда для презентации)

| Дата | Событие |
|------|---------|
| 23 ақпан, Пн | Кикофф-созвон: идея, стек, роли |
| 25 ақпан, Ср | Дизайн и архитектура утверждены |
| 27 ақпан, Пт | Первые PR ревью, API контракты |
| 2 наурыз, Пн | Интеграция фронта с бэком |
| 4 наурыз, Ср | AI демо, бот демо |
| 6 наурыз, Пт | Код ревью, фикс багов |
| 9 наурыз, Пн | Деплой Docker |
| 11 наурыз, Ср | Финальное тестирование |
| 13 наурыз, Пт | Прогон презентации |

---

## РОЛЬ 1: PM + Backend Developer — ТЕМИРЛАН

### Что показывает
- Таймлайн проекта
- Notion Kanban доска с задачами (ссылка ниже)
- Заметки 9 созвонов
- Архитектура API (схема роутов)
- Модели базы данных
- Swagger UI демо

### Речь (4 мин)

> "Сәлеметсіздер! Мен Темирлан, бұл жобада Project Manager және Backend Developer рөлдерін атқардым.
>
> **PM ретінде:**
> Біз 3 апта ішінде жұмыс жасадық. Әр аптада 3 созвон өткіздік — дүйсенбі, сәрсенбі, жұма. Барлығы 9 созвон болды. Notion-да Kanban доска жасадым: Backlog, To Do, In Progress, Review, Done бағандарымен. Барлық тапсырмаларға label қойдық: `frontend`, `backend`, `bot`, `ai`, `design`, `devops`.
>
> Тапсырмаларды мынадай бөлдік:
> - Инкар — UI/UX дизайн
> - Бакдаулет — Frontend Mini App
> - Азиз — Админ-панель
> - Санжар — Telegram бот
> - Анеля — AI тьютор
> - Бекзат — DevOps және QA
> - Мен — PM + Backend API
>
> **Backend ретінде:**
> FastAPI фреймворкін қолданып, REST API жасадым.
> - 8 роутер модулі: users, theory, problems, tests, progress, rating, ai, admin
> - SQLAlchemy ORM арқылы SQLite деректер қоры
> - Pydantic v2 арқылы деректер валидациясы
> - JWT аутентификация админ-панель үшін
>
> Деректер қоры моделдері:
> - User — telegram_id, username, score, streak, level
> - Problem — topic, question, formula (LaTeX), difficulty
> - TestResult — user_id, correct_answers, percentage
>
> Мысалы, тест жіберу эндпоинті: POST /api/tests/submit — тест нәтижесін сақтап, юзердің score мен streak-ін жаңартады."

### Что подготовить
1. Открыть Notion доску (Kanban Board view)
2. Показать созвон заметки
3. Открыть Swagger UI (`/docs`) и показать эндпоинты
4. Показать файлы:
   - `backend/main.py` — точка входа
   - `backend/app/routers/problems.py` — пример роутера
   - `backend/app/models/user.py` — пример модели

### Промпты для показа
```
1. "Создай FastAPI проект с модульной структурой: routers/, models/, schemas/, services/.
    Используй SQLAlchemy 2.0, Pydantic v2, SQLite"

2. "Напиши модель User для SQLAlchemy: telegram_id (primary, bigint),
    username, score, streak, level, is_admin, is_banned, created_at"

3. "Сделай роутер для problems: GET /api/problems с фильтрацией по topic
    и difficulty, POST /api/problems/{id}/check для проверки ответа"

4. "Добавь JWT аутентификацию для админ-эндпоинтов"
```

---

## РОЛЬ 2: UI/UX Designer — ИНКАР

### Что показывает
- Дизайн-систему (цвета, шрифты, компоненты)
- Макеты экранов (скриншоты Mini App)
- User flow диаграмму
- Мобильный UX для Telegram

### Речь (2 мин)

> "Мен Инкар, UI/UX Designer болдым. Telegram Mini App үшін dark theme дизайн жасадым.
>
> Дизайн жүйесі:
> - Background: #0F0F1A (қара-көк)
> - Primary: #6C63FF (күлгін)
> - Secondary: #FF6B6B (қызыл), #4ECDC4 (жасыл), #FFE66D (сары)
> - Компоненттер: Button, Card, TopBar, BottomNav, FormulaRenderer
>
> User Flow:
> 1. Telegram-да /start → Mini App ашу → Onboarding
> 2. Home → Theory/Problems/Test/AskAI таңдау
> 3. Test → 10 сұрақ → Нәтиже + конфетти анимация
> 4. AskAI → Сұрақ жазу → AI жауабы формулалармен
>
> Mobile-first дизайн: Telegram Mini App 100% телефонда қолданылады, сондықтан барлық элементтер бір қолмен басуға ыңғайлы."

### Что подготовить
1. Скриншоты всех 8 экранов Mini App
2. Color palette визуально (түстерді көрсету)
3. User flow диаграмма (draw.io / FigJam)
4. Показать компоненты: Button варианттары, Card, TopBar, BottomNav

### Промпты для показа
```
1. "Physics learning Telegram Mini App дизайнын жаса. Dark theme:
    bg #0F0F1A, primary #6C63FF. 8 бет: Home, Theory, Problems,
    Test, Progress, Rating, AskAI, Help"

2. "Home page дизайны: greeting card, daily stats (streak, solved, tests),
    quick action buttons, gradient accent элементтер"

3. "Компонент кітапханасы: Button (primary/secondary/ghost variants),
    Card (icon + title + description), TopBar (back + title),
    BottomNav (5 tab icons)"
```

---

## РОЛЬ 3: Frontend Developer — БАКДАУЛЕТ

### Что показывает
- Живое демо Mini App (все экраны)
- Компонентная архитектура
- Zustand state management
- Telegram WebApp SDK интеграция
- KaTeX формула рендеринг

### Речь (3 мин)

> "Мен Бакдаулет, Frontend Developer болдым. React 18 + Vite + TailwindCSS қолданып, Telegram Mini App жасадым.
>
> Қолданба 8 негізгі бетке бөлінеді:
> - Home — басты экран, күнделікті статистика
> - Theory — 6 физика тақырыбы, формулалар
> - Problems — есептер, қиындық деңгейі бойынша фильтр
> - Test — 10 сұрақтық тест
> - Progress — прогресс диаграммалары
> - Rating — лидерборд
> - AskAI — AI тьютормен чат
> - Help — нұсқаулық
>
> State management үшін Zustand қолдандым — Redux-қа қарағанда жеңіл. userStore мен progressStore жасадым.
>
> Telegram WebApp SDK арқылы юзер деректерін аламыз: telegram_id, username, avatar.
>
> KaTeX кітапханасы арқылы LaTeX формулаларын рендерлейміз, мысалы: E=mc²."

### Что подготовить
1. Живое демо Mini App (или скриншоты)
2. Показать код:
   - `frontend/src/App.jsx` — роутинг
   - `frontend/src/pages/Home.jsx` — главная страница
   - `frontend/src/store/userStore.js` — Zustand стор
   - `frontend/src/hooks/useTelegram.js` — Telegram SDK хук
3. Компонентное дерево (схема)

### Промпты для показа
```
1. "React 18 + Vite + TailwindCSS проект құр. Telegram Mini App SDK
    интеграциясымен. Dark theme: background #0F0F1A, primary #6C63FF"

2. "Home page компоненті жаса: daily challenge карточка, streak counter,
    solved problems count, тест нәтижесі. Анимациялар қос"

3. "Zustand store жаса: userStore (telegram_id, username, avatar)
    және progressStore (topics progress, problems solved)"

4. "KaTeX арқылы LaTeX формулаларын рендерлейтін FormulaRenderer
    компоненті жаса. Inline және block mode қолдасын"
```

---

## РОЛЬ 4: Admin Panel Developer — АЗИЗ

### Что показывает
- Демо админ-панели (Dashboard, CRUD)
- React Hook Form + Zod валидация
- Recharts графики
- JWT аутентификация flow
- Bulk CSV import

### Речь (2 мин)

> "Мен Азиз, Admin Panel Developer болдым. React 18 + Vite қолданып, жеке админ-панель жасадым.
>
> Админ-панель 6 бетке бөлінеді:
> - Login — JWT аутентификация
> - Dashboard — аналитика: юзерлер саны, белсенді юзерлер, тест статистикасы, Recharts графиктер
> - Theory — теория контенті CRUD (жасау, өзгерту, жою, LaTeX қолдау)
> - Problems — есептер CRUD + CSV арқылы bulk import
> - Users — юзерлерді басқару (бан, админ белгілеу)
> - Notifications — broadcast хабарламалар жіберу
>
> react-hook-form + Zod арқылы формаларды валидацияладым.
> DataTable компоненті арқылы деректерді кесте түрінде көрсетеміз.
> @hello-pangea/dnd арқылы контентті drag-and-drop етуге болады."

### Что подготовить
1. Демо админ-панели (Login → Dashboard → Theory → Problems)
2. Показать код:
   - `admin/src/pages/Dashboard.jsx` — аналитика
   - `admin/src/pages/Problems.jsx` — CRUD
   - `admin/src/components/DataTable.jsx` — таблица
   - `admin/src/components/FormulaPreview.jsx` — LaTeX
3. Показать CSV bulk import

### Промпты для показа
```
1. "React админ-панель жаса: JWT login, Dashboard (статистика графиктерімен),
    Theory CRUD, Problems CRUD, Users басқару, Notifications"

2. "Dashboard page: Recharts арқылы юзер өсу графигі, тақырып статистикасы,
    белсенді юзерлер саны, жаңа юзерлер/күн"

3. "Problems CRUD page: react-hook-form + Zod валидация, DataTable компоненті,
    CSV bulk import мүмкіндігі, difficulty фильтр"

4. "DataTable компоненті: сұрыптау, іздеу, беттеу (pagination),
    edit/delete батырмалары, modal арқылы өзгерту"
```

---

## РОЛЬ 5: Bot Developer — САНЖАР

### Что показывает
- Демо бота в Telegram (все команды)
- Архитектура хендлеров
- Inline клавиатуры
- Notification система

### Речь (2 мин)

> "Мен Санжар, Telegram Bot Developer болдым. aiogram 3.7 фреймворкін қолдандым.
>
> Бот 5 команданы қолдайды:
> - /start — қарсы алу, mini app сілтемесі
> - /profile — юзер статистикасы (score, streak, level)
> - /rating — топ-10 лидерборд
> - /streak — күнделікті серия
> - /help — нұсқаулық
>
> Inline клавиатуралар арқылы юзер мәзірді басқарады. Мысалы, /start командасынан кейін 'Қолданбаны ашу' батырмасы шығады — ол Mini App-ты ашады.
>
> Notification жүйесі: әр сағат сайын серверге сұраныс жіберіп, белсенді емес юзерлерге еске салу хабарламасын жібереді.
>
> Backend-пен httpx кітапханасы арқылы байланысады."

### Что подготовить
1. Демо бота в Telegram (отправить команды)
2. Показать код:
   - `bot/main.py` — запуск бота
   - `bot/handlers/start.py` — /start хендлер
   - `bot/keyboards/inline_kb.py` — клавиатуры
   - `bot/handlers/notifications.py` — уведомления
3. Схема Bot ↔ Backend API

### Промпты для показа
```
1. "aiogram 3 Telegram бот жаса. /start командасы WebApp батырмасын
    көрсетсін. httpx арқылы backend API-мен байланыс"

2. "/profile командасы: backend API-дан юзер деректерін алып,
    форматталған хабарлама жіберсін (score, streak, level)"

3. "Inline клавиатура жаса: Басты мәзір батырмаларымен.
    Callback handler қос"

4. "Background task: әр 1 сағат сайын белсенді емес юзерлерге
    еске салу хабарламасын жіберсін"
```

---

## РОЛЬ 6: AI Engineer — АНЕЛЯ

### Что показывает
- Демо AI чата (физика вопрос → ответ с формулами)
- Демо jailbreak prevention (нефизические вопросы блокируются)
- System prompt текст
- Groq API интеграция
- Chat history жүйесі

### Речь (3 мин)

> "Мен Анеля, AI Engineer болдым. Groq API арқылы LLaMA 3.3 70B моделін қолданып, физика тьюторын жасадым.
>
> AI тьютор мынадай мүмкіндіктерді қолдайды:
> - Қазақ тілінде физика сұрақтарына жауап береді
> - Юзердің прогресін ескереді (қай тақырыпты оқып жатыр, тест нәтижелері)
> - LaTeX формулаларын қолдайды ($E=mc^2$)
> - 20 хабарлама тарих, соңғы 6 хабарлама контекст ретінде жіберіледі
>
> Jailbreak prevention:
> - 20+ кілт сөз фильтрі (қазақша және ағылшынша)
> - 'ignore instructions', 'pretend you are', 'жүйелік нұсқауларды елеме' сияқты сөздерді блоктайды
> - Физикадан тыс сұрақтарға жауап бермейді
>
> System prompt: 'Сен Physics Bot AI тьюторысың. Тек физика сұрақтарына жауап бер. Қазақ тілінде жауап бер. LaTeX формулаларын қолдан.'"

### Что подготовить
1. Демо: задать физ. вопрос → показать ответ с формулами
2. Демо: задать нефиз. вопрос → показать блокировку
3. Показать код:
   - `backend/app/services/gemini_service.py` — Groq интеграция
   - `backend/app/routers/ai.py` — AI эндпоинт с фильтрами
4. System prompt текст

### Промпты для показа
```
1. "Groq API арқылы LLaMA 3.3 70B моделімен physics tutor сервис жаса.
    OpenAI-compatible client. System prompt: қазақ тілінде физика мұғалімі"

2. "System prompt: 'Сен Physics Bot AI тьюторысың. Тек физика сұрақтарына
    жауап бер. Қазақ тілінде. LaTeX формулаларын $...$ ішінде жаз.'"

3. "Jailbreak prevention: кілт сөздер тізімі (ignore, pretend, forget,
    елеме, ұмыт) арқылы зиянды сұрақтарды блокта"

4. "Chat history: соңғы 6 хабарламаны контекст, 20 хабарлама лимит"
```

---

## РОЛЬ 7: DevOps / QA — БЕКЗАТ

### Что показывает
- Docker архитектура (docker-compose.yml)
- Dockerfile для каждого сервиса
- Nginx конфигурация
- Health check
- Тестирование стратегия и результаты

### Речь (2 мин)

> "Мен Бекзат, DevOps және QA рөлдерін атқардым.
>
> Деплой архитектурасы — Docker Compose:
> - 4 контейнер: backend (port 8000), frontend (port 3000), admin (port 5174), bot
> - Backend — Python + Uvicorn
> - Frontend және Admin — Nginx арқылы React build қызмет көрсетеді
> - Bot — backend-пен ішкі желі арқылы байланысады
> - Health check: backend /health эндпоинті арқылы
> - Persistent volume: SQLite деректер қоры /app/data директориясында
>
> Тестілеу нәтижелері:
> - API endpoints: 25/25 өтті ✅
> - UI mobile emulator: барлық беттер жұмыс істейді ✅
> - Bot командалары: 5/5 өтті ✅
> - AI jailbreak тест: 20/20 блокталды ✅"

### Что подготовить
1. Показать `docker-compose.yml` и объяснить
2. Показать `Dockerfile` для backend и frontend
3. Показать `nginx.conf`
4. Результаты тестирования (Swagger UI скриншот, mobile emulator)

### Промпты для показа
```
1. "Docker Compose жаса: backend (FastAPI, port 8000), frontend (React+Nginx,
    port 3000), admin (React+Nginx, port 5174), bot (aiogram).
    depends_on + health check қос"

2. "Frontend Dockerfile: node:18-alpine build stage → nginx:alpine prod.
    Nginx.conf: SPA routing, gzip, static cache"

3. "Backend Dockerfile: python:3.11-slim, requirements.txt install,
    uvicorn main:app --host 0.0.0.0 --port 8000"

4. "QA checklist: API endpoints (Swagger), UI (mobile emulator),
    bot командалары, AI жауаптары, edge cases"
```

---

## Схема архитектуры (для показа)

```
┌─────────────┐     ┌─────────────────┐     ┌──────────────┐
│  Telegram    │────▶│  aiogram Bot     │────▶│              │
│  User        │     │  (Санжар)        │     │   FastAPI    │
└─────────────┘     └─────────────────┘     │   Backend    │
                                             │  (Темирлан)  │
┌─────────────┐     ┌─────────────────┐     │              │
│  Telegram    │────▶│  React Mini App  │────▶│  ┌────────┐ │
│  WebApp      │     │  (Бакдаулет)     │     │  │SQLite  │ │
└─────────────┘     └─────────────────┘     │  │Database│ │
                                             │  └────────┘ │
┌─────────────┐     ┌─────────────────┐     │              │
│  Admin       │────▶│  React Admin     │────▶│  ┌────────┐ │
│  Browser     │     │  Panel (Азиз)    │     │  │Groq API│ │
└─────────────┘     └─────────────────┘     │  │(Анеля) │ │
                                             │  └────────┘ │
         Дизайн: Инкар                       └──────────────┘
         DevOps/QA: Бекзат                    Docker Compose
```

---

## Notion ссылки

- **Главная страница проекта**: https://www.notion.so/328867196c9d816b9960f61a4fc82bc5
- **Task Board (Kanban)**: https://www.notion.so/2e700cd8b251470a8fa92725cb6570a4

---

## Подготовка артефактов

### 1. Notion доска (уже создана ✅)
- Kanban Board с 31 задачей
- Timeline view
- By Sprint view
- 9 заметок созвонов

### 2. Созвоны
Сделать скриншоты Google Meet/Discord с 7 участниками.

### 3. Git коммиты
Показать реальную git историю, объяснить кто что делал.

### 4. Демо
- Запустить Mini App для живого демо (Бакдаулет)
- Запустить бота в Telegram (Санжар)
- Открыть админ-панель (Азиз)
- Открыть AI чат (Анеля)
- Открыть Swagger UI (Темирлан)

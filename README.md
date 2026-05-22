# 🏗️ Конструктор лендингов (Landing Page Constructor)

Визуальный drag-and-drop конструктор для создания лендингов без написания кода.
Позволяет собирать страницы из готовых блоков, редактировать их свойства в реальном времени,
менять порядок перетаскиванием, экспортировать в JSON/ZIP и предпросматривать на разных устройствах.

🌐 **Демо:** [landing-page-constructor.vercel.app](https://landing-page-constructor.vercel.app/)

---

## 📑 Оглавление

- [Возможности](#-возможности)
- [Технологии](#-технологии)
- [Установка и запуск](#-установка-и-запуск)
- [Команды](#-доступные-команды)
- [Горячие клавиши](#-горячие-клавиши)
- [Архитектура проекта](#-архитектура-проекта)
- [Структура директорий](#-структура-директорий)
- [Управление состоянием (Redux)](#-управление-состоянием-redux)
- [Компоненты](#-компоненты)
  - [Atomic Design](#atomic-design)
  - [Atoms](#atoms--примитивы)
  - [Molecules](#molecules--составные-компоненты)
  - [Organisms](#organisms--блоки-лендинга)
  - [Templates](#templates--шаблоны-разметки)
  - [Pages](#pages--страницы)
- [Блоки лендинга](#-блоки-лендинга)
- [Drag-and-Drop](#-drag-and-drop)
- [Кастомные хуки](#-кастомные-хуки)
- [Контексты](#-контексты)
- [Утилиты](#-утилиты)
- [Шаблоны лендингов](#-шаблоны-лендингов)
- [Экспорт и импорт проектов](#-экспорт-и-импорт-проектов)
- [Руководство разработчика: добавление нового блока](#-руководство-разработчика-добавление-нового-блока)
- [Примеры использования](#-примеры-использования)
- [Вклад в проект](#-вклад-в-проект)
- [Лицензия](#-лицензия)

---

## 🚀 Возможности

### Основные функции

- ✅ **26 вариантов блоков** — Hero (10 вариантов), Features, Pricing, FAQ, Team, Gallery, Steps, CTA, Footer и другие
- ✅ **Drag-and-drop** — Перетаскивание блоков из боковой панели на холст
- ✅ **Сортировка** — Изменение порядка блоков перетаскиванием внутри холста
- ✅ **Редактирование** — Изменение свойств блоков в реальном времени через правую панель
- ✅ **Undo/Redo** — Отмена и повтор действий (до 50 шагов истории)
- ✅ **Preview** — Предпросмотр на разных устройствах (Desktop / Tablet / Mobile)
- ✅ **Масштабирование** — Zoom холста от 50% до 200%
- ✅ **Экспорт/Импорт** — Сохранение проекта в JSON или ZIP (с генерацией HTML)
- ✅ **Автосохранение** — Автоматическое сохранение в `localStorage` с debounce 1 секунда
- ✅ **Шаблоны** — 3 готовых шаблона лендингов (Стартап, Портфолио, Продукт)
- ✅ **Слои** — Панель слоёв для навигации по структуре страницы
- ✅ **Горячие клавиши** — Ctrl+S, Ctrl+Z, Ctrl+Y, Delete, Ctrl+D, Ctrl+P
- ✅ **Тосты** — Система уведомлений (success, error, info, warning)

### Каталог блоков

| Категория          | Варианты                                                         | Кол-во |
| ------------------ | ---------------------------------------------------------------- | ------ |
| 🏷️ Hero           | Классический, Градиент, С фото, Split-screen, С логотипами, Видеофон, Минималист, С формой, Типографика, Тёмная тема | 10     |
| ⭐ Особенности     | Список, Сетка                                                    | 2      |
| ✓ Преимущества     | С иконками                                                       | 1      |
| 📊 Статистика      | 4 счётчика                                                       | 1      |
| 🏢 Логотипы        | 12 партнёров                                                     | 1      |
| 💰 Тарифы          | 3 тарифных плана                                                 | 1      |
| 💬 Отзывы          | 3 отзыва с рейтингом                                             | 1      |
| 🖼️ Галерея        | 6 фото                                                           | 1      |
| 🎬 Видео           | YouTube-плеер                                                    | 1      |
| 👥 Команда         | 4 сотрудника                                                     | 1      |
| ❓ FAQ             | 4 вопроса (аккордеон)                                            | 1      |
| 👣 Этапы           | 4 шага (таймлайн)                                                | 1      |
| 📰 Рассылка        | Email-форма                                                      | 1      |
| 📞 Контакты        | Форма обратной связи                                             | 1      |
| 📱 Приложение      | App Store + Google Play                                          | 1      |
| 📣 Призыв (CTA)   | Секция с кнопкой                                                 | 1      |
| 📍 Подвал (Footer) | 4 колонки                                                        | 1      |

---

## 🛠 Технологии

| Технология                      | Назначение                           |
| ------------------------------- | ------------------------------------ |
| **React 19**                    | UI-библиотека                        |
| **TypeScript 5.8**              | Статическая типизация                |
| **Vite 6**                      | Сборщик и dev-сервер                 |
| **Redux Toolkit**               | Управление состоянием                |
| **React Redux**                 | Интеграция Redux с React             |
| **@dnd-kit/core**               | Ядро drag-and-drop                   |
| **@dnd-kit/sortable**           | Сортировка элементов DnD             |
| **@dnd-kit/modifiers**          | Модификаторы поведения DnD           |
| **React Router DOM 7**          | Маршрутизация                        |
| **CSS Modules**                 | Модульная стилизация компонентов     |
| **FileSaver.js**                | Скачивание файлов на клиент          |
| **JSZip**                       | Создание ZIP-архивов                 |
| **ESLint 9 + Prettier**         | Линтинг и форматирование кода        |

---

## 📦 Установка и запуск

### Требования

- **Node.js** ≥ 18
- **npm** ≥ 9

### Установка

```bash
# Клонировать репозиторий
git clone https://github.com/NekrasovPS/landing-page-constructor.git

# Перейти в директорию проекта
cd landing-page-constructor

# Установить зависимости
npm install

# Запустить dev-сервер
npm run dev
```

Приложение будет доступно по адресу: **http://localhost:5173**

---

## 🎨 Доступные команды

```bash
npm run dev        # Запуск dev-сервера (http://localhost:5173)
npm run build      # Компиляция TypeScript + сборка production в dist/
npm run lint       # Проверка кода ESLint
npm run format     # Форматирование кода Prettier (src/**/*.{ts,tsx,css,json})
npm run preview    # Preview production-сборки
```

---

## 🎹 Горячие клавиши

| Комбинация                 | Действие                    |
| -------------------------- | --------------------------- |
| `Ctrl+S`                   | Сохранить проект            |
| `Ctrl+Z`                   | Отменить действие (Undo)    |
| `Ctrl+Y` / `Ctrl+Shift+Z` | Повторить действие (Redo)   |
| `Delete` / `Backspace`     | Удалить выделенный блок     |
| `Ctrl+D`                   | Дублировать выделенный блок |
| `Ctrl+P`                   | Открыть предпросмотр        |
| `Escape`                   | Снять выделение             |

> **Примечание:** Горячие клавиши не срабатывают при фокусе на `<input>`, `<textarea>` или `contentEditable` элементах.

---

## 🏛 Архитектура проекта

Приложение построено по принципу **однонаправленного потока данных** с чётким разделением ответственности:

```
┌──────────────────────────────────────────────────────────┐
│                       EditorPage                         │
│  ┌─────────┐  ┌──────────────────┐  ┌──────────────────┐│
│  │ Blocks  │  │                  │  │   EditPanel /     ││
│  │ Panel   │──│     Canvas       │──│   LayersPanel     ││
│  │ (DnD)   │  │  (DroppableCanvas│  │  (Properties)     ││
│  └─────────┘  │   + Sortable)    │  └──────────────────┘│
│               └──────────────────┘                       │
│  ┌───────────────────────────────────────────────────┐   │
│  │              Redux Store                          │   │
│  │  ┌──────────┐ ┌──────────┐ ┌────────────────┐    │   │
│  │  │ blocks   │ │    ui    │ │    history      │    │   │
│  │  │ Slice    │ │  Slice   │ │    Slice        │    │   │
│  │  └──────────┘ └──────────┘ └────────────────┘    │   │
│  └───────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────┘
```

**Поток данных:**

1. Пользователь **перетаскивает блок** из `BlocksPanel` → `DndProvider` обрабатывает событие → добавляется новый блок в Redux store → `Canvas` перерисовывается
2. Пользователь **кликает на блок** → `selectedId` обновляется → `EditPanel` отображает редактируемые поля
3. Пользователь **редактирует поле** → `updateBlock` dispatch → `blocks.items` обновляется → блок на холсте перерисовывается
4. Каждое изменение → `push` в `historySlice` → доступны Undo/Redo

---

## 📁 Структура директорий

```
src/
├── app/                        # Корневой компонент приложения
│   └── App.tsx                 # BrowserRouter + маршрутизация
│
├── components/                 # UI-компоненты (Atomic Design)
│   ├── atoms/                  # Примитивы (Button, Image, Title)
│   │   ├── ButtonBlock/
│   │   ├── ImageBlock/
│   │   └── TitleBlock/
│   ├── molecules/              # Составные компоненты
│   │   └── DraggableBlock/     # Перетаскиваемый блок в панели
│   ├── organisms/              # Сложные блоки (основная часть)
│   │   ├── BlocksPanel/        # Левая панель с каталогом блоков
│   │   ├── DroppableCanvas/    # Холст (drop-зона + сортировка)
│   │   ├── EditPanel/          # Правая панель редактирования
│   │   ├── Header/             # Шапка приложения
│   │   ├── Toolbar/            # Панель инструментов (zoom, device, undo/redo)
│   │   ├── LayersPanel/        # Панель слоёв
│   │   ├── PreviewModal/       # Модальное окно предпросмотра
│   │   ├── TemplatesModal/     # Модальное окно шаблонов
│   │   ├── HeroBlock/          # Hero-блоки (10 вариантов)
│   │   ├── FeatureBlock/       # Блоки особенностей (2 варианта)
│   │   ├── BenefitBlock/       # Блок преимуществ
│   │   ├── PricingBlock/       # Тарифы
│   │   ├── TestimonialsBlock/  # Отзывы
│   │   ├── GalleryBlock/       # Галерея
│   │   ├── VideoBlock/         # Видео
│   │   ├── TeamBlock/          # Команда
│   │   ├── FaqBlock/           # FAQ (аккордеон)
│   │   ├── StepsBlock/         # Этапы
│   │   ├── CtaBlock/           # Призыв к действию
│   │   ├── FooterBlock/        # Подвал
│   │   ├── StatisticsBlock/    # Статистика
│   │   ├── LogosBlock/         # Логотипы партнёров
│   │   ├── NewsletterBlock/    # Подписка на рассылку
│   │   ├── ContactFormBlock/   # Форма обратной связи
│   │   └── AppDownloadBlock/   # Скачать приложение
│   ├── templates/              # Layout-шаблоны
│   │   └── Canvas/             # Обёртка холста (zoom + device)
│   └── pages/                  # Страницы
│       └── EditorPage/         # Главная страница редактора
│
├── contexts/                   # React Context Providers
│   └── ToastProvider.tsx       # Система тост-уведомлений
│
├── dnd/                        # Drag-and-Drop логика
│   ├── DndProvider.tsx         # DndContext + DragOverlay
│   ├── DraggableBlock.tsx      # Обёртка useDraggable
│   ├── DroppableCanvas.tsx     # Обёртка useDroppable
│   └── DndOverlay.module.css   # Стили мини-превью при перетаскивании
│
├── hooks/                      # Кастомные React-хуки
│   ├── useBlockActions.ts      # Действия над блоками (CRUD + history)
│   ├── useHotkeys.ts           # Глобальные горячие клавиши
│   ├── useProject.ts           # Жизненный цикл проекта (save/import/clear)
│   └── useUI.ts                # Управление UI-состоянием
│
├── store/                      # Redux Store
│   ├── index.ts                # Конфигурация store
│   ├── hooks.ts                # Типизированные хуки + селекторы
│   └── slices/
│       ├── blocksSlice.ts      # Состояние блоков
│       ├── uiSlice.ts          # Состояние UI
│       └── historySlice.ts     # Undo/Redo стек
│
├── styles/                     # Глобальные стили
├── type/                       # TypeScript типы
│   └── blocks.ts               # BlockData, BlockProps
├── utils/                      # Утилиты
│   ├── availableBlocks.ts      # Каталог доступных блоков (17 групп)
│   ├── blockMap.ts             # Реестр блоков → компоненты + поля
│   ├── helpers.ts              # Общие вспомогательные функции
│   ├── localStorage.ts         # Работа с localStorage
│   ├── projectExporter.ts      # Экспорт/импорт проектов
│   └── templates.ts            # Предустановленные шаблоны
│
├── main.tsx                    # Точка входа
└── vite-env.d.ts               # Vite типы
```

---

## 🗃 Управление состоянием (Redux)

Состояние приложения хранится в Redux Store с тремя слайсами:

### Форма состояния

```typescript
{
  blocks: {
    items: BlockData[],       // Массив блоков на холсте
    selectedId: number | null // Индекс выбранного блока
  },
  ui: {
    device: "desktop" | "tablet" | "mobile",  // Устройство для превью
    zoom: number,                              // Масштаб (0.5 – 2.0)
    activeTab: "properties" | "layers",        // Активная вкладка правой панели
    isTemplatesModalOpen: boolean,
    isPreviewModalOpen: boolean,
    sidebarOpen: boolean
  },
  history: {
    past: BlockData[][],      // Стек отмены (макс. 50)
    present: BlockData[],     // Текущее состояние
    future: BlockData[][]     // Стек повтора
  }
}
```

### blocksSlice — Управление блоками

| Action            | Payload                   | Описание                                        |
| ----------------- | ------------------------- | ----------------------------------------------- |
| `setBlocks`       | `BlockData[]`             | Установить весь массив блоков                   |
| `addBlock`        | `BlockData`               | Добавить блок в конец                           |
| `updateBlock`     | `{ index, props }`        | Обновить свойства блока (shallow merge)         |
| `deleteBlock`     | `number` (index)          | Удалить блок (корректирует `selectedId`)        |
| `duplicateBlock`  | `number` (index)          | Дублировать блок (вставляется после оригинала)  |
| `moveBlock`       | `{ from, to }`            | Переместить блок (обновляет `selectedId`)       |
| `selectBlock`     | `number \| null`          | Выбрать блок или снять выделение                |
| `clearBlocks`     | —                         | Очистить все блоки                              |

### uiSlice — Управление интерфейсом

| Action                | Payload                              | Описание                              |
| --------------------- | ------------------------------------ | ------------------------------------- |
| `setDevice`           | `"desktop" \| "tablet" \| "mobile"` | Переключить устройство                |
| `setZoom`             | `number`                             | Установить масштаб (0.5 – 2.0)       |
| `setActiveTab`        | `"properties" \| "layers"`           | Переключить вкладку правой панели     |
| `setTemplatesModalOpen` | `boolean`                          | Открыть/закрыть модал шаблонов       |
| `setPreviewModalOpen` | `boolean`                            | Открыть/закрыть предпросмотр         |
| `toggleSidebar`       | —                                    | Переключить боковую панель            |
| `resetUI`             | —                                    | Сбросить UI к значениям по умолчанию  |

### historySlice — Undo/Redo

| Action         | Payload        | Описание                                               |
| -------------- | -------------- | ------------------------------------------------------ |
| `setPresent`   | `BlockData[]`  | Установить текущее состояние без записи в историю      |
| `push`         | `BlockData[]`  | Сохранить текущее в `past`, установить новое, очистить `future` |
| `undo`         | —              | Вернуть предыдущее состояние из `past`                 |
| `redo`         | —              | Применить следующее состояние из `future`               |
| `clearHistory` | —              | Очистить стек истории                                  |

> **Лимит истории:** Максимум 50 записей в стеке `past`. При превышении самые старые записи удаляются.

### Типизированные хуки (store/hooks.ts)

```typescript
// Базовые хуки
useAppDispatch()           // Типизированный dispatch
useAppSelector(selector)   // Типизированный useSelector

// Селекторы блоков
useBlocks()               // → BlockData[]
useSelectedBlockId()      // → number | null
useSelectedBlock()        // → BlockData | undefined

// Селекторы UI
useDevice()               // → "desktop" | "tablet" | "mobile"
useZoom()                 // → number
useActiveTab()            // → "properties" | "layers"
useIsTemplatesModalOpen() // → boolean
useIsPreviewModalOpen()   // → boolean

// Селекторы истории
useCanUndo()              // → boolean
useCanRedo()              // → boolean
useHistory()              // → { past, present, future }
```

---

## 🧩 Компоненты

### Atomic Design

Проект следует методологии **Atomic Design** с 5 уровнями:

```
atoms → molecules → organisms → templates → pages
```

| Уровень    | Кол-во компонентов | Кол-во CSS Modules | Описание                             |
| ---------- | ------------------ | ------------------ | ------------------------------------ |
| atoms      | 3                  | 0                  | Примитивы (кнопка, изображение, заголовок) |
| molecules  | 1                  | 1                  | Составные элементы (DraggableBlock)  |
| organisms  | 37                 | 26                 | Блоки лендинга + UI редактора        |
| templates  | 1                  | 1                  | Layout-обёртки (Canvas)              |
| pages      | 1 (+3 sub)         | 1                  | Страницы (EditorPage)               |
| **Итого**  | **43**             | **29**             |                                      |

---

### Atoms — Примитивы

#### `ButtonBlock`
- **Путь:** `components/atoms/ButtonBlock/ButtonBlock.tsx`
- **Props:** `{ label: string }`
- **Описание:** Простая стилизованная кнопка с синим фоном.

#### `ImageBlock`
- **Путь:** `components/atoms/ImageBlock/ImageBlock.tsx`
- **Props:** `{ src: string }`
- **Описание:** Изображение на всю ширину с закруглёнными углами.

#### `TitleBlock`
- **Путь:** `components/atoms/TitleBlock/TitleBlock.tsx`
- **Props:** `{ text: string }`
- **Описание:** Заголовок `<h2>` с жирным начертанием.

---

### Molecules — Составные компоненты

#### `DraggableBlock`
- **Путь:** `components/molecules/DraggableBlock/DraggableBlock.tsx`
- **Props:** `{ id: string; label: string; icon?: string; data: { type: string; variant: string } }`
- **Описание:** Перетаскиваемый элемент в боковой панели блоков. Использует `useDraggable` из `@dnd-kit/core`. Отображает эмодзи-иконку и название; применяет стили при перетаскивании.

---

### Organisms — Блоки лендинга

Все блоки лендинга принимают `BlockProps`:

```typescript
type BlockProps = {
  title?: string;
  description?: string;
  backgroundImage?: string;
  buttonText?: string;
  [key: string]: string | undefined; // Любые дополнительные строковые свойства
};
```

Каждый блок имеет:
- **Компонент** (`.tsx`) — React-компонент для рендеринга
- **Файл полей** (`*EditableFields.ts`) — описание редактируемых полей для `EditPanel`
- **CSS Module** (`.module.css`) — стили компонента

> Подробный список всех 26 вариантов блоков см. в разделе [Блоки лендинга](#-блоки-лендинга).

#### UI-компоненты редактора (тоже organisms)

| Компонент           | Описание                                                              |
| ------------------- | --------------------------------------------------------------------- |
| `BlocksPanel`       | Левая панель с каталогом блоков, сгруппированных по категориям        |
| `BlockVariantsSlider` | Выдвижная панель с вариантами блоков при выборе категории           |
| `DroppableCanvas`   | Холст — зона drop + сортировка блоков (`SortableContext`)            |
| `EditPanel`         | Правая панель с динамическими полями для редактирования блока        |
| `ProjectActions`    | Кнопки импорта/экспорта (JSON, ZIP)                                  |
| `Header`            | Шапка приложения (лого, название проекта, кнопки действий)           |
| `Toolbar`           | Панель инструментов (Undo/Redo, переключатель устройств, Zoom)       |
| `LayersPanel`       | Список всех блоков с навигацией, выделением и удалением              |
| `PreviewModal`      | Полноэкранный предпросмотр собранной страницы                        |
| `TemplatesModal`    | Модальное окно выбора шаблона лендинга                               |

---

### Templates — Шаблоны разметки

#### `Canvas`
- **Путь:** `components/templates/Canvas/Canvas.tsx`
- **Props:** `{ blocks, onSelect, selectedIndex, device, zoom }`
- **Описание:** Обёртка над `DroppableCanvas`, применяет CSS-трансформацию масштабирования (`scale`) и data-атрибут устройства для адаптивного предпросмотра.

---

### Pages — Страницы

#### `EditorPage`
- **Путь:** `components/pages/EditorPage/EditorPage.tsx`
- **Описание:** Главная и единственная страница приложения. Координирует весь интерфейс редактора:
  - `EditorHeader` — шапка с кнопками действий
  - `EditorCanvasArea` — тулбар + холст
  - `EditorPanel` — правая панель (вкладки Properties / Layers)
- **Обрабатывает:** drag-and-drop события (добавление и сортировка блоков), горячие клавиши, модальные окна

---

## 📐 Блоки лендинга

### Hero-блоки (10 вариантов)

| Вариант     | Компонент    | Особенности                                                          |
| ----------- | ------------ | -------------------------------------------------------------------- |
| `hero-1`    | `HeroBlock`  | Классический — фоновое изображение, заголовок, кнопка               |
| `hero-2`    | `HeroBlock2` | Градиентный фон, центрированный контент                             |
| `hero-3`    | `HeroBlock3` | Split layout — текст слева, фото справа                             |
| `hero-4`    | `HeroBlock4` | Split-screen с бейджем и двумя кнопками                             |
| `hero-5`    | `HeroBlock5` | Центрированный с логотипами доверия, HTML в заголовке               |
| `hero-6`    | `HeroBlock6` | Видео-фон (YouTube iframe), индикатор прокрутки                     |
| `hero-7`    | `HeroBlock7` | Минималист с email-формой, лого-эмодзи                              |
| `hero-8`    | `HeroBlock8` | С формой захвата лидов (имя + email)                                |
| `hero-9`    | `HeroBlock9` | Типографический — крупный двухстрочный заголовок                    |
| `hero-10`   | `HeroBlock10`| Тёмная тема с неоновым свечением и 3 карточками                     |

### Контентные блоки

| Вариант          | Компонент           | Описание                                             |
| ---------------- | ------------------- | ---------------------------------------------------- |
| `feature-1`      | `FeatureBlock`      | Статический список преимуществ                       |
| `feature-2`      | `FeatureBlock2`     | Сетка из 3 карточек с иконками                       |
| `benefit-1`      | `BenefitBlock`      | 3 преимущества с эмодзи-иконками                     |
| `statistics-1`   | `StatisticsBlock`   | 4 счётчика в сетке (иконка, число, подпись)          |
| `logos-1`        | `LogosBlock`        | 12 логотипов партнёров (эмодзи)                      |
| `pricing-1`      | `PricingBlock`      | 3 тарифных плана (выделен средний), цены в ₽         |
| `testimonial-1`  | `TestimonialsBlock` | 3 карточки отзывов с рейтингом звёздами              |
| `gallery-1`      | `GalleryBlock`      | Сетка из 6 изображений с подписями                   |
| `video-1`        | `VideoBlock`        | Видео-секция с YouTube (thumbnail → iframe)          |
| `team-1`         | `TeamBlock`         | 4 карточки участников команды с соцсетями            |
| `faq-1`          | `FaqBlock`          | 4 вопроса в аккордеоне (toggle по клику)             |
| `steps-1`        | `StepsBlock`        | 4 шага в таймлайн-формате                            |
| `newsletter-1`   | `NewsletterBlock`   | Секция подписки на рассылку                          |
| `contact-1`      | `ContactFormBlock`  | Форма обратной связи (имя, email, сообщение)         |
| `app-1`          | `AppDownloadBlock`  | Кнопки App Store + Google Play                       |
| `cta-1`          | `CtaBlock`          | Призыв к действию с кнопкой                          |
| `footer-1`       | `FooterBlock`       | Полный футер (бренд, соцсети, 3 колонки ссылок)      |

---

## 🎯 Drag-and-Drop

Система DnD построена на библиотеке `@dnd-kit` и включает 3 сценария:

### 1. Добавление нового блока

```
BlocksPanel → DraggableBlock → (drag) → DroppableCanvas (id="canvas") → addBlock()
```

Данные при перетаскивании содержат `{ type, variant }`, по которым создаётся новый `BlockData`.

### 2. Сортировка блоков на холсте

```
SortableBlock → (drag) → SortableContext → moveBlock({ from, to })
```

Используется `@dnd-kit/sortable` с `verticalListSortingStrategy` для вертикальной сортировки.

### 3. Мини-превью при перетаскивании

`DndProvider` рендерит `DragOverlay` с мини-блоком (иконка + название) во время перетаскивания. Стилизация — градиентный фон, тень, blur-эффект (`DndOverlay.module.css`).

### Ключевые файлы

| Файл                  | Описание                                              |
| --------------------- | ----------------------------------------------------- |
| `dnd/DndProvider.tsx`  | `DndContext` + `DragOverlay` обёртка                  |
| `dnd/DraggableBlock.tsx` | `useDraggable` — делает элемент перетаскиваемым    |
| `dnd/DroppableCanvas.tsx` | `useDroppable` — делает холст зоной приёма        |
| `organisms/DroppableCanvas/` | `SortableContext` — сортировка блоков на холсте |

---

## 🪝 Кастомные хуки

### `useBlockActions`

```typescript
useBlockActions({ blocks: BlockData[], selectedIndex: number | null })
```

**Возвращает:** `{ deleteBlock, duplicateBlock, updateBlock, moveBlock, selectBlock }`

Инкапсулирует всю логику работы с блоками. Каждое действие:
1. Диспатчит Redux action
2. Пушит состояние в историю (для Undo/Redo)
3. Показывает тост-уведомление

### `useHotkeys`

```typescript
useHotkeys({ onSave, onUndo, onRedo, onDelete, onPreview, onDuplicate })
```

Регистрирует глобальные обработчики клавиш на `window`. Игнорирует события при фокусе на полях ввода.

### `useProject`

```typescript
useProject() → { saveProject, importProject, clearProject }
```

Управляет жизненным циклом проекта:
- **Загрузка** — восстановление из `localStorage` при монтировании
- **Автосохранение** — debounce 1 секунда при изменениях
- **Импорт** — загрузка из JSON-файла с записью в историю
- **Очистка** — удаление всех блоков

### `useUI`

```typescript
useUI() → { setDevice, setZoom, setActiveTab, openPreview, closePreview,
             openTemplates, closeTemplates, undo, redo }
```

Обёртка над UI-слайсом и историей Redux для удобного управления.

---

## 🔔 Контексты

### `ToastProvider`

Глобальная система тост-уведомлений через React Context.

```typescript
const { showToast, success, error, info, warning } = useToast();

// Примеры
success("Проект сохранён");
error("Ошибка при импорте");
info("Блок добавлен");
warning("Нет выделенного блока");
```

**Типы уведомлений:**

| Тип       | Иконка | Использование                      |
| --------- | ------ | ---------------------------------- |
| `success` | ✅     | Успешные операции                   |
| `error`   | ❌     | Ошибки                             |
| `info`    | ℹ️     | Информационные сообщения           |
| `warning` | ⚠️     | Предупреждения                     |

Тосты автоматически исчезают через 3 секунды (настраивается). Закрытие по клику. Отображаются в правом нижнем углу.

---

## 🔧 Утилиты

### `availableBlocks.ts`

Определяет каталог всех доступных блоков, сгруппированных по 17 категориям. Используется в `BlocksPanel` для отображения палитры блоков.

```typescript
type BlockGroup = {
  title: string;          // "🏷️ Hero", "⭐ Особенности", ...
  blocks: {
    id: string;           // Уникальный ID
    type: string;         // Тип блока ("hero", "feature", ...)
    variant: string;      // Вариант ("hero-1", "hero-2", ...)
  }[];
};
```

### `blockMap.ts`

Центральный реестр, связывающий варианты блоков с их React-компонентами и редактируемыми полями:

```typescript
type BlockMeta = {
  component: React.FC<BlockProps>;    // React-компонент для рендеринга
  editableFields: {                   // Поля для EditPanel
    name: string;                     // Ключ в BlockProps
    label: string;                    // Отображаемое название
    type: string;                     // "text" | "textarea" | ...
  }[];
};

const blockMap: Record<string, BlockMeta>;
// blockMap["hero-1"] → { component: HeroBlock, editableFields: [...] }
```

### `helpers.ts`

| Функция                       | Описание                                      |
| ----------------------------- | --------------------------------------------- |
| `parseList(str, separator?)`  | Разбивает строку в массив (по запятой)        |
| `createGradient(colors, dir?)`| Генерирует CSS `linear-gradient`              |
| `generateId()`                | Случайный 7-символьный ID                     |
| `deepClone<T>(obj)`           | Глубокое клонирование через JSON              |
| `moveArrayItem(arr, from, to)`| Иммутабельное перемещение элемента массива    |
| `duplicateArrayItem(arr, i)`  | Иммутабельное дублирование элемента           |
| `debounce(func, wait)`        | Стандартный debounce                          |
| `throttle(func, limit)`       | Стандартный throttle                          |

### `localStorage.ts`

| Функция                | Описание                                          |
| ---------------------- | ------------------------------------------------- |
| `saveToLocalStorage(blocks)` | Сохранить массив блоков в localStorage       |
| `loadFromLocalStorage()`     | Загрузить блоки из localStorage              |
| `clearLocalStorage()`        | Очистить сохранённые данные                  |

**Ключ хранения:** `"landing-constructor-project"`

### `projectExporter.ts`

| Функция                          | Описание                                           |
| -------------------------------- | -------------------------------------------------- |
| `exportProject(blocks, name?)`   | Экспорт проекта в JSON-файл (скачивание)          |
| `importProject(file)`            | Импорт проекта из JSON-файла (Promise)             |
| `exportProjectAsZip(blocks, name?)` | Экспорт в ZIP (project.json + index.html + React) |

**Формат ProjectData:**

```typescript
interface ProjectData {
  name: string;       // Имя проекта
  version: string;    // Версия формата
  blocks: BlockData[];// Массив блоков
  createdAt: string;  // ISO timestamp
}
```

ZIP-архив содержит:
- `project.json` — данные проекта
- `index.html` — сгенерированная статическая HTML-страница (с inline-стилями для основных блоков)
- `LandingPage.tsx` — заготовка React-компонента

### `templates.ts`

Предустановленные шаблоны лендингов:

| Шаблон      | Категория | Блоки                                               |
| ----------- | --------- | --------------------------------------------------- |
| **Стартап** | Бизнес    | hero-3, feature-2, benefit-1, pricing-1, testimonial-1, cta-1, footer-1 |
| **Портфолио** | Личное  | hero-2, benefit-1, testimonial-1, cta-1, footer-1   |
| **Продукт** | Бизнес    | hero-1, feature-2, pricing-1, footer-1               |

Доступные категории фильтрации: Все, Бизнес, Личное, Магазин, Ресторан, Спорт.

---

## 📦 Экспорт и импорт проектов

### Экспорт в JSON

Сохраняет все блоки и их свойства в `.json` файл с метаданными (имя, версия, дата).

### Экспорт в ZIP

Создаёт ZIP-архив с:
1. **project.json** — полные данные проекта (можно импортировать обратно)
2. **index.html** — готовая HTML-страница с inline-стилями (поддерживает hero-1, hero-2, feature-2, pricing-1, footer-1; остальные блоки — с placeholder-комментариями)
3. **LandingPage.tsx** — заготовка React-компонента

### Импорт

Загружает `.json` файл, валидирует наличие массива `blocks`, восстанавливает все блоки и их свойства.

---

## 🧑‍💻 Руководство разработчика: добавление нового блока

Чтобы добавить новый тип блока, выполните 4 шага:

### Шаг 1. Создать компонент блока

Создайте директорию в `src/components/organisms/` и файлы компонента:

```
src/components/organisms/MyNewBlock/
├── MyNewBlock.tsx
├── MyNewBlock.module.css
└── MyNewBlockEditableFields.ts
```

**MyNewBlock.tsx:**

```tsx
import { BlockProps } from '../../../type/blocks';
import styles from './MyNewBlock.module.css';

const MyNewBlock = (props: BlockProps) => {
  const title = props.title || 'Заголовок по умолчанию';
  const description = props.description || 'Описание по умолчанию';

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </section>
  );
};

export default MyNewBlock;
```

**MyNewBlockEditableFields.ts:**

```typescript
export const myNewBlockEditableFields = [
  { name: 'title', label: 'Заголовок', type: 'text' },
  { name: 'description', label: 'Описание', type: 'textarea' },
];
```

### Шаг 2. Зарегистрировать блок в blockMap

Добавьте запись в `src/utils/blockMap.ts`:

```typescript
import MyNewBlock from '../components/organisms/MyNewBlock/MyNewBlock';
import { myNewBlockEditableFields } from '../components/organisms/MyNewBlock/MyNewBlockEditableFields';

export const blockMap: Record<string, BlockMeta> = {
  // ... существующие блоки
  'mynew-1': {
    component: MyNewBlock,
    editableFields: myNewBlockEditableFields,
  },
};
```

### Шаг 3. Добавить блок в каталог

Добавьте группу или запись в `src/utils/availableBlocks.ts`:

```typescript
export const availableBlockGroups = [
  // ... существующие группы
  {
    title: '🆕 Мой блок',
    blocks: [
      { id: 'mynew-1', type: 'mynew', variant: 'mynew-1' },
    ],
  },
];
```

### Шаг 4. Добавить мини-превью (опционально)

В `src/dnd/DndProvider.tsx` добавьте запись в маппинг иконок и названий для мини-превью при перетаскивании.

В `src/organisms/LayersPanel/LayersPanel.tsx` добавьте отображаемое название для панели слоёв.

В `src/organisms/BlocksPanel/BlockVariantsSlider.tsx` добавьте иконку и название для панели вариантов.

---

## 📝 Примеры использования

### Добавление блока

1. Откройте панель блоков слева
2. Выберите категорию (например, "🏷️ Hero")
3. В выдвижной панели перетащите вариант на холст
4. Блок появится в конце страницы

### Редактирование блока

1. Кликните на блок на холсте
2. В правой панели (вкладка "Свойства") измените поля
3. Изменения применяются автоматически в реальном времени

### Изменение порядка блоков

1. Наведите на блок на холсте
2. Перетащите его вверх или вниз
3. Порядок обновится с анимацией

### Использование шаблона

1. Откройте модальное окно шаблонов из шапки
2. Выберите шаблон (Стартап, Портфолио или Продукт)
3. Блоки шаблона загрузятся на холст

### Экспорт проекта

1. Нажмите кнопку экспорта в правой панели (вкладка "Свойства")
2. Выберите формат: **JSON** (данные) или **ZIP** (данные + HTML + React)
3. Файл скачается на устройство

### Импорт проекта

1. Нажмите "Импорт" в правой панели
2. Выберите ранее сохранённый `.json` файл
3. Блоки восстановятся на холсте

---

## 🤝 Вклад в проект

1. Форкните репозиторий
2. Создайте ветку: `git checkout -b feature/amazing-feature`
3. Закоммитьте изменения: `git commit -m 'Add amazing feature'`
4. Отправьте в ветку: `git push origin feature/amazing-feature`
5. Откройте Pull Request

### Стиль кода

- **Линтинг:** `npm run lint` (ESLint 9)
- **Форматирование:** `npm run format` (Prettier)
- **Конфиг EditorConfig:** `.editorconfig`
- **TypeScript:** Strict mode

---

## 📄 Лицензия

MIT License — см. файл [LICENSE](LICENSE)

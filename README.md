# ПОСИЛАННЯ НА МАКЕТ

FIGMA LAYOUT 🔗 https://www.figma.com/file/.....

# 🥤 Gulp-Nunjucks-Tailwindcss Starter kit

## 1) Запуск збірки

Встановити залежності проєкту:

```
bun install / pnpm install / yarn / npm i
```

Запустити проєкт в режимі розробки:

```
bun start / pnpm start / yarn start / npm start
```

Створити білд для продакшену:

```
pnpm build / yarn build / npm run build
```

Створити файли секцій:
(попередньо додавши назви секцій в массив «SECTIONS» всередині цього файлу):

```
node create-section-files.mjs
```

## 2) Інформація про збірку

- В збірці використовується HTML шаблонізатор [Nunjucks](https://mozilla.github.io/nunjucks/templating.html).

> HTML cторінки зберігаються за шляхом **«src/html/pages»**.
>
> HTML файли секцій зберігаються за шляхом **«src/html/sections»**.
>
> HTML файли компонентів зберігаються за шляхом **«src/html/components»**.

- В збірці використовується CSS framework [Tailwind](https://tailwindcss.com/docs/installation) та звичайний CSS.

> CSS файл для підключення усіх стилів зберігається за шляхом **«src/css/main.css»**.
>
> CSS файли секцій зберігаються за шляхом **«src/css/sections»**.
>
> CSS файли компонентів зберігаються за шляхом **«src/css/components»**.

- В збірці є автоматична оптимізація усіх зображень (додатково стискати та обробляти власноруч через сервіси не
  потрібно).

- В збірці є автоматичне створення WEBP зображень з jpg/png. Для цього потрібно покласти jpg або png зображення в папку
  «src/images» і збірка автоматично створить webp в папку build.

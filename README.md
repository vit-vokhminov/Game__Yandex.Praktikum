# Game Runner

Учебный проект 2-го блока курса "Мидл фронтенд-разработчик" от Яндекс.Практикум

## Краткое описание

Игра на canvas api. Сама игра это бесконечный раннер по аналогии с T-Rex Chrome. Реализована возможность менять персонажа, и выбирать уровень в игре. В игре присутствует музыкальное и звуковое сопровождение.

[Презентация](https://docs.google.com/presentation/d/1wku55QD2bHyMIsR0KuhYWUB6WAqFYoOw/edit?usp=sharing&ouid=102776207854592510887&rtpof=true&sd=true)

## Стек

- React.js
- Redux-saga
- Yup
- Webpack 5
- TypeScript
- Babel
- Canvas API
- SSR
- Jest и Enzyme
- Node.js
- Express
- PostgreSQL
- OAuth-авторизация
- ESLint / Prettier
- Docker

## Страницы

- Аторизация

![Image alt](https://github.com/vit-vokhminov/Game__Yandex.Praktikum/blob/master/public/README_IMG/2021-11-14_19-47-03.png)

- Регистрация

![Image alt](https://github.com/vit-vokhminov/Game__Yandex.Praktikum/blob/master/public/README_IMG/2021-11-14_19-47-04.png)

- Главная страница

![Image alt](https://github.com/vit-vokhminov/Game__Yandex.Praktikum/blob/master/public/README_IMG/2021-11-14_19-48-49.png)

- Выбор персонажа и уровня игры

![Image alt](https://github.com/vit-vokhminov/Game__Yandex.Praktikum/blob/master/public/README_IMG/2021-11-14_19-49-22.png)

- Игра на Canvas

![Image alt](https://github.com/vit-vokhminov/Game__Yandex.Praktikum/blob/master/public/README_IMG/2021-11-14_19-49-23.jpg)


![Image alt](https://github.com/vit-vokhminov/Game__Yandex.Praktikum/blob/master/public/README_IMG/2021-11-14_19-49-24.png)

- Профиль 

![Image alt](https://github.com/vit-vokhminov/Game__Yandex.Praktikum/blob/master/public/README_IMG/2021-11-14_19-51-26.png)

- Форум

![Image alt](https://github.com/vit-vokhminov/Game__Yandex.Praktikum/blob/master/public/README_IMG/2021-11-14_19-50-20.png)

- Топ 10 лидеров

![Image alt](https://github.com/vit-vokhminov/Game__Yandex.Praktikum/blob/master/public/README_IMG/2021-11-14_27-51-26.png)


- Страница 404

![Image alt](https://github.com/vit-vokhminov/Game__Yandex.Praktikum/blob/master/public/README_IMG/2021-11-14_27-51-27.png)


## Установка

В файле `.env` указаны доступы к базе данных. В базе данных PostgreSQL (например pgAdmin), нужно создать базу данных в соответствии с данными из файла `.env`.

Далее нужно просто запустить установку.

```
npm i
```

### Запуск (development)

```
npm run dev
```

### Сборка (development)

```
npm run build:dev
```

### Сборка (production)

```
npm run build:prod
```

## Важно
В объекте `window` есть параметр `devicePixelRatio`. Он указывает на размер пикселя экрана. В моём случает он равнялся 1. 
На разных мониторах это параметр может отличаться. Тестировал на мониторе с размером пикселя 1.25 проблем не было. 
Но были отзывы, что игра сильно ускоряется. У меня не было возможности провести тестирование этой проблемы.
Если в вашем случае эта проблема возникнет, найдите через поиск по файлам параметр `window.devicePixelRatio` и подберите нужный параметр под ваш экран. По изначальной задумке, одна игровая сессия не может быть дольше 1 минуты.
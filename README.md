# Middle Frontend
Frontend для чата. Проект использует ванильный JS-код.
Технологии:
* cборщик Parcel
* шаблонизатор Handlebars
* PostCSS
* NodeJS + Express

## Ссылки

* [Netlify](https://boring-jennings-3032fe.netlify.app/)
* [Github](https://github.com/vvsinelnikov/middle.messenger.praktikum.yandex/)
* [Pull Request]()


### Установка

- `npm install` — установка стабильной версии,
- `npm run dev` — сборка версии lля разработчика, http://localhost:1234/
- `npm run build` — сборка стабильной версии (папка dist)
- `npm run start` — запуск сервера Express, http://localhost:3000/

### UI
Пока использован шаблонный UI из задания. Дизайн частично упрощен
* [Figma](https://www.figma.com/file/gloJZbe2t9pAgvwUNcxusy/MessageMe?node-id=0%3A1/)

### TODO
* Вынести интерфейсы
* Сократить использование типов any
* Унифицировать тип входящих данных для renderer
* Messages: Переписать вывод изображений на img
* Messages: Написать логику отображения и цвета галочек
* Chat: Дописать логику постинга даты, вынести ее рендеринг из компонента Message
* Chat: Добавить ID для каждого сообщения
* Chat: Добавить методы для изменения статуса прочтения isRead
* Добавить валидацию форм
* Сверстать всплывающие окна
* Сделать верстку адаптивной
* Добавить микроанимации

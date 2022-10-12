# Учебный проект Кексобукинг

🌐 [Сайт проекта](https://qostua.github.io/keksobooking/) | 📄 [Репозиторий](https://github.com/qostua/keksobooking/)

**project tegs**: `JavaScript`, `Custom Validation`, `File API`, `Template`, `Debounce`, `Leaflet lib`

**lighthouse scores**: ✅ Performance `98` | ✅ Accessibility `98` | ✅ Best Practices `92`

![Интерфейс сайта](https://user-images.githubusercontent.com/79047487/195340556-3f14a9c9-f4d1-4d17-ae1c-646a859ad2e7.jpg)

Кексобукинг — сервис размещения объявлений о сдаче в аренду недвижимости в центре Токио. Пользователям предоставляется возможность размещать объявления о своей недвижимости или просматривать уже размещённые объявления.

⬇️ [Техническое описание проекта](#tech-desk) | ⬇️ [Качество кода](#quality) | ⬇️ [Запуск проекта](#start)

### <a name="tech-desk">Техническое описание</a>

![Схема модулей проекта](https://user-images.githubusercontent.com/79047487/195343326-e3a4c7e7-63a5-4ee5-ae88-305c0ce9c834.png)

Схема модулей проекта

При загрузке страницы сайт блокирует формы объявления и фильтрации . После инициализации карты (раелизована библиотекой `[Leaflet](https://leafletjs.com/)`) форма создания объявления активируется и отправляется `Fetch` запрос для получения данных размещенных объявлений. В случае успешного запроса объявления отображаются на карте и активируется форма фильтрации, в противном случае показывается уведомление об ошибке.

Форма объявлений динамически валидируется на клиенте. Кастомная валидация реализованна с помощью `JS Validation API`. Требования к полю отображаются при вводе данных. В случае отправки некорректной формы подсвечиваются все невалидные поля. Ограничения некоторых полей меняются, в зависимости от выбранных опций. Выбор адреса осуществляется перемещением красного маркера по карте. Для загруженных изображений доступен предпросмотр, реализованный с помощью `File API`. Если форма валидна данные отправляются на сервер `Fetch` запросом. Кнопка отпраки блокируется до получения ответа. В зависимости от успешности ответа отображается соответствующие уведомление.

При изменении опций в форме карты, происходит фильтрация объявлений, на карте отображаются соответствующие маркеры. Отрисока маркеров происходит не чаще, чем раз в полсекунды (устранён дребезг). При клике на маркер отображается сгенерировыннй из `template` шаблона попап.

[Техническое задание целиком](https://www.notion.so/7b4346d4261347e5b996078472fb8dcb).

### <a name="quality">Качество кода</a>

Код соответствует следующим критериям качества:

- ****Задача****
    - Техническое задание реализовано в полном объёме.
    - При выполнении кода не возникает необработанных ошибок.
- ****Именование****
    - Названия переменных, параметров, свойств и методов записываются в нотации camelCase на английском языке в едином стиле. Переменные носят абстрактные названия. Названия не содержат зарезервированных слов.
    - Имена переменных и свойств — существительные, массивов — существительными во множественном числе, имя функции или метода содержит глагол.
    - Названия констант написаны заглавными буквами.
    - Название классов, конструкторов и перечислений начинается с заглавной буквы. В названии используются существительные. Перечисления объявлены как константы.
    - Название методов и свойств объектов не содержит название объектов.
    - Из названия обработчика события и функции-колбэка следует, что это обработчик.
- ****Единообразие****
    - Все функции объявлены единообразно (используются стрелочные функции).
    - При использовании встроенного API, который поддерживает несколько вариантов использования, используется один способ.
- ****Форматирование и внешний вид.****
    - Для всех инструкций используются обязательные блоки кода
    - Список констант идёт перед основным кодом.
    - Не возникает ошибок при проверке `ESLint`.
- ****Мусор****
    - В итоговом коде проекта находятся только те файлы, которые были на момент создания репозитория, полученные в патчах, и файлы, созданные по заданию.
    - Версии используемых зависимостей зафиксированы в `package.json`.
    - В коде нет заранее недостижимых участков кода.
- ****Корректность****
    - Константы нигде в коде не переопределяются.
    - Включён строгий режим.
    - Используются строгие сравнения вместо нестрогих.
    - API встроенных функций и объектов используется правильно.
    - Отсутствуют потенциально некорректные операции (например `new Date() + 1000`).
- ****Модульность****
    - Все файлы JS представляют собой отдельные модули [ES2015](http://exploringjs.com/es6/ch_modules.html)
    - Модули не экспортируют изменяющиеся переменные.
    - Повторяющийся в нескольких модулях код вынесен в отдельный модуль.
- ****Избыточность****
    - В проекте не должно быть избыточных проверок.
    - Отсутствует дублирование кода: повторяющиеся части кода переписаны как функции.
    - Если при использовании условного оператора в любом случае возвращается значение, альтернативная ветка опускается.
    - Отсутствуют лишние приведения и проверки типов.
    - В присвоении значения вместо if предпочитать тернарный оператор.
    - Функция, возвращающая булево значение, не использует `if..else` с лишними `return`).
- ****Универсальность****
    - Код является кроссбраузерным и не вызывает ошибок в разных браузерах.
- ****Магия****
    - Нельзя пользоваться глобальной переменной `event`.
    - Под каждое «магическое значение» заведена отдельная константа.
- ****Оптимальность****
    - Своевременный выход из цикла: цикл не работает дольше чем нужно. Количество вызовов циклов минимизировано.
    - Множественные DOM-операции производятся на элементах, не добавленных в DOM.
    - Константы, используемые внутри функций, создаются вне функций и используются повторно через замыкания.
    - Массивы и объекты, содержимое которых вычисляется, собираются один раз, а после этого только переиспользуются. Это относится и к поиску элементов по селекторам.
    - Изменения применяются точечно.
- ****Сложность. Читаемость.****
    - Для каждого события используется отдельный обработчик.
    - Длинные функции и методы разбиты на несколько небольших.
    - Для работы с JS-коллекциями используются итераторы для массивов.
    - Оператор присваивания не используется как часть выражения.
- ****Безопасность****
    - Обработчики событий добавляются и удаляются своевременно.
    - Для вставки пользовательских строк использован `textContent`.

### <a name="start">Запуск проекта</a>

Установка зависимостей:

```bash
npm i
```

Запуск локального сервера:

```bash
npm start
```

Запуск тестирования:

```bash
npm test
```

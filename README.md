## Установка
1. Установить git. **Ubuntu Linux** `sudo apt-get install git`
2. Установить [Node.js](https://nodejs.org). Для **Ubuntu Linux** [это делается вот так] (https://github.com/nodesource/distributions#installation-instructions). Лучше ставить одну из последних стабильных версий. 
3. Node.js устанавливается сразу с пакетным менеджером **npm**. Через него мы устанавливаем пакетный менеджер для клиентских зависимостей. `sudo npm i bower -g`
4. Клонировать репозиторий. `git clone https://github.com/Max95474/OpenDataVisualizer.git`
5. Установить зависимости сервера через **npm**. Для этого в терминате нужно перейти в директорию с проектом и сделать `npm i`
6. Установить зависимости клиента через **bower**. Для этого в терминате нужно перейти в директорию с проектом и сделать `bower install`
7. Установить утилиту для запуска сервера. `npm i pm2 -g`
8. Запустить сервер `pm2 start server.js`
9. Приложение должно работать на порту **3000**

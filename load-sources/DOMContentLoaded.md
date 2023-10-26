- DOMContentLoaded – DOM готовий, тому обробник може шукати вузли DOM, ініціалізувати інтерфейс.
- load – завантажуються зовнішні ресурси, тому застосовуються стилі, відомі розміри зображень тощо.
- beforeunload – користувач покидає сторінку: ми можемо перевірити, чи зберіг користувач зміни, і запитати, чи дійсно він хоче піти.
- unload – користувач майже пішов, але ми все ще можемо ініціювати деякі операції, наприклад надсилати статистику.

##### DOMContentLoaded та скрипти
Коли браузер обробляє HTML-документ і зустрічає тег <script>, його потрібно виконати, перш ніж продовжити створення DOM. Це запобіжний захід, оскільки сценарії можуть захотіти змінити DOM і навіть document.write в нього, тому DOMContentLoaded має зачекати.

##### DOMContentLoaded та стилі
Зовнішні таблиці стилів не впливають на DOM, тому DOMContentLoaded не чекає їх.

Але якщо у нас є скрипт після стилю, то він повинен почекати, поки таблиця стилів не завантажиться, бо скрипт може захотіти отримати координати та інші властивості елементів, що залежать від стилю. Оскільки DOMContentLoaded очікує на скрипти, тепер він також чекає на стилі перед ними.

##### Вбудована функція автозаповнення браузера

Наприклад, якщо на сторінці є форма з логіном та паролем, і браузер запам’ятав значення, то на DOMContentLoaded він може спробувати їх автоматично заповнити (якщо це схвалено користувачем).

Тож якщо DOMContentLoaded відкладається довгим завантаженням скриптів, то автозаповнення також чекає. 

##### window.onload

Подія load для об’єкта window запускається, коли завантажується вся сторінка, включаючи стилі, зображення та інші ресурси. Ця подія доступна через властивість onload.

##### window.onunload
Коли відвідувач залишає сторінку, у window запускається подія unload. Ми можемо зробити щось, що не передбачає затримки, наприклад закрити пов’язані спливаючі вікна.

Скажімо, ми збираємо дані про те, як використовується сторінка: клацання мишею, прокручування, переглянуті області сторінки тощо.

Як і слід було чекати, подія unload – це коли користувач залишає нас, і ми хочемо зберегти дані на нашому сервері.

Для таких потреб існує спеціальний метод navigator.sendBeacon(url, data), описаний у специфікації https://w3c.github.io/beacon/.
let analyticsData = { /* об’єкт із зібраними даними */ };

window.addEventListener("unload", function() {
  navigator.sendBeacon("/analytics", JSON.stringify(analyticsData));
});

##### window.onbeforeunload

Якщо відвідувач ініціював перехід зі сторінки або намагається закрити вікно, обробник beforeunload запитає додаткове підтвердження.

Якщо ми скасовуємо подію, браузер може запитати відвідувача, чи впевнений він

window.onbeforeunload = function() {
  return false;
};

event.preventDefault() не працює з beforeunload обробником

##### readyState

Властивість document.readyState повідомляє нам про поточний стан завантаження.

Є 3 можливі значення:

- "loading" – документ завантажується.
- "interactive" – документ повністю прочитано.
- "complete" – документ повністю прочитано, і всі ресурси (наприклад, зображення) також завантажені.

function work() { /*...*/ }

if (document.readyState == 'loading') {
  // все ще завантажується, дочекайтеся події
  document.addEventListener('DOMContentLoaded', work);
} else {
  // DOM готовий!
  work();
}

<script>
  log('початковий readyState:' + document.readyState);

  document.addEventListener('readystatechange', () => log('readyState:' + document.readyState));
  document.addEventListener('DOMContentLoaded', () => log('DOMContentLoaded'));

  window.onload = () => log('window onload');
</script>

<iframe src="iframe.html" onload="log('iframe onload')"></iframe>

<img src="https://en.js.cx/clipart/train.gif" id="img">
<script>
  img.onload = () => log('img onload');
</script>

document.readyState стає interactive безпосередньо перед DOMContentLoaded. Ці дві речі насправді означають одне й те ж саме.
document.readyState стає complete, коли всі ресурси (iframe та img) завантажуються. Тут ми бачимо, що це відбувається приблизно в той же час, що й img.onload (img – останній ресурс) і window.onload. Перехід у стан complete означає те саме, що і window.onload. Різниця в тому, що window.onload завжди працює після всіх інших обробників load.
Будь-яка точка на сторінці має координати:

Відносно вікна – elem.getBoundingClientRect().
Відносно документа – elem.getBoundingClientRect() плюс значення поточної прокрутки.

#### Координати елемента відносно вікна: getBoundingClientRect
Метод elem.getBoundingClientRect() повертає координати у контексті вікна для мінімального за розмірами прямокутника, який вміщує elem у вигляді об’єкта вбудованого класу DOMRect.

Основні властивості DOMRect:

x/y – координати X/Y початку прямокутника відносно вікна,
width/height – ширина/висота прямокутника (можуть бути від’ємними).
Крім того, в об’єкті містяться такі похідні властивості:

top/bottom – Y-координата для верхнього/нижнього краю прямокутника,
left/right – X-координата для лівого/правого краю прямокутника.

left = x
top = y
right = x + width
bottom = y + height

Координати можуть бути від’ємними

#### elementFromPoint(x, y)
Виклик document.elementFromPoint(x, y) повертає найбільш вкладений елемент вікна з координатами (x, y).

let centerX = document.documentElement.clientWidth / 2;
let centerY = document.documentElement.clientHeight / 2;

let elem = document.elementFromPoint(centerX, centerY);

elem.style.background = "red";
alert(elem.tagName);


Оскільки код використовує координати відносно вікна, то елемент може відрізнятися залежно від поточної позиції прокручування.

ля координат, які знаходяться поза вікном elementFromPoint повертає null

Наприклад, наведена нижче функція createMessageUnder(elem, html) виводить повідомлення під елементом elem:

let elem = document.getElementById("coords-show-mark");

function createMessageUnder(elem, html) {
  // створюємо елемент повідомлення
  let message = document.createElement('div');
  // тут краще було б використати CSS клас
  message.style.cssText = "position:fixed; color: red";

  // призначаємо координати, не забуваємо про "px"!
  let coords = elem.getBoundingClientRect();

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}

// Використання:
// додаємо повідомлення у документ на 5 секунд
let message = createMessageUnder(elem, 'Привіт, світ!');
document.body.append(message);
setTimeout(() => message.remove(), 5000);

#### Координати відносно документа
 У CSS координати відносно вікна відповідають position:fixed, тоді як координати відносно документа подібні до position:absolute на верхньому рівні вкладеності.


// отримуємо координати елемента відносно документа
function getCoords(elem) {
  let box = elem.getBoundingClientRect();

  return {
    top: box.top + window.pageYOffset,
    right: box.right + window.pageXOffset,
    bottom: box.bottom + window.pageYOffset,
    left: box.left + window.pageXOffset
  };
}

Якщо б у наведеному вище прикладі ми використовували його разом з position:absolute, то повідомлення залишалося б біля елемента під час прокручування.



function createMessageUnder(elem, html) {
  let message = document.createElement('div');
  message.style.cssText = "position:absolute; color: red";

  let coords = getCoords(elem);

  message.style.left = coords.left + "px";
  message.style.top = coords.bottom + "px";

  message.innerHTML = html;

  return message;
}

#### Drag'n'Drop з подіями миші

Наш алгоритм Drag’n’Drop виглядає таким чином:

- На mousedown – підготувати елемент до переміщення, якщо це необхідно (наприклад, створити його клон, додати до нього клас або щось ще).
- Потім, на mousemove перемістити його, змінивши значення left/top при позиціюванні position: absolute.
- На mouseup – виконати усі дії, пов’язані із завершенням перенесення.

<script>
ball.onmousedown = function(event) {
  // (1) підготувати до переміщення: розмістити поверх іншого контенту і в абсолютних координатах
  ball.style.position = 'absolute';
  ball.style.zIndex = 1000;

  // перемістимо його з будь-яких поточних батьків безпосередньо в body
  // щоб розташувати його відносно body
  document.body.append(ball);
//   Коли користувач натискає на м’ячик (mousedown) – запам’ятаємо відстань від курсора миші до лівого верхнього кута м’яча в змінних shiftX/shiftY. Далі утримуватимемо цю відстань при пересуванні м’яча.
    let shiftX = event.clientX - ball.getBoundingClientRect().left;
    let shiftY = event.clientY - ball.getBoundingClientRect().top;
  // Далі при перенесенні м’яча ми позиціонуємо його з тим же зсувом відносно курсора миші, таким чином:
  function moveAt(pageX, pageY) {
    ball.style.left = event.pageX - shiftX + 'px';
    ball.style.top = event.pageY - shiftY + 'px';
  }

  // переносимо наш абсолютно позиціюнованний м’яч під курсор
  moveAt(event.pageX, event.pageY);

  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }

  // (2) пересуваємо м’яч на mousemove
  document.addEventListener('mousemove', onMouseMove);

  // (3) відпускаємо м’яч, видаляємо непотрібні обробники подій
  ball.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
  };


ball.ondragstart = function() {
  return false;
};

};
</script>
раузер має свій власний drag’n’drop, який автоматично запускається і вступає в конфлікт із нашим. Це відбувається саме для зображень та деяких інших елементів.

Його треба відключити:


ball.ondragstart = function() {
  return false;
};

#### Цілі перенесення (droppables)

ми беремо перетягуваний (draggable) елемент і поміщаємо його в інший елемент – “ціль перенесення” (droppable).

Нам потрібно знати:

-де елемент був залишений у кінці Drag’n’Drop – для виконання відповідної дії,
-і, бажано, над якою потенційною ціллю (елемент, куди можна покласти, наприклад, зображення папки) він знаходиться в процесі перенесення, щоб підсвітити її.


Існує метод document.elementFromPoint(clientX, clientY). Він повертає найбільш глибоко вкладений елемент за заданими координатами вікна

// всередині обробника події миші
ball.hidden = true; // (*) ховаємо елемент який переносимо

let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
// elemBelow -- елемент під м’ячем (можлива ціль перенесення)

ball.hidden = false;

Зауважимо, нам потрібно заховати м’яч перед викликом функції (*). В іншому випадку за цими координатами ми будемо отримувати м’яч, адже це і є елемент безпосередньо під курсором: elemBelow=ball.

##### Розширений код onMouseMove з пошуком потенційних цілей перенесення:

<script>
    // потенційна ціль перенесення, над якою ми пролітаємо прямо зараз
let currentDroppable = null;

function onMouseMove(event) {
  moveAt(event.pageX, event.pageY);

  ball.hidden = true;
  let elemBelow = document.elementFromPoint(event.clientX, event.clientY);
  ball.hidden = false;

  // подія mousemove може статися і коли курсор за межами вікна (м’яч перетягнули за межі екрану)
  // якщо clientX/clientY за межами вікна, elementFromPoint поверне null
  if (!elemBelow) return;

  // потенційні цілі перенесення позначені класом "droppable" (може бути і інша логіка)
  let droppableBelow = elemBelow.closest('.droppable');

  if (currentDroppable != droppableBelow) {
    // ми або залітаємо на ціль, або відлітаємо з неї
    // увага: обидва значення можуть бути null
    //  currentDroppable = null, якщо ми були не над droppable до цієї події (наприклад, над порожнім простором)
    //  droppableBelow = null, якщо ми не над droppable саме зараз, під час цієї події

    if (currentDroppable) {
      // логіка обробки процесу "вильоту" з droppable (видаляємо підсвічування)
      leaveDroppable(currentDroppable);
    }
    currentDroppable = droppableBelow;
    if (currentDroppable) {
      // логіка обробки процесу, коли ми "влітаємо" на елемент droppable
      enterDroppable(currentDroppable);
    }
  }
}
</script>

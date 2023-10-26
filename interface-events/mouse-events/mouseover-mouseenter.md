#### Події mouseover/mouseout, relatedTarget
Події mouseover/out і mouseenter/leave мають додаткову властивість: relatedTarget. Воно доповнює властивість target і містить посилання на елемент, з якого ми переходимо.

Для події mouseover:

event.target – це елемент, на який курсор перейшов.
event.relatedTarget – це елемент, з якого курсор пішов (relatedTarget → target).

Для події mouseout навпаки:

event.target - це елемент, з якого курсор пішов.
event.relatedTarget – це елемент, який курсор перейшов (target → relatedTarget).

Властивість відносятьсяTarget може бути null.

Це нормально і означає, що курсор миші перейшов не з іншого елемента, а через вікно браузера. Або ж, навпаки, пішов за межі вікна.

#### Пропуск елементів 

Браузер періодично перевіряє позицію курсору і, помітивши зміни, генерує події, що використовуються. подія не викликається кожен px

Якщо курсор миші пересунути дуже швидко з елемента #FROM на елемент #TO, то елементи <div> (або деякі з них), що лежать між ними, можуть бути пропущені.

let parent = document.getElementById('parent');
parent.onmouseover = parent.onmouseout = parent.onmousemove = handler;

function handler(event) {
  let type = event.type;
  while (type.length < 11) type += ' ';

  log(type + " target=" + event.target.id)
  return false;
}

Якщо курсор «офіційно» зайшов на елемент, тобто була подія mouseover, то при виході з нього обов'язково буде mouseout.


#### Подія mouseout при переході на нащадка
Важлива особливість події mouseout – вона генерується в тому числі, коли покажчик переходить з елемента на його нащадка.

Отже, якщо курсор переходить в інший елемент (нехай навіть дочірній), він залишає попередній.

Подія mouseover, що відбувається на нащадку, спливає. Тому якщо на батьківському елементі є такий обробник, воно його викличе.

При переході мишею із зовнішнього елемента на внутрішній, ви побачите відразу дві події: mouseout [target: parent] (пішли з батька) і mouseover [target: child] (перейшли на нащадка, подія випливла).

<div id="parent" onmouseover="mouselog(event)" onmouseout="mouselog(event)">parent
    <div id="child">child</div>
  </div>

  Щоб уникнути цього, можна дивитися на relatedTarget і, якщо миша все ще всередині елемента, то ігнорувати такі події.

Або ж можна використовувати інші події: mouseenter і mouseleave

#### Події mouseenter і mouseleave

Вони також генеруються, коли курсор миші переходить на елемент або залишає його.

Але:

- Переходи всередині елемента, на його нащадки і з них, не зважають.
- Події mouseenter/mouseleave не спливають.

Коли курсор з'являється над елементом – генерується mouseenter, причому немає значення, де саме курсор: на самому елементі чи його нащадку.

Подія mouseleave відбувається, коли курсор залишає елемент.

#### Делегування подій 

Так як події mouseenter і mouseleave не спливають, для делегування використовуємо mouseover i mouseout, щоб вказати де саме ми хочемо бачити переходи а де ні, наприклад у таблиці між клітинками, але не всередині них :

- Запам'ятовувати поточну комірку <td> в змінну, яку назвемо currentElem.
- На mouseover – ігнорувати подію, якщо ми все ще всередині того ж осередку <td>.
- На mouseout – ігнорувати подію, якщо це не відхід з поточної комірки <td>.


// ячейка <td> под курсором в данный момент (если есть)
let currentElem = null;

table.onmouseover = function(event) {
  // перед тем, как войти на следующий элемент, курсор всегда покидает предыдущий
  // если currentElem есть, то мы ещё не ушли с предыдущего <td>,
  // это переход внутри - игнорируем такое событие
  if (currentElem) return;

  let target = event.target.closest('td');

  // переход не на <td> - игнорировать
  if (!target) return;

  // переход на <td>, но вне нашей таблицы (возможно при вложенных таблицах)
  // игнорировать
  if (!table.contains(target)) return;

  // ура, мы зашли на новый <td>
  currentElem = target;
  target.style.background = 'pink';
};


table.onmouseout = function(event) {
  // если мы вне <td>, то игнорируем уход мыши
  // это какой-то переход внутри таблицы, но вне <td>,
  // например с <tr> на другой <tr>
  if (!currentElem) return;

  // мы покидаем элемент – но куда? Возможно, на потомка?
  let relatedTarget = event.relatedTarget;

  while (relatedTarget) {
    // поднимаемся по дереву элементов и проверяем – внутри ли мы currentElem или нет
    // если да, то это переход внутри элемента – игнорируем
    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;
  }

  // мы действительно покинули элемент
  currentElem.style.background = '';
  currentElem = null;
};
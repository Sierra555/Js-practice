#### Делегування подій
Ідея в тому, що якщо у нас є багато елементів, які обробляються подібним чином, то замість того, щоб призначати обробник кожному з них, ми ставимо один обробник на їхнього спільного предка.

let selectedTd;

table.onclick = function(event) {
  let td = event.target.closest('td'); // (1)

  if (!td) return; // (2)

  if (!table.contains(td)) return; // (3)
  highlight(target); // (4)
};

function highlight(td) {
  if (selectedTd) { // видалити наявне виділення, якщо таке є
    selectedTd.classList.remove('highlight');
  }
  selectedTd = td;
  selectedTd.classList.add('highlight'); // виділити новий td
}


1. Метод elem.closest(selector) повертає найближчого предка, який відповідає селектору. У нашому випадку ми шукаємо <td>, який знаходиться вище по дереву від вихідного елемента.

2. Якщо event.target не знаходиться всередині жодного <td>, тоді виконання функції одразу завершиться, оскільки більше робити нічого.

3. У разі вкладених таблиць event.target може бути <td>, але знаходитись за межами поточної таблиці. Тож ми перевіряємо, чи це насправді <td> нашої таблиці.

4. І якщо це так, то виділяємо його.

##### Приклад делегування: дії в розмітці
<div id="menu">
  <button data-action="save">Зберегти</button>
  <button data-action="load">Завантажити</button>
  <button data-action="search">Пошук</button>
</div>

<script>
  class Menu {
    constructor(elem) {
      this._elem = elem;
      elem.onclick = this.onClick.bind(this); // (*)
    }

    save() {
      alert('збереження');
    }

    load() {
      alert('завантаження');
    }

    search() {
      alert('пошук');
    }

    onClick(event) {
      let action = event.target.dataset.action;
      if (action) {
        this[action]();
      }
    };
  }

  new Menu(menu);
</script>

#### Поведінка: Перемикач

<button data-toggle-id="subscribe-mail">
  Показати форму підписки
</button>

<form id="subscribe-mail" hidden>
  Ваша пошта: <input type="email">
</form>

<script>
  document.addEventListener('click', function(event) {
    let id = event.target.dataset.toggleId;
    if (!id) return;

    let elem = document.getElementById(id);

    elem.hidden = !elem.hidden;
  });
</script>
#### Фокусування: focus/blur

Елемент отримує фокус тоді, коли користувач або клікає на нього або натискає Tab на клавіатурі. Також є HTML-атрибут autofocus, який автоматично встановлює фокус на елементі.

##### Події focus/blur

Обробник події blur перевіряє чи заповнено поле email, а якщо ні – показує помилку.
Обробник події focus ховає повідомлення про помилку (на blur перевірку буде виконано ще раз):

<code>
<style>
  .invalid { border-color: red; }
  #error { color: red }
</style>

Ваша електронна адреса: <input type="email" id="input">

<div id="error"></div>

<script>
input.onblur = function() {
  if (!input.value.includes('@')) { // це не електронна адреса
    input.classList.add('invalid');
    error.innerHTML = 'Будь ласка, введіть правильну електронну адресу.'
  }
};

input.onfocus = function() {
  if (this.classList.contains('invalid')) {
    // видалити індикатор помилки, тому що користувач хоче ввести дані заново
    this.classList.remove('invalid');
    error.innerHTML = "";
  }
};
</script>
</code>

##### Методи elem.focus() та elem.blur() встановлюють/прибирають фокус на елементі.
<code>
<script>
  input.onblur = function() {
    if (!this.value.includes('@')) { // це не електронна адреса
      // показати помилку
      this.classList.add("error");
      // ...та повернути фокус
      input.focus();
    } else {
      this.classList.remove("error");
    }
  };
</script>
</code>
alert зміщує фокус на себе, тому елемент втрачає фокус (подія blur), а коли alert закривається – фокус повертається елементу (подія focus).
Якщо елемент видалили з DOM, це також призводить до втрати фокусу. Якщо пізніше його вставити знову, то фокус не повернеться.

#### Дозволити фокусування на будь-якому елементі: tabindex
підтримка focus/blur гарантована для елементів з якими користувач може взаємодіяти: <button>, <input>, <select>, <a> та інших.

З іншого боку, елементи призначені для форматуваня, такі як <div>, <span>, <table> – за замовчуванням не фокусуються. Метод elem.focus() не працює з ними, а події focus/blur ніколи не генеруються.

Якщо елемент має атрибут tabindex, то на ньому можна фокусуватися

Порядок наступний: елементи з заданим tabindex від 1 і вище йдуть першими(в порядку значень tabindex), а далі елементи без tabindex (наприклад, звичайний <code><input></code>).

tabindex="-1" дозволяє лише програмне фокусування на елементі. Клавіша Tab ігнорує такі елементи, проте метод elem.focus() спрацьовує.

Ми можемо додати tabindex з JavaScript за допомогою властивості elem.tabIndex. Це має такий самий ефект.

#### Делегування: focusin/focusout

Події focus та blur не спливають.

є події focusin та focusout – такі ж самі як focus/blur, тільки вони спливають.

<form id="form">
  <input type="text" name="name" value="Ім’я">
  <input type="text" name="surname" value="Прізвище">
</form>

<style> .focused { outline: 1px solid red; } </style>

<script>
  form.addEventListener("focusin", () => form.classList.add('focused'));
  form.addEventListener("focusout", () => form.classList.remove('focused'));
</script>

###### Поточний елемент в фокусі можна отримати з document.activeElement.


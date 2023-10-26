Форми в документі є членами спеціальної колекції document.forms.

щоб отримати форму ми можемо використовувати: 

document.forms.my; // форма з іменем "my" (name="my")
document.forms[0]; // перша форма в документі

Коли у нас є форма, будь-який її елемент доступний в іменованій колекції form.elements.

<form name="my">
  <input name="one" value="1">
  <input name="two" value="2">
  <input type="radio" name="age" value="10">
  <input type="radio" name="age" value="20">
   <fieldset name="userFields">
      <legend>info</legend>
      <input name="login" type="text">
    </fieldset>
</form>

<script>
  // отримуємо форму
let form = document.forms.my; // елемент <form name="my">

// отримуємо елемент
let elem = form.elements.one; // елемент <input name="one">

let ageElems = form.elements.age;

let fieldset = form.elements.userFields;


alert(ageElems[0].value); // 10
alert(ageElems[1].value); // 20
alert(elem.value); // 1

// ми можемо отримати поле за іменем як з форми, так і з елементу fieldset
    alert(form.elements.login); // <input name="login">
    alert(fieldset.elements.login == form.elements.login); // true
</script>

#### Елементи форми

##### input та textarea

Ми можемо отримати доступ до їх значення через властивість input.value (рядок) або input.checked (логічне значення) для чекбоксів і перемикачів (radio buttons).

Використовуйте textarea.value замість textarea.innerHTML
Властивість innerHTML містить лише початковий HTML, а не поточне значення.

##### select та option

Елемент <select> має 3 важливі властивості:

select.options – набір піделементів <option>,
select.value – значення поточного обраного елемента <option>,
select.selectedIndex – номер поточного обраного елемента <option>.

встановлення значення для <select>:

<select id="select">
  <option value="apple">Яблуко</option>
  <option value="pear">Груша</option>
  <option value="banana">Банан</option>
</select>

<script>
  // всі три рядки роблять те саме
  select.options[2].selected = true;
  select.selectedIndex = 2;
  select.value = 'banana';
  // зверніть увагу: опції починаються з нуля, тому індекс 2 означає 3-й варіант.
</script>

На відміну від більшості інших елементів керування, <select> дозволяє вибрати декілька опцій одночасно, якщо він має атрибут multiple. Однак цей атрибут використовується рідко.

<script>
// отримати всі вибрані значення з множинного вибору
  let selected = Array.from(select.options)
    .filter(option => option.selected)
    .map(option => option.value);
</script>

Вся інформація щодо елемента <select> доступна в специфікації https://html.spec.whatwg.org/multipage/forms.html#the-select-element.

###### new Option

створення елемента <option>:

option = new Option(text, value, defaultSelected, selected);

Різниця між defaultSelected та selected полягає в тому, що defaultSelected встановлює HTML-атрибут (який ми можемо отримати за допомогою option.getAttribute('selected'), тоді як selected визначає, обрана опція чи ні. На практиці зазвичай слід встановлювати значення обох параметрів на true або false. (Або просто не додавайте їх – за замовчуванням вони мають значення false.)

Елементи <option> мають такі властивості:

- option.selected

Вказує чи обрана опція.

- option.index

Номер опції серед інших в елементі <select>.

- option.text

Текстовий зміст опції (те, що бачить відвідувач).

Специфікація: https://html.spec.whatwg.org/multipage/forms.html.


element.form
Елементи посилаються на свою форму через властивість form.


завдання: Додайте нову опцію до елемента `<select>`
Виведіть значення та текст обраної опції.
Додайте опцію: <code><option value="classic">Класика</option></code>.
Зробіть її обраною.

<script> 
<select id="genres">
  <option value="rock">Рок</option>
  <option value="blues" selected>Блюз</option>
</select>
const genres = document.querySelector('#genres');

let selectedOpt = genres.options[genres.selectedIndex];
alret(selectedOpt);
genres.options[2] = new Option('Класика', 'classic', true, true);
 
</script>

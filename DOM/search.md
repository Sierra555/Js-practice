Існує 6 основних методів пошуку елементів у DOM:
- querySelector	
- querySelectorAll	
- getElementById	
- getElementsByName	
- getElementsByTagName	
- getElementsByClassName


1. Не використовуйте id-іменовані глобальні змінні для доступу до елементів.


2. Псевдокласи в CSS-селекторі, такі як :hover і :active, також підтримуються. Наприклад, document.querySelectorAll(':hover') поверне колекцію елементів, що знаходяться під курсором миші (у порядку вкладення: від зовнішнього <html> до найбільш вкладеного).

3. Крім того:

Існує метод elem.matches(css) , який перевіряє, чи відповідає elem заданому CSS-селектору.
Існує метод elem.closest(css) , який шукає найближчого предка, який відповідає заданому CSS-селектору. Сам elem також перевіряється.
І згадаймо тут ще один метод перевірки взаємовідносин нащадок-предок, оскільки він іноді стає в нагоді:

elemA.contains(elemB) повертає true, якщо elemB знаходиться всередині elemA (нащадок elemA) або коли elemA==elemB.

4. Усі методи "getElementsBy*" повертають живу колекцію. Такі колекції завжди відображають поточний стан документа і “автооновлюються” при його зміні.

На відміну від цього, querySelectorAll повертає статичну колекцію. Це схоже на фіксований масив елементів.


Як знайти?…

Таблиця з id="age-table". - let table = document.getElementById("age-table");
Усі елементи label всередині цієї таблиц. - document.getElementsByTagName('label')/document.querySelectorAll('#age-table label');
Перший td у цій таблиці  - table.querySelector('td')/table.getElementsByTagName('td')[0]/table.rows[0].cells[0];
form з name="search" - let form = document.getElementsByName('search')/document.querySelector('form[name="search"]');
Перший input у цій формі - form.querySelector('input')/form.getElementsByTagName('input')[0];
Останній input у цій формі. let inputs = document.querySelectorAll()  inputs[inputs.length-1];

.is-inactive {
  opacity: .5;
  text-decoration: line-through;
}

.is-checked {
  padding-right: 1.4em;
  background-image: url("data:image/svg+xml,%3Csvg width='12' height='10' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m10.166 0-6 6.206-2.332-2.412L0 5.69 4.166 10 12 1.897 10.166 0Z' fill='%23"
      + str-slice("#{#4F8F06}", 2)
      + "'/%3E%3C/svg%3E");
  background-position: 100% 50%;
  background-size: .85em .7em;
  background-repeat: no-repeat;
}
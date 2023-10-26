#### classList

Коли ми присвоюємо щось властивості elem.className, це значення замінює весь рядок класів.

Властивість elem.classList – це спеціальний об’єкт, який містить методи для додавання, видалення або перемикання окремого класу.

elem.add/remove("class") – додати/видалити клас.
elem.classList.toggle("class") – додає клас, якщо він не існує, інакше видаляє його.
elem.classList.contains("class") – перевіряє, чи існує переданий клас, відповідно повертає true/false.

#### Стилі елемента

button.style.MozBorderRadius = '5px';
button.style.WebkitBorderRadius = '5px';

##### Скидання властивості в elem.style

elem.style.display = "none"
Замість delete elem.style.display ми повинні присвоїти їй порожній рядок: elem.style.display = "".

Також для цього існує спеціальний метод elem.style.removeProperty('style property'). Отже, ми можемо видалити таку властивість наступним чином:

elem.style.removeProperty('display')

##### Повний перезапис за допомогою style.cssText

Існує спеціальна властивість style.cssText, яка дає змогу встановлювати повний стиль елемента як рядок:
<script>
  // тут можна встановити такі спеціальні прапорці стилю, як "important"
  div.style.cssText=`color: red !important;
    background-color: yellow;
    width: 100px;
    text-align: center;
  `;

  alert(div.style.cssText);
</script>

Ця властивість рідко використовується, оскільки присвоєння стилів у такий спосіб видаляє всі наявні стилі: тобто воно не додає, а замінює їх.

##### Обчислені стилі: getComputedStyle

 За допомогою elem.style неможливо прочитати щось, що прийшло з CSS-класів.
Для цього існує інший метод: getComputedStyle.

 getComputedStyle(element, [pseudo])

 <script>
    let computedStyle = getComputedStyle(document.body);

    // тепер звідти можна прочитати значення зовнішнього відступу та кольору

    alert( computedStyle.marginTop ); // 5px
    alert( computedStyle.color ); // rgb(255, 0, 0)
  </script>


 метод getComputedStyle не дає доступу до  CSS-псевдокласу :visited
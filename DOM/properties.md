#### DOM властивості

Ми  можемо додати метод:

document.body.sayTagName = function() {
  alert(this.tagName);
};

document.body.sayTagName();

Ми також можемо змінювати вбудовані прототипи, такі як Element.prototype:

Element.prototype.sayHi = function() {
  alert(`Привіт, Я ${this.tagName}`);
};

document.documentElement.sayHi(); 
document.body.sayHi();

#### HTML атрибути

 Коли елемент має id або інший стандартний атрибут, створюється відповідна властивість. Проте цього не відбувається, якщо атрибут не є стандартним.

Стандартний атрибут для одного елемента може бути невідомим для іншого. Наприклад, "type" – це стандартний для <input> (HTMLInputElement), але не для <body>


#### Всі атрибути доступні за допомогою наступних методів:

– elem.hasAttribute(name) – перевіряє наявність атрибута.

– elem.getAttribute(name) – отримує значення атрибута.

– elem.setAttribute(name, value) – встановлює значення атрибута.

– elem.removeAttribute(name) – видаляє атрибут

Також можна прочитати всі атрибути, використовуючи elem.attributes: це колекція об’єктів, які належать вбудованому класу Attr, і мають властивості name та value.

#### Синхронізація властивостей і атрибутів

 // атрибут => властивість
  input.setAttribute('id', 'id');
  alert(input.id); // id (оновлений)

  // властивість => атрибут
  input.id = 'newId';
  alert(input.getAttribute('id')); // newId (оновлений)

вийнятки: 

  // атрибут => властивість
  input.setAttribute('value', 'text');
  alert(input.value); // text

  // НІ властивість => атрибут
  input.value = 'newValue';
  alert(input.getAttribute('value')); // text (не оновлено!)

####  Властивості DOM типізовані

Властивості DOM не завжди є рядками. Наприклад, властивість input.checked (для чекбоксів) має логічний(булевий) тип. Атрибут style – це рядок, але властивість style є об’єктом:

<div id="div" style="color:red;font-size:120%">Привіт</div>

 alert(div.getAttribute('style')); // color:red;font-size:120%

 alert(div.style); // [object CSSStyleDeclaration]

alert(div.style.color); // red

#### Нестандартні атрибути, dataset

Всі атрибути, які починаються з “data-” зарезервовані для використання програмістами. Вони доступні у властивості dataset.

Наприклад, якщо elem має атрибут, що називається "data-about", то він доступний як elem.dataset.about.

 data-order-state : dataset.orderState
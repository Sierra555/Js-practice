#### Запуск користувацьких подій
Конструктор подій

let event = new Event(type[, options]);

type – тип події, рядок, як-от "click" або наш власний, наприклад, "my-event".

options – об’єкт з двома необов’язковими властивостями:

bubbles: true/false – якщо true, то подія спливає.
cancelable: true/false – якщо true, то “типова дія” може бути попереджена. Пізніше ми побачимо, що це означає для користувацьких подій.
Типово обидва параметри є хибними: {bubbles: false, cancelable: false}.

#### dispatchEvent

Після створення об’єкта події ми повинні “запустити” її на елементі за допомогою виклику elem.dispatchEvent(event).

let event = new Event("hello", {bubbles: true});
  elem.dispatchEvent(event);

Властивість event.isTrusted має значення true для подій, які відбуваються в результаті реальних дій користувача, і false для подій, згенерованих скриптом.

Нам слід використовувати addEventListener для наших користувацьких подій, оскільки on<event> існує лише для вбудованих подій, document.onhello не працює.

#### MouseEvent, KeyboardEvent та інші

UIEvent
FocusEvent
MouseEvent
WheelEvent
KeyboardEvent
… https://www.w3.org/TR/uievents/

Ми повинні використовувати їх замість new Event, якщо ми хочемо створити такі події. Наприклад, new MouseEvent("click")

let event = new MouseEvent("click", {
  bubbles: true,
  cancelable: true,
  clientX: 100,
  clientY: 100
});

alert(event.clientX);


Повний опис властивостей для різних події інтерфейсу користувача є в специфікації, наприклад, MouseEvent. https://www.w3.org/TR/uievents/#mouseevent

#### Користувацькі події

Для наших власних, абсолютно нових типів подій, таких як "hello", ми повинні використовувати new CustomEvent. Технічно CustomEvent – це те ж саме, що й Event, за одним винятком.

У другий аргумент (об’єкт) ми можемо додати додаткову властивість detail для будь-якої спеціальної інформації, яку ми хочемо передати разом із подією.

elem.addEventListener("hello", function(event) {
    alert(event.detail.name);
  });

  elem.dispatchEvent(new CustomEvent("hello", {
    detail: { name: "Іван" }
  }));

#### event.preventDefault
Викликаючи event.preventDefault(), обробник події може надіслати сигнал про те, що ці дії слід скасувати.

У цьому випадку виклик elem.dispatchEvent(event) повертає false. І код, який його надіслав, знає, що продовжувати не потрібно.

function hide() {
    let event = new CustomEvent("hide", {
      cancelable: true // без цього прапорця preventDefault не спрацює
    });
    if (!rabbit.dispatchEvent(event)) {
      alert('Обробник запобіг дії');
    } else {
      rabbit.hidden = true;
    }
  }

  rabbit.addEventListener('hide', function(event) {
    if (confirm("Викликати preventDefault?")) {
      event.preventDefault();
    }
  });

#### Вкладені події є синхронними


//В об’єкта promise, що повертається конструктором new Promise є внутрішні властивості:
//state («стан») —- спочатку "pending" («очікування»), в результаті виконання функції він може змінюватися на: "fulfilled" коли викликається метод resolve і на "rejected" – коли reject.
//result (результат) —- спочатку undefined, далі змінюється на value коли викликається метод resolve(value) або error коли reject(error).

//Функція-виконавець може викликати тільки щось одне: resolve або reject. Стан проміса може змінитись лише один раз.
let promise = new Promise(function(resolve, reject) {
    resolve("завершено");
  
    reject(new Error("…")); // ігнорується
    setTimeout(() => resolve("…")); // ігнорується
  });

  //Викликайте reject з об’єктом Error

//then
//Перший аргумент метода .then – функція що викликається коли проміс успішно виконується, тобто переходить зі стану "pending" в "resolved".
//Другим аргументом метод .then приймає функцію що викликається коли проміс переходить в стан "rejected".

//Функція передана першим аргументом виконалась. error => alert(error) // не запуститься
//А в випадку помилки в промісі – виконається друга:   result => alert(result), // не запуститься


//catch
//Якби ми хотіли лише обробити помилку, тоді ми могли б використати null як перший аргумент .then(null, errorHandlingFunction).
// Або можемо скористатись методом .catch(errorHandlingFunction), котрий зробить те ж саме:

let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error("Ооооой!")), 1000);
  });
  
  // .catch(f) те саме що й promise.then(null, f)
  promise.catch(alert); // виведе "Error: Ооооой!" через 1 секунду
  

//finally
//1.Обробник finally не приймає аргументів. В finally ми не знаємо як був завершений проміс, успішно чи ні.
// І це нормально, тому що зазвичай наше завдання заключаєтсья в тому щоб виконати “загальні” процедури доопрацювання.

//2.Обробник finally пропускає результат чи помилку до наступних обробників.

new Promise((resolve, reject) => {
    setTimeout(() => resolve("результат"), 2000)
  })
    .finally(() => alert("Проміс завершений"))
    .then(result => alert(result)); // <-- .then обробляє резульат

new Promise((resolve, reject) => {
    throw new Error("помилка");
    })
    .finally(() => alert("Проміс завершений"))
    .catch(err => alert(err));  // <-- .catch обробляє об’єкт помилки
    

function loadScript(src) {
    return new Promise ((resolve,reject) => {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Помилка завантаження скрипта ${src}`));
    document.head.append(script);
    })
}

let promise3 = loadScript("https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js");

promise.then(
  script => alert(`${script.src} завантажений!`),
  error => alert(`Помилка: ${error.message}`)
);

promise.then(script => alert('Ще один обробник...'));

//Функція delay(ms) повинна повертати проміс, який перейде в стан resolved через ms мілісекунд, так щоб ми могли додати до нього .then:

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
  
console.log(delay(3000).then(() => console.log('виконалось через 3 секунди')));

//анімоване коло

function showCircle(cx, cy, radius) {
    let div = document.createElement('div');
    div.style.width = 0;
    div.style.height = 0;
    div.style.left = cx + 'px';
    div.style.top = cy + 'px';
    div.className = 'circle';
    document.body.append(div);

    return new Promise(resolve => {
        setTimeout(() => {
        div.style.width = radius * 2 + 'px';
        div.style.height = radius * 2 + 'px';
    
        div.addEventListener('transitionend', function handler() {
            div.removeEventListener('transitionend', handler);
            resolve(div);
        });
        }, 0);
    });
}

showCircle(150, 150, 100).then(div => {
    div.classList.add('message-ball');
    div.append("Привіт, світ!");
  });
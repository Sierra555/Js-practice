// Обробник, використанний в .then(handler) може створити й повернути проміс.

// У цьому випадку інші обробники чекають, поки він виконається, а потім отримають його результат.

new Promise(function(resolve, reject) {

    setTimeout(() => resolve(1), 1000);
  
  }).then(function(result) {
  
    alert(result); // 1
  
    return new Promise((resolve, reject) => { // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  
  }).then(function(result) { // (**)
  
    alert(result); // 2
  
    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  
  }).then(function(result) {
  
    alert(result); // 4
  
  });


  //Тут кожен виклик loadScript повертає проміс, а наступний .then запускається, коли він виконується. Потім він ініціює завантаження наступного сценарію. Таким чином, скрипти завантажуються один за одним.
  function loadScript(src) {
    return new Promise ((resolve,reject) => {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Помилка завантаження скрипта ${src}`));
    document.head.append(script);
    })
}
 
  loadScript("/article/promise-chaining/one.js")
  .then(script => loadScript("/article/promise-chaining/two.js"))
  .then(script => loadScript("/article/promise-chaining/three.js"))
  .then(script => {
    // скрипти завантажені, ми можемо використовувати оголошені там функції
    one();
    two();
    three();
  });


  //fetch
  
  // Запитуємо user.json
fetch('/article/promise-chaining/user.json')
// Завантажуємо дані у форматі json
.then(response => response.json())
// Робимо запит до GitHub
.then(user => fetch(`https://api.github.com/users/${user.name}`))
// Завантажуємо відповідь у форматі json
.then(response => response.json())
// Показуємо аватар (githubUser.avatar_url) протягом 3 секунд (можливо, з анімацією)
.then(githubUser => new Promise(function(resolve, reject) { // (*)
    let img = document.createElement('img');
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser); // (**)
    }, 3000);
  }))
  // спрацьовує через 3 секунди
  .then(githubUser => alert(`Завершили показ ${githubUser.name}`));


  //ми можемо розділити код на функції, що можуть бути перевикористані:
  function loadJson(url) {
    return fetch(url)
      .then(response => response.json());
  }
  
  function loadGithubUser(name) {
    return loadJson(`https://api.github.com/users/${name}`);
  }
  
  function showAvatar(githubUser) {
    return new Promise(function(resolve, reject) {
      let img = document.createElement('img');
      img.src = githubUser.avatar_url;
      img.className = "promise-avatar-example";
      document.body.append(img);
  
      setTimeout(() => {
        img.remove();
        resolve(githubUser);
      }, 3000);
    });
  }
  
  // Використаємо їх:
  loadJson('/article/promise-chaining/user.json')
    .then(user => loadGithubUser(user.name))
    .then(showAvatar)
    .then(githubUser => alert(`Завершили показ ${githubUser.name}`));
    // ...
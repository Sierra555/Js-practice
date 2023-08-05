//Обробка помилок в коллбеках

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Помилка завантаження скрипту для ${src}`));

  document.head.append(script);
}
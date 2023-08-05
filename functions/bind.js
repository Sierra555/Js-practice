//Контекст прив’язаної функції жорстко-фіксований. Немає способу змінити це в подальшому.
//Функція не може бути переприв’язана.

function f() {
    alert( this ); // null
  }
  
  let user = {
    g: f.bind(null)
  };
  
  user.g();

  function f() {
    alert(this.name);
  }
  
  f = f.bind( {name: "Іван"} ).bind( {name: "Христя" } );
  
  f();
  //іван

  function sayHi() {
    alert( this.name );
  }
  sayHi.test = 5;
  
  let bound = sayHi.bind({
    name: "Іван"
  });
  
  alert( bound.test ); 
  //undefined

  function askPassword(ok, fail) {
    let password = prompt("Пароль?", '');
    if (password == "rockstar") ok();
    else fail();
  }
  
  let uuser = {
    name: 'Іван',
  
    loginOk() {
      alert(`${this.name} увійшов`);
    },
  
    loginFail() {
      alert(`${this.name} виконав невдалу спробу входу`);
    },
  
  };
  
askPassword(uuser.loginOk.bind(uuser), uuser.loginFail.bind(uuser)); // or askPassword(() => user.loginOk(), () => user.loginFail()); but vind is more reliable


  function askPassword(ok, fail) {
    let password = prompt("Пароль?", '');
    if (password == "rockstar") ok();
    else fail();
  }
  
  let userr = {
    name: 'Іван',
  
    login(result) {
      alert( this.name + (result ? ' увійшов' : ' виконав невдалу спробу входу') );
    }
  };
  
  askPassword(user.login.bind(user,true), user.login.bind(user,false));
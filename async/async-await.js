async function loadJson(url) {
    let response = await fetch(url);
    if (response.status == 200) {
        return await response.json();
    } 

    throw new Error(response.status);
}
  
  loadJson('https://javascript.info/no-such-user.json')
    .catch(alert); // Error: 404


class HttpError extends Error {
constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = 'HttpError';
    this.response = response;
}
}

async function loadJson(url) {
let reply = await fetch(url)
if (reply.status == 200) {
    return await reply.json();
} else {
    throw new HttpError(response);
}
}

// Запитуйте ім’я користувача, поки github не поверне дійсного користувача
async function demoGithubUser() {
    let user;
    while(true) {
        let name = prompt("Введіть ім’я?", "iliakan");
        try {
            user = await loadJson(`https://api.github.com/users/${name}`);
            break;
        }
        catch (err) {
            if (err instanceof HttpError && err.response.status == 404) {
                alert("Такого користувача не існує, будь ласка, введіть ще раз.");
            } else {
                throw err;
            }
        }   
     }

     alert(`Ім’я та прізвище: ${user.name}.`);
     return user;
}

demoGithubUser();


async function wait() {
    await new Promise(resolve => setTimeout(resolve, 1000));
  
    return 10;
  }
  
  function f() {
    wait().then(result => alert(result));
  }
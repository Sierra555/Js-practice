// Перетворіть user в JSON, а потім перетворіть його назад в іншу змінну.

let user = {
    name: "Іван Іванов",
    age: 35
  };

let upatedUser = JSON.parse(JSON.stringify(user));
console.log(upatedUser);

//Напишіть функцію replacer, щоб серіалізувати все, але видалити властивості, які посилаються на meetup

let room = {
    number: 23
  };
  
  let meetup = {
    title: "Конференція",
    occupiedBy: [{name: "Іван"}, {name: "Аліса"}],
    place: room
  };
  
  console.log( JSON.stringify(meetup, function replacer(key, value) {
    return (key != "" && value == meetup) ? undefined : value;
  }));



// Напишіть функцію camelize(str), яка перетворює такі рядки “my-short-string” в “myShortString”.
'use strict';
function camelize(str) {
 return str.split('-').map((item, i ) =>  i != 0 ? item[0].toUpperCase() + item.slice(1) : item).join('');
}

console.log(camelize("-webkit-transition"));
console.log(camelize("my-short-string"));

//Напишіть функцію filterRange(arr, a, b), яка приймає масив arr, шукає в ньому елементи більші-рівні a та менші-рівні b і віддає масив цих елементів.

function filterRange(arr, a, b) {
    return arr.filter(elem => elem >=a && elem <= b);
}

console.log(filterRange([5, 3, 8, 1], 1, 4));

// Напишіть функцію filterRangeInPlace(arr, a, b), яка приймає масив arr і видаляє з нього всі значення крім тих, які знаходяться між a і b. Тобто, перевірка має вигляд a ≤ arr[i] ≤ b.

function filterRangeInPlace(arr, a, b) {
    for (let i = 0; i <= arr.length; i++) {
        if(!(arr[i] >=a && arr[i] <= b)) {
            arr.splice(i,1);
        }
    }
    return arr;
}

console.log(filterRangeInPlace([5, 3, 8, 1], 1, 4));

//Сортувати за спаданням 

function sort (arr) {
    return arr.sort((a,b) => b-a);
}

console.log(sort([5, 2, 1, -10, 8]));

//Скопіювати і впорядкувати масив
 let arr = ["HTML", "JavaScript", "CSS"];
function copySorted(arr) {
    let copiedArr = arr.slice().sort();
    return copiedArr;
}

console.log(arr);
console.log(copySorted(arr));

// У вас є масив обʼєктів user, і у кожного з обʼєктів є name, surname та id.
// Напишіть код, який створить ще один масив обʼєктів з параметрами id й fullName, де fullName – складається з name та surname.
// let ivan = { name: "Іван", surname: "Іванко", id: 1 };
// let petro = { name: "Петро", surname: "Петренко", id: 2 };
// let mariya = { name: "Марія", surname: "Мрійко", id: 3 };

let users = [ ivan, petro, mariya ];

let usersMapped = users.map(item => ({fullName: `${item.name} ${item.surname}` , id : `${item.id} `}));

console.log(usersMapped[0].id);
console.log(usersMapped);

//Напишіть функцію sortByAge(users), яка приймає масив обʼєктів з властивістю age і сортує їх по ньому.

let ivan = { name: "Іван", age: 25 };
let petro = { name: "Петро", age: 30 };
let mariya = { name: "Марія", age: 28 };

let array = [ petro, ivan, mariya ];

function sortByAge(users) {
    return users.sort((a,b)=> a.age - b.age);
}
console.log(sortByAge(array));

//Напишіть функцію shuffle(array), яка перемішує (випадковим чином переставляє) елементи масиву.

function shuffle(array) {
  return  array.sort(() => Math.random() - 0.5);
};

let arr2 = [1, 2, 3];
console.log(shuffle(arr2));

//Напишіть функцію getAverageAge(users), яка приймає масив об’єктів з властивістю age та повертає середній вік.
let john = { name: "John", age: 25 };
let pete = { name: "Pete", age: 30 };
let mary = { name: "Mary", age: 29 };

let arr3 = [ john, pete, mary ];

function getAverageAge(arr) {
    return arr.reduce((a,b) => a + b.age, 0) / arr.length;
}
console.log(getAverageAge(arr3));

//Напишіть функцію unique(arr), яка повертає масив, що містить тільки унікальні елементи arr.


function unique(arr) {
    let array = [];
    for (let i=0; i<arr.length; i++){
        if(!array.includes(arr[i])) {
        array.push(arr[i]);
       }
    }
    return array;

  }
  
  let strings = ["Привіт", "Світ", "Привіт", "Світ",
    "Привіт", "Привіт", "Світ", "Світ", ":-O"
  ];
  console.log(unique(strings));

  //Створіть функцію groupById(arr), яка створює з масиву об’єкт із ключом id та елементами масиву як значеннями.
  //Будь ласка, використовуйте метод масиву .reduce у рішенні.

  let user = [
    {id: 'іван', name: "Іван Іванко", age: 20},
    {id: 'ганна', name: "Ганна Іванко", age: 24},
    {id: 'петро', name: "Петро Петренко", age: 31},
  ];
  
function groupById (arr) {
   return arr.reduce((obj, item)=> {
     obj[item.id] = item;
     return obj;
    },{})
}

  let usersById = groupById(user);
  console.log(usersById);
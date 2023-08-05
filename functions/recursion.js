'use strict';
//Напишіть функцію sumTo(n), що обчислює суму чисел 1 + 2 + ... + n.
//Використання циклу.
function sumTo(n) {
    let count = 0;
   for (let i=1; i<=n; i++) {
      count += i;
    }
    return count;
}
console.log(sumTo(3));
//Використання рекурсії.
function sumTo(n) {
    return n == 1 ? 1 : n + sumTo(n-1);
}

console.log(sumTo(3));

//Завдання полягає в тому, щоб написати функцію factorial(n), яка обчислює n! за допомогою рекурсивних викликів.

function factorial(n) {
    return n == 1 ? 1 : n * factorial(n-1);
}

console.log(factorial(5));

function fib(n) {
    return n <= 1 ? n : fib(n-1) + fib(n-2);
}

console.log(fib(7));

// let list = {
//     value: 1,
//     next: {
//       value: 2,
//       next: {
//         value: 3,
//         next: {
//           value: 4,
//           next: null
//         }
//       }
//     }
//   };
//recursion
function printList(list) {
    console.log(list.value);

    if (list.next) {
        printList(list.next);  
     }
}
console.log(printList(list));

// loop

  function printList(list) {
  
    while (list) {
      console.log(list.value);
      list = list.next;
    }
  
  }

console.log(printList(list));
//Вивести одинозв’язаний список у зворотному порядку
// let list = {
//     value: 1,
//     next: {
//       value: 2,
//       next: {
//         value: 3,
//         next: {
//           value: 4,
//           next: null
//         }
//       }
//     }
//   };

function printList(list) {
if (list.next) {
    printList(list.next);
}
console.log(list.value);
}
console.log(printList(list));

//loop
let list = {
    value: 1,
    next: {
      value: 2,
      next: {
        value: 3,
        next: {
          value: 4,
          next: null
        }
      }
    }
  };
function printList(list) {
let arr = [];
while(list){
    arr.push(list.value);
    list = list.next;
}
 for (let i = arr.length-1; i >=0; i--) {
    console.log(arr[i]);
 }
}

console.log(printList(list));


function solve(a,b){
  if (a==0 || b==0){
    return [a,b];
  }
  else if (a>= 2*b) { 
    a-=2*b;
    return solve(a, b);
  }
  else if (b>= 2*a) {
    b-=2*a;
    return solve(a, b);
  }
  else {
    return [a, b];
  }
}
console.log(solve(6,19));


function pow(x, n) {
  if (n == 1) {
    return [x, n];
  } else {
    return x * pow(x, n - 1),[n];
  }
}

console.log(pow(2,3));
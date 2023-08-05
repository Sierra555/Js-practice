// Напишіть функцію printNumbers(from, to) яка виводить число кожну секунду, починаючи від from і закінчуючи to.
//setInterval
function printNumbers(from, to) {
       let timer = setInterval (()=>{
        console.log(from);
        if(from == to) {
            clearInterval(timer);
        }
           from++ ;
    }, 1000);
}

console.log(printNumbers(1, 5));

//setTimeout

function printNumbers(from, to) {
    let num = from;
  setTimeout(function timer(){
    console.log(num);
     if(num < to){
        setTimeout(timer, 1000)
     } 
     num++;
    },1000);  
};

console.log(printNumbers(1, 5));

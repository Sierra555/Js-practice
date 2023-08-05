'use strict';
// Створити об’єкт Date на дату: 20 лютого 2012, 3:12 ранку. Часовий пояс є місцевим.

const date = new Date(2012,1,20,3,12);
console.log(date);

//Напишіть функцію getWeekDay(date), щоб показати робочий день у короткому форматі: ‘ПН’, ‘ВТ’, ‘СР’, ‘ЧТ’, ‘ПТ’, ‘СБ’, ‘НД’.
function getWeekDay(date) {
let day = date.getDay(date);
    switch (day) {
        case 0:
            return 'Sun';
            break;
        case 1:
            return 'Mon';
            break;
        case 2:
            return 'Tue';
            break;
        case 3:
            return 'Wed';
            break;
        case 4:
            return 'Thru';
            break;
        case 5:
            return 'Fri';
            break;
        case 6:
            return 'Sat';
            break;
    }

}

console.log(getWeekDay(new Date(2012, 0, 3)));

//Європейські країни мають дні тижня, що починаються з понеділка (№ 1), потім вівторок (№ 2) та до неділі (№ 7). Напишіть функцію getLocalDay(date), що повертає “європейський” день тижня для date.

function getLocalDay(date) {
let day = date.getDay(date);
if (day == 0 ) {
    day = 7;
}
    return day;
}

console.log(getLocalDay(new Date(2012, 0, 8)));

//Створіть функцію getDateAgo(date, days), щоб повернути день місяця, який був days днів після date.

function getDateAgo(date, days) {

//  I. return new Date(date.setDate(date.getDate() - days)).getDate();    
// II.
let time = date.getTime() - (days * 24 * 60 * 60 * 1000);

return new Date(time).getDate();
}

console.log(getDateAgo(new Date(2015, 0, 2), 365));

//Напишіть функцію getLastDayOfMonth(year, month), що повертає останній день місяця. Іноді це 30-е, 31-ше або навіть 28/29-е для лютого.

function getLastDayOfMonth(year, month) {
return new Date (year, month +1, 0).getDate();
}

console.log(getLastDayOfMonth(2012, 1));

//Напишіть функцію getSecondsToday(), що повертає кількість секунд з початку сьогоднішнього дня.

function getSecondsToday() {
    let now = new Date();
    return  now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();
}

console.log(getSecondsToday());
//Створіть функцію getSecondsToTomorrow(), що повертає кількість секунд до завтра.

function getSecondsToTomorrow(secondsByNow) {
    return  (24 * 3600) - secondsByNow();
}
console.log(getSecondsToTomorrow(getSecondsToday));


//Напишіть функцію formatDate(date), яка повинна форматувати date наступним чином:

// Якщо з date пройшла менше, ніж 1 секунда, то "прямо зараз".
// Інакше, якщо з date пройшло менше 1 хвилини, то "n сек. назад".
// Інакше, якщо менше години, то "m хв. назад".
// В іншому випадку повна дата у форматі "DD.MM.YY HH:mm". Тобто: "день.місяць.рік години:хвилини", все в 2-значному форматі, наприклад, 31.12.16 10:00.

function formatDate(date) {
    let timeDiff = new Date() - date;
    if (timeDiff < 1000) {
        return 'right now';
    }
    else if (timeDiff < 60000) {
        return `${ timeDiff / 1000} sec ago`;
    }
    else if (timeDiff < 3600000) {
        return `${ timeDiff / 1000 / 60} min ago`;
    }
}

console.log(formatDate(new Date()));
const timeOut = setTimeout(()=> {
  return formatDate(new Date());
}, 4000);
console.log(timeOut);
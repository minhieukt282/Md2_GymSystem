// let today = new Date();
// let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
// let time = today.getHours() + ':' + today.getMinutes();
// let dateTime = time + ' - ' + date;
// let month = today.getMonth() + 1
// let year = today.getFullYear()
//
// let addMonth = 2
//
// let i = 1
// while (i <= addMonth) {
//     if (month < 12) {
//         month++;
//         i++;
//     } else {
//         month = 1;
//         year++;
//         i++
//     }
// }
// console.log(today.getDate(),month, year)

import {Client} from "./service/client";

let client = new Client(50,"05","1",1)
console.log(client.upGrade(3.9))
console.log(client.checkUpGrade)
// // let today = new Date();
// // let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
// // let time = today.getHours() + ':' + today.getMinutes();
// // let dateTime = time + ' - ' + date;
// // let month = today.getMonth() + 1
// // let year = today.getFullYear()
// //
// // let addMonth = 2
// //
// // let i = 1
// // while (i <= addMonth) {
// //     if (month < 12) {
// //         month++;
// //         i++;
// //     } else {
// //         month = 1;
// //         year++;
// //         i++
// //     }
// // }
// // console.log(today.getDate(),month, year)
// import {ClientManage} from "./manage/clientManage";
// import {Client} from "./service/client";
// import {StaffManage} from "./manage/staffManage";
// import {IOFile} from "./readWriteFile";
//
// let url_1 = "./text/dataAccount.txt"
// let url_2 = "./text/dataListMember.txt"
// let url_3 = "./text/dataListStaff.txt"
// let url_4 = "./text/dataTempListMember.txt"
// let arrAccount = []
// let arrTempListMember = []
// let arrListMember = []
// let arrListStaff = []
// let manager = new StaffManage()
// let ioAccount = new IOFile(url_1)
// let ioListMember = new IOFile(url_2)
// let ioListStaff = new IOFile(url_3)
// let ioTempListMember = new IOFile(url_4)
//
// function writeData() {
//     let dataListAccount = manager.listAccountToString()
//     let dataListMember = manager.listMemberToString()
//     let dataListStaff = manager.listStaffToString()
//     let dataTempListStaff = manager.tempListMemberToString()
//     ioAccount.writeFile(dataListAccount)
//     ioListMember.writeFile(dataListMember)
//     ioListStaff.writeFile(dataListStaff)
//     ioTempListMember.writeFile(dataTempListStaff)
// }
//
// function readData() {
//     arrAccount = ioAccount.readFile().split(",")
//     arrListMember = ioListMember.readFile().split(",")
//     arrListStaff = ioListStaff.readFile().split(",")
//     arrTempListMember = ioTempListMember.readFile().split(",")
//     manager.readDataListAccount(arrAccount)
//     manager.readDataListMember(arrListMember)
//     manager.readDataListStaff(arrListStaff)
//     manager.readDataTempListMember(arrTempListMember)
// }
//
// // readData()
//
// let a = new StaffManage()
// let user1 = new Client(5, "userOne", "1", 1)
// let user2 = new Client(6, "userTwo", "1", 1, "Chi Hoa", 41)
// let user3 = new Client(7, "userThree", "1", 1, "", 35)
//
// let admin1 = new ClientManage(8, "ad", "1", 2, "Nhi", 30)
// let admin2 = new ClientManage(9, "Admin_Two", "1", 2, "Lan", 45)
// a.addClientToListMember(user1)
// a.addClientToListMember(user2)
// a.addClientToListMember(user3)
// a.addStaff(admin1)
// a.addStaff(admin2)
//
// a.addMemberToStaff(5,8)
// a.addMemberToStaff(6,8)
// // console.log("------------dasdasdasdasd")
// console.log(admin1.displayListClient())
// // console.log(a.displayStaff())
//
//
//
//
//

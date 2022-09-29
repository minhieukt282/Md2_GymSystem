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

// import {Client} from "./service/client";
//
// let client = new Client(50,"05","1",1)
// console.log(client.upGrade(3.9))
// console.log(client.checkUpGrade)

// let user1 = new Account(1, "1", "1", 10)
// let user2 = new Account(2, "2", "2",20)
// let user3 = new Account(3, "3", "3",10)
// let user4 = new Account(4, "dads", "3",10)
// let user5 = new Account(5, "uyuy", "3",10)
//
// manager.addAccount(user1)
// manager.addAccount(user2)
// manager.addAccount(user3)
// manager.addAccount(user4)
// manager.addAccount(user5)
// let user1 = new Client(5, "userOne", "1", 1)
// let user2 = new Client(6, "userTwo", "1", 1, "Chi Hoa", 41)
// let user3 = new Client(7, "userThree", "1", 1, "", 35)
//
// let admin1 = new ClientManage(8, "ad", "1", 2, "Nhi", 30)
// let admin2 = new ClientManage(9, "Admin_Two", "1", 2, "Lan", 45)
// let admin3 = new ClientManage(10, "Admin_Three", "1", 2, "Ba", 25)
// manager.addClientToListMember(user1)
// manager.addClientToListMember(user2)
// manager.addClientToListMember(user3)
// manager.addStaff(admin1)
// manager.addStaff(admin2)
// manager.addStaff(admin3)

// import {StaffManage} from "./manage/staffManage";
// import {IOFile} from "./readWriteFile";
//
// let url_1 = "./text/dataAccount.txt"
// let url_2 = "./text/dataListMember.txt"
// let url_3 = "./text/dataListStaff.txt"
//
// let arrAccount = []
// let arrListMember = []
// let arrListStaff = []
//
// let manager = new StaffManage()
// let ioAccount = new IOFile(url_1)
// let ioListMember = new IOFile(url_2)
// let ioListStaff = new IOFile(url_3)
//
// function readData() {
//     arrAccount = ioAccount.readFile().split(",")
//     arrListMember = ioListMember.readFile().split(",")
//     arrListStaff = ioListStaff.readFile().split(",")
//     manager.readDataListAccount(arrAccount)
//     manager.readDataListMember(arrListMember)
//     manager.readDataListStaff(arrListStaff)
// }
// readData()
// let a = new StaffManage()
// console.log(a.findByIdListMember(1))
// console.log(a.listMember)
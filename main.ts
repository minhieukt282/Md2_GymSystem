import {Account} from "./service/account";
import {ReadWriteFile} from "./readWriteFile";
import {StaffManage} from "./manage/staffManage";
import {ClientManage} from "./manage/clientManage";
import {Client} from "./service/client";

const USER: number = 1
const STAFF: number = 2
const MANAGER: number = 3

let today = new Date();
let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
let time = today.getHours() + ':' + today.getMinutes();
let dateTime = time + ' - ' + date;

let input = require('readline-sync');
let url_1 = "./text/dataAccount.txt"
let url_2 = "./text/dataListMember.txt"
let url_3 = "./text/dataListStaff.txt"

let indexStaff: number
let indexTempClient: number
let indexClient: number
let isStatusUpgrade = false
let isStatus = false

let arrayData_1 = []
let arrayData_2 = []
let arrayData_3 = []
let manager = new StaffManage()

let ioFile = new ReadWriteFile(url_1)
let ioFile_2 = new ReadWriteFile(url_2)
let ioFile_3 = new ReadWriteFile(url_3)

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

function writeData() {
    let dataListAccount = manager.listAccountToString()
    let dataListMember = manager.listMemberToString()
    let dataListStaff = manager.listStaffToString()
    ioFile.writeFile(dataListAccount)
    ioFile_2.writeFile(dataListMember)
    ioFile_3.writeFile(dataListStaff)
}

function readData() {
    arrayData_1 = ioFile.readFile().split(",")
    arrayData_2 = ioFile_2.readFile().split(",")
    arrayData_3 = ioFile_3.readFile().split(",")
    manager.readDataListAccount(arrayData_1)
    manager.readDataListMember(arrayData_2)
    manager.readDataListStaff(arrayData_3)
}

readData()
// writeData()
console.log(manager.listMember)
console.log("-------------------")
console.log(manager.tempListMember)
console.log("-------------------")
console.log(manager.listStaffs)





function start() {
    let choice: number
    let info = `-----WELCOME-----
    1. Login
    2. Register`
    console.log(info)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                login()
                break
            case 2:
                register()
                break
        }
    } while (choice != -1)
}

function login() {
    let choice: number
    let info = `-----LOGIN-----
    1. Register
    0. Back to menu`
    console.log(info)
    let userName = input.question("UserName: ")
    let passWord = input.question("PassWord: ")
    if (manager.checkAccount(userName, passWord)) {
        if (manager.checkKey(userName, passWord) == MANAGER) {
            startManage()
        } else if (manager.checkKey(userName, passWord) == STAFF) {
            indexStaff = manager.findIndexByAccount(userName, passWord)
            startStaff()
        } else {
            indexTempClient = manager.findIndexByAccount(userName, passWord)
            indexClient = manager.findIndex(userName, passWord)
            startClient()
        }
    } else {
        console.log("Username or password is incorrect. Please try again")
        do {
            choice = +input.question("Your select: ")
            switch (choice) {
                case 1:
                    register()
                    break
                case 0:
                    start()
                    break
            }
        } while (choice != -1)
    }
}

function register() {
    let info = `-----REGISTER-----`
    console.log(info)
    let id = input.question("Input Id: ")
    if (manager.checkId(id)) {
        console.log("Id is already taken")
        register()
    } else {
        let userName = input.question("Input UserName: ")
        if (manager.checkUserNameInput(userName)) {
            console.log("Username is already taken")
            register()
        } else {
            let mainUser
            let passWord = input.question("Input PassWord: ")
            let key = input.question("Input key: ")
            let user = new Account(id, userName, passWord, key)
            console.log(manager.addAccount(user))
            if (key == USER) {
                mainUser = new Client(id, userName, passWord, key)
                manager.addClientToListMember(mainUser)
            }
            if (key == STAFF) {
                mainUser = new ClientManage(id, userName, passWord, key)
                manager.addStaff(mainUser)
            }
            writeData()
            login()
        }
    }
}

//----------------------------------------
// startClient()
function startClient() {
    let choice: number
    let info = `-----WELCOME-----
    1. My profile
    2. My workout
    3. My diet
    4. Contact my personal trainer
    5. Up grade account
    0. Logout`
    console.log(info)
    // console.log("index client " + indexClient)
    // console.log("index temp client " + indexTempClient)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                myProfile()
                break
            case 2:
                myWorkout()
                break
            case 3:
                myDiet()
                break
            case 4:
                contactPT()
                break
            case 5:
                upGradeAccount()
                break
            case 0:
                start()
                break
        }
    } while (choice != -1)
}//done

function myProfile() {
    let choice: number
    let info = `-----MY PROFILE-----
    1. Edit Profile
    0. Back to menu`
    console.log(info)
    console.log(manager.listMember[indexClient].showProfile())
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                editProfile()
                break
            case 0:
                startClient()
                break
        }
    } while (choice != -1)
}//done

function editProfile() {
    console.log("edit o day........ test them")
}

function myWorkout() {
    let choice: number
    let info = `-----MY EXERCISE-----
    0. Back to menu`
    console.log(info)
    let info2 = "Name: Barbell bench press >< Set-Rep: 5x12 >< Reset: 60s\n" +
        "Name: Barbell bench press >< Set-Rep: 5x12 >< Reset: 60s\n" +
        "Name: Barbell bench press >< Set-Rep: 5x12 >< Reset: 60s\n"
    console.log(info2)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                break
            case 0:
                startClient()
                break
        }
    } while (choice != -1)
}//done

function myDiet() {
    let choice: number
    let info = `-----MY DIET-----
    0. Back to menu`
    console.log(info)
    let info2 = "An gi cung duoc"
    console.log(info2)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                break
            case 0:
                startClient()
                break
        }
    } while (choice != -1)
}//done

function contactPT() {
    let choice: number
    let info = `-----CONTACT MY PERSONAL TRAINER-----
    0. Back to menu`
    console.log(info)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                break
            case 0:
                startClient()
                break
        }
    } while (choice != -1)
}

function upGradeAccount() {
    let choice: number
    let info = `-----UP GRADE ACCOUNT-----
    0. Back to menu`
    console.log(info)
    if (isStatus) {
        console.log("You have signed up for a coach")
        startClient()
    }else {
        if (isStatusUpgrade) {
            console.log(`>>>>>Select Coach<<<<<\n${manager.displayStaff()}`)
            let idMember = +input.question("Enter Your Id: ")
            let idStaff = +input.question("Enter Coach Id: ")
            console.log(manager.addMemberToStaff(idMember, idStaff))
            isStatus = true
            console.log("dang phat trien")
        } else {
            let addMonth = +input.question("Enter the number of subscription months: ")
            console.log(manager.tempListMember[indexTempClient].upGrade(addMonth))
            let cost = manager.tempListMember[indexTempClient].totalCost(addMonth)
            manager.addRevenue(cost)
            manager.countPaidMember++
            isStatusUpgrade = true
            console.log("Reload up grade account to select coach")
        }
        do {
            choice = +input.question("Your select: ")
            switch (choice) {
                case 0:
                    startClient()
                    break
            }
        } while (choice != -1)
    }
}

//----------------------------------------
// startStaff()
function startStaff() {
    let choice: number
    let info = `-----WELCOME STAFF-----
    1. Show client
    2. Contact to client
    3. Edit client profile
    4. Edit my profile
    0. Logout`
    console.log(info)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                showListClient()
                break
            case 2:
                break
            case 3:
                updateClientProfile()
                break
            case 4:
                updateMyProfile()
                break
            case 0:
                start()
                break
        }
    } while (choice != -1)
}
function updateClientProfile(){

}
function showListClient() {
    let choice: number
    let info = `-----LIST CLIENT-----
    1. Add client
    2. Update Info client
    3. Delete client
    0. Back to menu`
    console.log(info)
    console.log(manager.listStaffs[indexStaff].listClient)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:

                break
            case 2:
                break
            case 3:
                break
            case 0:
                startStaff()
                break
        }
    } while (choice != -1)
}

function updateMyProfile() {
    let choice: number
    let info = `-----UPDATE MY PROFILE-----
    1. Continue
    0. Back to menu`
    console.log(info)
    console.log(manager.listStaffs[indexStaff].myInfo())
    let name = input.question("Enter name: ")
    let age = Math.floor(+input.question("Enter age: "))
    console.log(manager.listStaffs[indexStaff].updateMyInfo(name,age))
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                updateMyProfile()
                break
            case 0:
                startStaff()
                break
        }
    } while (choice != -1)
}

//----------------------------------------
// startManage()
function startManage() {
    let choice: number
    let info = `-----WELCOME MANAGER-----
    1. Show Staff and Client
    2. Monthly revenue
    0. Logout`
    console.log(info)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                displayStaff()
                break
            case 2:
                revenue()
                break
            case 0:
                start()
                break
        }
    } while (choice != -1)
}

function revenue() {
    let choice: number
    let info = `-----MONTHLY REVENUE-----
    0. Back to menu`
    console.log(info)
    console.log(manager.showRevenue())
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 0:
                startManage()
                break
        }
    } while (choice != -1)
}

function displayStaff() {
    // readData()
    let choice: number
    let info = `-----STAFF AND MEMBER-----
    1. Add Member to Staff
    2. Delete Staff
    3. Delete Client from Staff
    4. Delete Client
    0. Back to menu`
    console.log(info)
    console.log(`>>>>>List Staff<<<<<\n${manager.displayStaff()}`)
    console.log(`>>>>>List Member<<<<<\n${manager.displayListMember()}`)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                addMemberToStaff()
                break
            case 2:
                deleteStaff()
                break
            case 3:
                deleteClientFromStaff()
                break
            case 4:
                deleteClient()
                break
            case 0:
                startManage()
                break
        }
    } while (choice != -1)
}

function addMemberToStaff() {
    // readData()
    let choice: number
    let info = `-----ADD MEMBER TO STAFF-----
    1. Continue
    0. Back to menu`
    console.log(info)
    let idMember = +input.question("Input Id member: ")
    let idStaff = +input.question("Input Id staff: ")
    console.log(manager.addMemberToStaff(idMember, idStaff))
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                addMemberToStaff()
                break
            case 0:
                displayStaff()
                break
        }
    } while (choice != -1)
}

function deleteStaff() {
    let choice: number
    let info = `-----DELETE STAFF-----
    1. Continue
    0. Back to menu`
    console.log(info)
    let idStaff = +input.question("Input Id staff: ")
    console.log(manager.deleteStaff(idStaff))
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                deleteStaff()
                break
            case 0:
                displayStaff()
                break
        }
    } while (choice != -1)
}

function deleteClientFromStaff() {
    let choice: number
    let info = `-----DELETE MEMBER FROM STAFF-----
    0. Back to menu`
    console.log(info)
    let idMember = +input.question("Input Id member delete: ")
    let idStaff = +input.question("Input Id staff: ")
    console.log(manager.deleteMemberFromListStaff(idMember, idStaff))
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 0:
                displayStaff()
                break
        }
    } while (choice != -1)
}

function deleteClient() {
    let choice: number
    let info = `-----DELETE MEMBER-----
    0. Back to menu`
    console.log(info)
    let id = +input.question("Input Id delete: ")
    console.log(manager.deleteMemberFromListMember(id))
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 0:
                displayStaff()
                break
        }
    } while (choice != -1)
}

start()

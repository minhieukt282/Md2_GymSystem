import {Account} from "./service/account";
import {IOFile} from "./readWriteFile";
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

let arrAccount = []
let arrListMember = []
let arrListStaff = []
let manager = new StaffManage()

let ioAccount = new IOFile(url_1)
let ioListMember = new IOFile(url_2)
let ioListStaff = new IOFile(url_3)

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
    ioAccount.writeFile(dataListAccount)
    ioListMember.writeFile(dataListMember)
    ioListStaff.writeFile(dataListStaff)
}

function readData() {
    arrAccount = ioAccount.readFile().split(",")
    arrListMember = ioListMember.readFile().split(",")
    arrListStaff = ioListStaff.readFile().split(",")
    manager.readDataListAccount(arrAccount)
    manager.readDataListMember(arrListMember)
    manager.readDataListStaff(arrListStaff)
}

readData()
// writeData()
// console.log(manager.listMember)
// console.log("-------------------")
// console.log(manager.tempListMember)
// console.log("-------------------")
// console.log(manager.listStaffs)

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
    readData()
    let choice: number
    let info = `-----LOGIN-----
    1. Login
    2. Register
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
                    login()
                    break
                case 2:
                    register()
                    break
                case 0:
                    start()
                    break
            }
        } while (choice != -1)
    }
}//<<<<<<<<<<<<<<<<

function register() {
    readData()
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
}//<<<<<<<<<<<<<<<<

//----------------------------------------
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
    console.log("dang loi")
    // console.log(manager.listMember[indexClient].showProfile())
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                console.log("dang phat trien")
                break
            case 0:
                startClient()
                break
        }
    } while (choice != -1)
}//done

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
    console.log("dang phat trien")
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 0:
                startClient()
                break
        }
    } while (choice != -1)
}//done

function upGradeAccount() {
    let choice: number
    let info = `-----UP GRADE ACCOUNT-----
    0. Back to menu`
    console.log(info)
    if (isStatus) {
        console.log("You have signed up for a coach")
        startClient()
    } else {
        if (isStatusUpgrade) {
            console.log(`>>>>>Select Coach<<<<<\n${manager.displayStaff()}`)
            let idMember = Math.floor(+input.question("Enter Your Id: "))
            let idStaff = Math.floor(+input.question("Enter Coach Id: "))
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
}//done

//----------------------------------------
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
                console.log("dang phat trien")
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
}//done

function updateClientProfile() {
    //do data client
    readData()
    let choice: number
    let info = `-----UPDATE CLIENT PROFILE-----
    1. Continue
    0. Back to menu
    Press enter to skip`
    console.log(info)
    let info2 = manager.listStaffs[indexStaff].displayListClient()
    console.log(info2)
    if (info2 != "No data") {
        let idClient = Math.floor(+input.question("Enter client id: "))
        let name = input.question("Update client name: ")
        let age = Math.floor(+input.question("Update client age: "))
        let height = Math.floor(+input.question("Update client height: "))
        let weight = Math.floor(+input.question("Update client weight: "))
        console.log(manager.listStaffs[indexStaff].updateInfoClient(idClient, name, age, height, weight))
        writeData()
        do {
            choice = +input.question("Your select: ")
            switch (choice) {
                case 1:
                    updateClientProfile()
                    break
                case 0:
                    startStaff()
                    break
            }
        } while (choice != -1)
    } else do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                updateClientProfile()
                break
            case 0:
                startStaff()
                break
        }
    } while (choice != -1)
}//done ???????????????<><><><><><><><><><><><>

function showListClient() {
    readData()
    let choice: number
    let info = `-----LIST MY CLIENT-----
    1. Delete client
    0. Back to menu`
    console.log(info)
    console.log(manager.listStaffs[indexStaff].displayListClient())
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                staffDeleteClient()
                break
            case 0:
                startStaff()
                break
        }
    } while (choice != -1)
}//done<<<<<<<<<<<<<<<<<<<

function staffDeleteClient() {
    let choice: number
    let info = `-----DELETE CLIENT-----
    1. Continue
    0. Back to menu
    Press enter to skip`
    console.log(info)
    let idClient = Math.floor(+input.question("Enter client id: "))
    let idStaff = Math.floor(+input.question("Enter my id: "))
    console.log(manager.deleteMemberFromListStaff(idClient, idStaff))
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                staffDeleteClient()
                break
            case 0:
                startStaff()
                break
        }
    } while (choice != -1)
}//done

function updateMyProfile() {
    readData()
    let choice: number
    let info = `-----UPDATE MY PROFILE-----
    1. Continue
    0. Back to menu
    Press enter to skip`
    console.log(info)
    console.log(manager.listStaffs[indexStaff].myInfo())
    let name = input.question("Enter name: ")
    let age = Math.floor(+input.question("Enter age: "))
    console.log(manager.listStaffs[indexStaff].updateMyInfo(name, age))
    writeData()
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
}//done<<<<<<<<<<<<<<<<<<<<

//----------------------------------------
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
}//done

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
}//done

function displayStaff() {
    readData()
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
}//done<<<<<<<<<<<

function addMemberToStaff() {
    readData()
    let choice: number
    let info = `-----ADD MEMBER TO STAFF-----
    1. Continue
    0. Back to menu`
    console.log(info)
    let idMember = +input.question("Enter member id: ")
    let idStaff = +input.question("Enter staff id: ")
    console.log(manager.addMemberToStaff(idMember, idStaff))
    writeData()
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
}//done?????????????

function deleteStaff() {
    readData()
    let choice: number
    let info = `-----DELETE STAFF-----
    1. Continue
    0. Back to menu`
    console.log(info)
    let idStaff = +input.question("Enter staff id: ")
    let info2 = manager.deleteStaff(idStaff)
    console.log(info2)
    if (info2 == "Delete staff done") {
        manager.deleteAccount(idStaff)
        writeData()
    }
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
}//done<<<<<<<<<<<<<<<<<<

function deleteClientFromStaff() {
    let choice: number
    let info = `-----DELETE MEMBER FROM STAFF-----
    0. Back to menu`
    console.log(info)
    let idMember = +input.question("Enter the client id to delete: ")
    let idStaff = +input.question("Enter staff id: ")
    console.log(manager.deleteMemberFromListStaff(idMember, idStaff))

    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 0:
                displayStaff()
                break
        }
    } while (choice != -1)
}//done
// deleteClient()

function deleteClient() {
    readData()
    let choice: number
    let info = `-----DELETE MEMBER-----
    1. Continue
    0. Back to menu`
    console.log(info)
    let id = +input.question("Enter client id to delete: ")
    let info2 = manager.deleteMemberFromListMember(id)
    console.log(info2)
    if (info2 == "Delete client done") {
        manager.deleteAccount(id)
        writeData()
    }
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                deleteClient()
                break
            case 0:
                displayStaff()
                break
        }
    } while (choice != -1)
}//done<<<<<<<<<<<<<<<

start()
// startClient()
// startStaff()
// startManage()

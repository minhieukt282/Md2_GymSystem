import {Account} from "./service/account";
import {ReadWriteFile} from "./readWriteFile";
import {StaffManage} from "./manage/staffManage";
import {ClientManage} from "./manage/clientManage";
import {Client} from "./service/client";

const USER: number = 1
const STAFF: number = 2
const MANAGER: number = 3
let input = require('readline-sync');
let url_1 = "./text/dataAccount.txt"
let url_2 = "./text/dataListMember.txt"
let url_3 = "./text/dataListStaff.txt"
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
let user1 = new Client(5, "userOne","1",1)
let user2 = new Client(6, "userTwo","1",1,"Chi Hoa", 41)
let user3 = new Client(7, "userThree","1",1, "", 35)

let admin1 = new ClientManage(8, "Admin_One","1",2)
let admin2 = new ClientManage(9, "Admin_Two","1",2,"Lan", 45)
let admin3 = new ClientManage(10, "Admin_Three","1",2, "", 25)
manager.addClientToListMember(user1)
manager.addClientToListMember(user2)
manager.addClientToListMember(user3)
manager.addStaff(admin1)
manager.addStaff(admin2)
manager.addStaff(admin3)


// let data_1 = manager.listMemberToString()
let data_2 = manager.listStaffToString()
// ioFile_2.writeFile(data_1)
ioFile_3.writeFile(data_2)


function readData() {
    arrayData_1 = ioFile.readFile().split(",")
    arrayData_2 = ioFile_2.readFile().split(",")
    arrayData_3 = ioFile_3.readFile().split(",")
    // console.log(manager.readDataListAccount(arrayData_1))
    console.log("---------------------")
    // console.log(manager.readDataListMember(arrayData_2))
    console.log(manager.readDataListStaff(arrayData_3))
}

readData()
// init()

function init() {
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
        startStaff()
    } else {
        console.log("Username or password is incorrect. Please try again")
        do {
            choice = +input.question("Your select: ")
            switch (choice) {
                case 1:
                    register()
                    break
                case 0:
                    init()
                    break
            }
        } while (choice == -1)
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
            let data_1 = manager.listAccountToString()
            let data_2 = manager.listMemberToString()
            let data_3 = "null"
            ioFile.writeFile(data_1)
            ioFile_2.writeFile(data_2)
            ioFile_3.writeFile(data_3)
            // console.log(manager.displayStaff())
            // console.log(manager.displayListMember())
            login()
        }
    }
}

function startClient() {
    let choice: number
    let info = `-----WELCOME-----
    1. My profile
    2. My workout
    3. My diet
    4. Contact my personal trainer
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
            case 0:
                init()
                break
        }
    } while (choice != -1)
}

function myProfile() {
    let choice: number
    let info = `-----MY PROFILE-----
    1. Show my profile
    2. Edit Profile
    0. Back to menu`
    console.log(info)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                showProfile()
                break
            case 2:
                editProfile()
                break
            case 0:
                startClient()
                break
        }
    } while (choice != -1)
}

function showProfile() {
    console.log("info ban day.... test them")
}

function editProfile() {
    console.log("edit o day........ test them")
}

function myWorkout() {
    let choice: number
    let info = `-----MY EXERCISE-----
   
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

function myDiet() {
    let choice: number
    let info = `-----MY DIET-----
 
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

//----------------------------------------
// startStaff()
function startStaff() {
    let choice: number
    let info = `-----WELCOME STAFF-----
    1. Show client
    2. Contact to client
    3. Edit profile
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
                updateProfile()
                break
            case 0:
                init()
                break
        }
    } while (choice == -1)
}

function showListClient() {
    let choice: number
    let info = `-----LIST CLIENT-----
    1. Add client
    2. Update Info client
    3. Delete client
    0. Back to menu`
    console.log(info)

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

function updateProfile() {
    let choice: number
    let info = `-----UPDATE MY PROFILE-----
    0. Back to menu`
    console.log(info)
    let name = input.question("Input name: ")
    let age = input.question("Input age: ")

    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 0:
                startStaff()
                break
        }
    } while (choice == -1)
}

//----------------------------------------
// startManage()
function startManage() {
    let choice: number
    let info = `-----WELCOME MANAGER-----
    1. Show Staff and Client
    2. 
    3. 
    0. Logout`
    console.log(info)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                displayStaff()
                break
            case 2:
                break
            case 0:
                init()
                break
        }
    } while (choice != -1)
}

function displayStaff() {
    let choice: number
    let info = `-----Staff and Client-----
    1. Add Staff
    2. Delete Staff
    3. Delete Client
    0. Back to menu`
    console.log(info)
    console.log(manager.displayStaff())
    console.log(manager.displayListMember())
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                addStaff()
                break
            case 2:
                deleteStaff()
                break
            case 3:
                deleteClient()
                break
            case 0:
                startManage()
                break
        }
    } while (choice != -1)
}

function addStaff() {

}

function deleteStaff() {

}

function deleteClient() {

}


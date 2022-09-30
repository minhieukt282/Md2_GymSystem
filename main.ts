import {Account} from "./service/account";
import {IOFile} from "./readWriteFile";
import {StaffManage} from "./manage/staffManage";
import {ClientManage} from "./manage/clientManage";
import {Client} from "./service/client";


const USER: number = 1
const STAFF: number = 2
const MANAGER: number = 3

// let today = new Date();
// let date = today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear();
// let time = today.getHours() + ':' + today.getMinutes();
// let dateTime = time + ' - ' + date;

let indexStaff: number
let indexTempClient: number
let indexClient: number
let isStatusUpgrade = false
let isGateCoach = false

let input = require('readline-sync');
let url_1 = "./text/dataAccount.txt"
let url_2 = "./text/dataListMember.txt"
let url_3 = "./text/dataListStaff.txt"
let url_4 = "./text/dataTempListMember.txt"

let arrAccount = []
let arrTempListMember = []
let arrListMember = []
let arrListStaff = []
let manager = new StaffManage()
let ioAccount = new IOFile(url_1)
let ioListMember = new IOFile(url_2)
let ioListStaff = new IOFile(url_3)
let ioTempListMember = new IOFile(url_4)

function writeData() {
    let dataListAccount = manager.listAccountToString()
    let dataListMember = manager.listMemberToString()
    let dataListStaff = manager.listStaffToString()
    let dataTempListStaff = manager.tempListMemberToString()
    ioAccount.writeFile(dataListAccount)
    ioListMember.writeFile(dataListMember)
    ioListStaff.writeFile(dataListStaff)
    ioTempListMember.writeFile(dataTempListStaff)
}

function readData() {
    arrAccount = ioAccount.readFile().split(",")
    arrListMember = ioListMember.readFile().split(",")
    arrListStaff = ioListStaff.readFile().split(",")
    arrTempListMember = ioTempListMember.readFile().split(",")
    manager.readDataListAccount(arrAccount)
    manager.readDataListStaff(arrListStaff)
    manager.readDataListMember(arrListMember)
    manager.readDataTempListMember(arrTempListMember)
}

function start() {
    readData()
    let choice: number
    let info = `---------------WELCOME TO THE FITNESS CLUB---------------
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
}//done<<<<<<<<<<<<<<<<

function login() {
    isStatusUpgrade = false
    isGateCoach = false
    indexStaff = -1
    indexTempClient = -1
    indexClient = -1
    readData()
    let choice: number
    let info = `--------------------LOGIN--------------------
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
            isStatusUpgrade = manager.listMember[indexClient].checkUpGrade
            isGateCoach = manager.listMember[indexClient].isGateCoach
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
}//done<<<<<<<<<<<<<<<<

function register() {
    readData()
    let info = `--------------------REGISTER--------------------`
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
}//done<<<<<<<<<<<<<<<<

//----------------------------------------
//done client
function startClient() {
    readData()
    let choice: number
    let info = `--------------------WELCOME--------------------
    1. My profile
    2. My workout
    3. My diet
    4. Contact my personal trainer
    5. Upgrade account
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
                upgradeAccount()
                break
            case 0:
                start()
                break
        }
    } while (choice != -1)
}//done<<<<<<<<<<<<<<<
function myProfile() {
    let choice: number
    let info = `--------------------MY PROFILE--------------------
    1. Edit Profile
    0. Back to menu`
    console.log(info)
    let id = +input.question("Enter Id to confirm: ")
    let index = manager.findByIdListMember(id)
    console.log(manager.listMember[index].showProfile())
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                editMyProfile()
                break
            case 0:
                startClient()
                break
        }
    } while (choice != -1)
}//done<<<<<<<<<<<<<<<<
function editMyProfile() {
    let choice: number
    let info = `--------------------EDIT MY PROFILE--------------------
    0. Back to menu
    Press enter to skip`
    console.log(info)
    let name = input.question("Update my name: ")
    let age = Math.floor(+input.question("Update my age: "))
    let id = +input.question("Enter Id to confirm: ")
    let index = manager.findByIdListMember(id)
    if (index != -1) {
        manager.listMember[index].editProfile(name, age)
        writeData()
    } else console.log("Id not found, please try again")
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                editMyProfile()
                break
            case 0:
                startClient()
                break
        }
    } while (choice != -1)
}//done<<<<<<<<<<<<<<<<<
function myWorkout() {
    if (isStatusUpgrade) {
        let choice: number
        let info = `--------------------MY EXERCISE--------------------
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
    } else {
        let note = input.question("Upgrade your account to unlock the functionality. \nPress enter to skip")
        if (note) {
        } else startClient()
    }
}//done
function myDiet() {
    if (isStatusUpgrade) {
        let choice: number
        let info = `--------------------MY DIET--------------------
        0. Back to menu`
        console.log(info)
        let info2 = "Eat any thing"
        console.log(info2)
        do {
            choice = +input.question("Your select: ")
            switch (choice) {
                case 0:
                    startClient()
                    break
            }
        } while (choice != -1)
    } else {
        let note = input.question("Upgrade your account to unlock the functionality. \nPress enter to skip")
        if (note) {
        } else startClient()
    }
}//done
function contactPT() {
    if (isGateCoach) {
        let choice: number
        let info = `--------------------CONTACT MY PERSONAL TRAINER--------------------
        0. Back to menu`
        console.log(info)
        console.log("DEVELOPING............")
        do {
            choice = +input.question("Your select: ")
            switch (choice) {
                case 0:
                    startClient()
                    break
            }
        } while (choice != -1)
    } else {
        let note = input.question("If you haven't signed up for a trainer, upgrade your account to unlock the functionality. \nPress enter to skip")
        if (note) {
        } else startClient()
    }
}//done
function upgradeAccount() {
    let choice: number
    let info = `--------------------UP GRADE ACCOUNT--------------------
    When you sign up as a member you will unlock channel "My workout" and "My diet".
    You can choose your personal trainer anytime you want and you will unlock 
    the ability to talk directly with the coach.
    Price: 300 per month
    0. Back to menu
    Press enter to skip`
    console.log(info)
    if (isGateCoach) {
        let note = input.question("You have signed up for a coach, press enter to skip")
        if (note) {
        } else startClient()
    } else {
        if (isStatusUpgrade) {
            console.log(`<><><><><>Select Coach<><><><><>\n${manager.displayStaff()}`)
            let idMember = Math.floor(+input.question("Enter My Id: "))
            let idStaff = Math.floor(+input.question("Enter Coach Id: "))
            let checkGate = Math.floor(+input.question("Press 1 to confirm: "))
            if (checkGate == 1) {
                console.log(manager.addMemberToStaff(idMember, idStaff))
                isGateCoach = true
                manager.isCheckGate(idMember, isStatusUpgrade, isGateCoach)
                writeData()
            }
        } else {
            let addMonth = +input.question("Enter the number of subscription months: ")
            let idMember = Math.floor(+input.question("Enter My Id to confirm: "))
            if (addMonth != 0) {
                console.log(manager.tempListMember[indexTempClient].upGrade(addMonth))
                let cost = manager.tempListMember[indexTempClient].totalCost(addMonth)
                manager.addRevenue(cost)
                manager.countPaidMember++
                isStatusUpgrade = true
                manager.isCheckGate(idMember, isStatusUpgrade, isGateCoach)
                writeData()
            }
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
}//done<<<<<<<<<<<<<<<<<<<

//----------------------------------------
function startStaff() {
    readData()
    let choice: number
    let info = `--------------------WELCOME STAFF--------------------
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
                console.log("DEVELOPING..............")
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
    readData()
    let choice: number
    let info = `--------------------UPDATE CLIENT PROFILE--------------------
    1. Continue
    0. Back to menu
    Press enter to skip`
    console.log(info)
    let info2 = manager.listStaffs[indexStaff].displayListClient()
    console.log(info2)
    if (info2 != "No data") {
        let idClient = Math.floor(+input.question("Enter client Id: "))
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
    let info = `--------------------LIST MY CLIENT--------------------
    1. Edit client profile
    0. Back to menu`
    console.log(info)
    console.log(manager.listStaffs[indexStaff].displayListClient())
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
}//done<<<<<<<<<<<<<<<<<<<

function updateMyProfile() {
    readData()
    let choice: number
    let info = `--------------------UPDATE MY PROFILE--------------------
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
    readData()
    let choice: number
    let info = `--------------------WELCOME MANAGER--------------------
    1. Show Staff and Member
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
    let info = `--------------------MONTHLY REVENUE--------------------
    0. Back to menu`
    console.log(info)
    console.log("Developing........")
    // console.log(manager.showRevenue())
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 0:
                startManage()
                break
        }
    } while (choice != -1)
}//done
//done
function displayStaff() {
    readData()
    let choice: number
    let info = `--------------------STAFF AND MEMBER--------------------
    1. Add Member to Staff
    2. Move Client from Staff
    3. Delete Staff
    4. Delete Member
    0. Back to menu`
    console.log(info)
    console.log(`<><><><><>List Staff<><><><><>\n${manager.displayStaff()}`)
    console.log(`<><><><><>List Member<><><><><>\n${manager.displayListMember()}`)
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                addMemberToStaff()
                break
            case 2:
                moveClientFromStaff()
                break
            case 3:
                deleteStaff()
                break
            case 4:
                deleteMember()
                break
            case 0:
                startManage()
                break
        }
    } while (choice != -1)
}
//done
function addMemberToStaff() {
    readData()
    let choice: number
    let info = `--------------------ADD MEMBER TO STAFF--------------------
    1. Continue
    0. Back to menu`
    console.log(info)
    let idMember = +input.question("Enter member Id: ")
    let idStaff = +input.question("Enter staff Id: ")
    let info2 = manager.addMemberToStaff(idMember, idStaff)
    console.log(info2)
    if (info2 == "Add member to staff done") {
        writeData()
    }
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
//done
function moveClientFromStaff() {
    readData()
    console.log(manager.listStaffs)
    let choice: number
    let info = `--------------------MOVE CLIENT FROM STAFF--------------------
    0. Back to menu`
    console.log(info)
    let idMember = +input.question("Enter the client Id to move: ")
    let idStaff = +input.question("Enter staff id containing client id: ")
    let info2 = manager.moveMemberFromListStaff(idMember, idStaff)
    console.log(info2)
    if (info2 == "Move Client to Member done") {
        writeData()
    }
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 0:
                displayStaff()
                break
        }
    } while (choice != -1)
}
//done
function deleteStaff() {
    readData()
    let choice: number
    let info = `--------------------DELETE STAFF--------------------
    1. Continue
    0. Back to menu`
    console.log(info)
    let idStaff = +input.question("Enter staff Id: ")
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
}
//done
function deleteMember() {
    readData()
    let choice: number
    let info = `--------------------DELETE MEMBER--------------------
    1. Continue
    0. Back to menu`
    console.log(info)
    let id = +input.question("Enter member Id to delete: ")
    let info2 = manager.deleteMember(id)
    console.log(info2)
    if (info2 == "Delete member done") {
        manager.deleteAccount(id)
        writeData()
    }
    do {
        choice = +input.question("Your select: ")
        switch (choice) {
            case 1:
                deleteMember()
                break
            case 0:
                displayStaff()
                break
        }
    } while (choice != -1)
}

start()


// manager.addMemberToStaff(1, 10)
// manager.addMemberToStaff(2, 10)
// manager.addMemberToStaff(3, 10)
// manager.addMemberToStaff(4, 10)
// writeData()
// readData()
// console.log(manager.listStaffs[0].displayListClient())
// let a = input.question("member ")
// let b = input.question("staff ")
// manager.moveMemberFromListStaff(a, b)
// writeData()
// console.log("__________________")
// readData()
// console.log(manager.listStaffs[0].displayListClient())
// let c = input.question("member ")
// let d = input.question("staff ")
// manager.moveMemberFromListStaff(c, d)
// writeData()
// console.log("__________________")
// readData()
// console.log(manager.listStaffs[0].displayListClient())
// let e = input.question("member ")
// let f = input.question("staff ")
// manager.moveMemberFromListStaff(e,f)
// writeData()
// console.log("__________________")
// readData()
// console.log(manager.listStaffs[0].displayListClient())
// let g = input.question("member ")
// let h = input.question("staff ")
// manager.moveMemberFromListStaff(g,h)
// writeData()
// console.log("__________________")
// readData()
// console.log(manager.listStaffs[0].displayListClient())
// let i = input.question("member ")
// let k = input.question("staff ")
// manager.moveMemberFromListStaff(i,k)
// writeData()
// console.log("__________________")
// readData()
// console.log(manager.listStaffs[0].displayListClient())


import {ClientManage} from "./clientManage";
import {Client} from "../service/client";
import {AccountManage} from "./accountManage";

export class StaffManage extends AccountManage {
    listStaffs: ClientManage[] = []
    tempListMember: Client[] = []
    listMember: Client[] = []
    listRevenue: number[] = []
    countPaidMember: number = 0

//--------------------------------------
    readDataListStaff(arrData: any): any {
        let tempArray: ClientManage[] = []
        for (let i = 0; i < arrData.length - 1; i += 6) {
            let id = +arrData[i]
            let userName = arrData[i + 1]
            let passWord = arrData[i + 2]
            let key = +arrData[i + 3]
            let name = arrData[i + 4]
            let age = +arrData[i + 5]
            let newClientManager = new ClientManage(id, userName, passWord, key, name, age)
            tempArray.push(newClientManager)
        }
        this.listStaffs = [...tempArray];
        return this.listStaffs
    }

    listStaffToString(): string {
        let data: string = ""
        this.listStaffs.forEach((item) => {
            if (item.name == undefined || item.name == "") item.name = "NaN"
            if (item.age == undefined || item.age == "") item.age = "NaN"
            data += `${item.id},${item.userName},${item.passWord},${item.key},${item.name},${item.age},\n`
        })
        return data
    }

    readDataListMember(arrData: any): any {
        let tempArray: Client[] = []
        for (let i = 0; i < arrData.length - 1; i += 8) {
            let id = +arrData[i]
            let userName = arrData[i + 1]
            let passWord = arrData[i + 2]
            let key = +arrData[i + 3]
            let name = arrData[i + 4]
            let age = +arrData[i + 5]
            let height = +arrData[i + 6]
            let weight = +arrData[i + 7]
            let newClient = new Client(id, userName, passWord, key, name, age, height, weight)
            tempArray.push(newClient)
        }
        this.tempListMember = [...tempArray];
        return this.tempListMember
    }

    listMemberToString(): string {
        let data: string = ""
        this.listMember.forEach(item => {
            if (item.name == undefined || item.name == "") item.name = "NaN"
            if (item.age == undefined || item.age == "") item.age = "NaN"
            if (item.height == undefined || item.height == "") item.height = "NaN"
            if (item.weight == undefined || item.weight == "") item.weight = "NaN"
            data += `${item.id},${item.userName},${item.passWord},${item.key},${item.name},${item.age},${item.height},${item.weight},\n`
        })
        return data
    }
//--------------------------------------
    showRevenue() {
        let total: number = 0
        this.listRevenue.forEach(item => {
            total += item
        })
        return `${this.listRevenue}\nTotal Monthly Revenue: ${total}\nTotal Paid Member: ${this.countPaidMember}`
    }

    addRevenue(cost: number) {
        this.listRevenue.push(cost)
    }

    addStaff(listStaff: ClientManage) {
        this.listStaffs.push(listStaff)
    }

    addClientToListMember(client: Client) {
        this.listMember.push(client)
        this.tempListMember.push(client)
    }

    addMemberToStaff(idMember: number, idStaff: number): string {
        let indexTempMember = this.findByIdTempListMember(idMember)
        let indexStaff = this.findByIdStaff(idStaff)
        if (indexTempMember == -1) return "Id member not found"
        else if (indexStaff == -1) return "Id Staff not found"
        else {
            this.listStaffs[indexStaff].addClient(this.tempListMember[indexTempMember])
            this.tempListMember.splice(indexTempMember, 1)
            return "Add member to staff done"
        }
    }

    deleteStaff(idStaff: number): any {
        let indexStaff = this.findByIdStaff(idStaff)
        if (indexStaff != -1) {
            this.listStaffs.forEach((item, idx) => {
                if (idx == indexStaff) {
                    item.listClient.forEach(value => {
                        this.tempListMember.push(value)
                    })
                }
            })
            this.listStaffs.splice(indexStaff, 1)
            return "Delete staff done"
        } else return "Id staff not found"
    }

    deleteMemberFromListMember(idMember: number): string {
        let indexTempMember = this.findByIdTempListMember(idMember)
        let indexMember = this.findByIdListMember(idMember)
        if (indexTempMember == -1) return "Id client not found"
        else {
            this.tempListMember.splice(indexTempMember, 1)
            this.listMember.splice(indexMember, 1)
            return "Delete client done"
        }
    }

    deleteMemberFromListStaff(idMember: number, idStaff: number): string {
        let indexMember = this.findByIdListMember(idMember)
        let indexStaff = this.findByIdStaff(idStaff)
        if (indexStaff == -1) return "Id staff not found"
        else {
            this.listMember.splice(indexMember, 1)
            return this.listStaffs[indexStaff].deleteClient(idMember)
        }
    }

    findIndexByAccount(userName: string, passWord: string): number {
        let index: number = -1
        this.listStaffs.forEach((item, idx) => {
            if (item.userName == userName && item.passWord == passWord) index = idx
        })
        this.tempListMember.forEach((item, idx) => {
            if (item.userName == userName && item.passWord == passWord) index = idx
        })
        return index
    }

    findIndex(userName: string, passWord: string): number {
        let index: number = -1
        this.listMember.forEach((item, idx) => {
            if (item.userName == userName && item.passWord == passWord) index = idx
        })
        return index
    }

    findByIdListMember(id: number): number {
        let flag = -1
        this.listMember.forEach((item, index) => {
            if (item.id == id) flag = index
        })
        return flag
    }

    findByIdTempListMember(id: number): number {
        let flag = -1
        this.tempListMember.forEach((item, index) => {
            if (item.id == id) flag = index
        })
        return flag
    }

    findByIdStaff(id: number): number {
        let flag = -1
        this.listStaffs.forEach((item, index) => {
            if (item.id == id) flag = index
        })
        return flag
    }

    displayStaff(): string {
        let data = ""
        this.listStaffs.forEach((item) => {
            data += `Id: ${item.id}, Name: ${item.name}, Age: ${item.age}\nList Client:\n${item.displayListClient()}\n`
        })
        return data
    }

    displayOneStaff(idStaff: number): string | ClientManage {
        let indexStaff = this.findByIdStaff(idStaff)
        if (indexStaff == -1) return "Id staff not found"
        else return this.listStaffs[indexStaff]
    }

    displayListMember(): string {
        let data = ""
        this.tempListMember.forEach((item) => {
            data += `Id: ${item.id}, Name: ${item.name}, Age: ${item.age}\n`
        })
        return data
    }
}
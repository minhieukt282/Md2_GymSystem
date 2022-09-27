import {ClientManage} from "./clientManage";
import {Client} from "../service/client";
import {AccountManage} from "./accountManage";
import it from "node:test";

export class StaffManage extends AccountManage {
    listStaffs: ClientManage[] = []
    listMember: Client[] = []

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
        this.listMember = [...tempArray];
        return this.listMember
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

    addStaff(listStaff: ClientManage) {
        this.listStaffs.push(listStaff)
    }

    addClientToListMember(client: Client) {
        this.listMember.push(client)
    }

    addMemberToStaff(idMember: number, idStaff: number): string {
        let indexMember = this.findByIdMember(idMember)
        let indexStaff = this.findByIdStaff(idStaff)
        if (indexMember == -1) return "Id member not found"
        else if (indexStaff == -1) return "Id Staff not found"
        else {
            this.listStaffs[indexStaff].addClient(this.listMember[indexMember])
            this.listMember.splice(indexMember, 1)
            return "Add member to staff done"
        }
    }

    deleteMemberFromListMember(idMember: number): string {
        let indexMember = this.findByIdMember(idMember)
        if (indexMember == -1) return "Id client not found"
        else {
            this.listMember.splice(indexMember, 1)
            return "Delete client done"
        }
    }

    deleteMemberFromListStaff(idMember: number, idStaff: number): string {
        let indexStaff = this.findByIdStaff(idStaff)
        if (indexStaff == -1) return "Id staff not found"
        else return this.listStaffs[indexStaff].deleteClient(idMember)
    }

    findIndexByAccount(userName: string, passWord: string): number {
        let index: number = -1
        this.listStaffs.forEach((item, idx) => {
            if (item.userName == userName && item.passWord == passWord) index = idx
        })
        return index
    }

    findByIdMember(id: number): number {
        let flag = -1
        this.listMember.forEach((item, index) => {
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
        this.listMember.forEach((item) => {
            data += `Id: ${item.id}, Name: ${item.name}, Age: ${item.age}
`
        })
        return data
    }
}
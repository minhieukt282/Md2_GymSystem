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
    changeStringToBoolean(value: any) {
        if (value == "true") value = true
        if (value == "false") value = false
        return value
    }

    readDataTempListMember(arrDataTemp: any): any {
        let tempArray: Client[] = []
        for (let i = 0; i < arrDataTemp.length - 1; i += 11) {
            let id = +arrDataTemp[i]
            let userName = arrDataTemp[i + 1]
            let passWord = arrDataTemp[i + 2]
            let key = +arrDataTemp[i + 3]
            let name = arrDataTemp[i + 4]
            let age = +arrDataTemp[i + 5]
            let height = +arrDataTemp[i + 6]
            let weight = +arrDataTemp[i + 7]
            let staffId = +arrDataTemp[i + 8]
            let checkUpGrade = this.changeStringToBoolean(arrDataTemp[i + 9])
            let isGateCoach = this.changeStringToBoolean(arrDataTemp[i + 10])
            let newClient = new Client(id, userName, passWord, key, name, age, height, weight, checkUpGrade, staffId, isGateCoach)
            tempArray.push(newClient)
        }
        this.tempListMember = [...tempArray];
        return this.tempListMember
    }

    readDataListMember(arrData: any): any {
        let tempArray: Client[] = []
        for (let i = 0; i < arrData.length - 1; i += 11) {
            let id = +arrData[i]
            let userName = arrData[i + 1]
            let passWord = arrData[i + 2]
            let key = +arrData[i + 3]
            let name = arrData[i + 4]
            let age = +arrData[i + 5]
            let height = +arrData[i + 6]
            let weight = +arrData[i + 7]
            let staffId = arrData[i + 8]
            let checkUpGrade = this.changeStringToBoolean(arrData[i + 9])
            let isGateCoach = this.changeStringToBoolean(arrData[i + 10])
            let newClient = new Client(id, userName, passWord, key, name, age, height, weight, checkUpGrade, staffId, isGateCoach)
            if (staffId != "NaN") {
                let index = this.findByIdStaff(staffId)
                this.listStaffs[index].listClient.push(newClient)
            }
            tempArray.push(newClient)
        }
        this.listMember = [...tempArray];
        return this.listMember
    }

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

    tempListMemberToString(): string {
        let data: string = ""
        this.tempListMember.forEach(value => {
            if (value.name == undefined || value.name == "") value.name = "NaN"
            if (value.age == undefined || value.age == "") value.age = "NaN"
            if (value.height == undefined || value.height == "") value.height = "NaN"
            if (value.weight == undefined || value.weight == "") value.weight = "NaN"
            if (value.staffId == undefined || value.staffId == "") value.staffId = "NaN"
            if (value.checkUpGrade == undefined) value.checkUpGrade = false
            if (value.isGateCoach == undefined) value.isGateCoach = false
            data += `${value.id},${value.userName},${value.passWord},${value.key},${value.name},${value.age},${value.height},${value.weight},${value.staffId},${value.checkUpGrade},${value.isGateCoach},\n`
        })
        return data
    }

    listMemberToString(): string {
        let data: string = ""
        this.listMember.forEach(item => {
            if (item.name == undefined || item.name == "") item.name = "NaN"
            if (item.age == undefined || item.age == "") item.age = "NaN"
            if (item.height == undefined || item.height == "") item.height = "NaN"
            if (item.weight == undefined || item.weight == "") item.weight = "NaN"
            if (item.staffId == undefined || item.staffId == "") item.staffId = "NaN"
            if (item.checkUpGrade == undefined) item.checkUpGrade = false
            if (item.isGateCoach == undefined) item.isGateCoach = false
            data += `${item.id},${item.userName},${item.passWord},${item.key},${item.name},${item.age},${item.height},${item.weight},${item.staffId},${item.checkUpGrade},${item.isGateCoach},\n`
        })
        return data
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

//--------------------------------------
    isCheckGate(idMember: number, isStatusUpGrade: boolean, isGateCoach: boolean) {
        let index = this.findByIdListMember(idMember)
        this.listMember[index].checkUpGrade = isStatusUpGrade
        this.listMember[index].isGateCoach = isGateCoach
    }

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
        if (indexTempMember != -1) {
            if (indexStaff != -1) {
                let client = this.tempListMember[indexTempMember]
                this.listStaffs[indexStaff].addClient(client)
                this.tempListMember.splice(indexTempMember, 1)
                let index = this.findByIdListMember(idMember)
                this.listMember[index].staffId = idStaff
                return "Add member to staff done"
            } else return "Staff Id not found"
        } else return "Member Id not found"
    }

    deleteStaff(idStaff: number): any {
        let indexStaff = this.findByIdStaff(idStaff)
        if (indexStaff != -1) {
            this.listStaffs.forEach((item, idx) => {
                if (idx == indexStaff) {
                    item.listClient.forEach(value => {
                        let index = this.findByIdListMember(value.id)
                        if (index != -1) {
                            this.listMember[index].staffId = ""
                            this.listMember[index].isGateCoach = false
                            this.tempListMember.push(value)
                        }
                    })
                }
            })
            this.listStaffs.splice(indexStaff, 1)
            return "Delete staff done"
        } else return "Staff Id not found"
    }

    deleteMember(idMember: number): string {
        let indexTempMember = this.findByIdTempListMember(idMember)
        let indexMember = this.findByIdListMember(idMember)
        if (indexTempMember == -1) return "Member Id not found"
        else {
            this.tempListMember.splice(indexTempMember, 1)
            this.listMember.splice(indexMember, 1)
            return "Delete member done"
        }
    }

    moveMemberFromListStaff(idMember: number, idStaff: number): string {
        let indexStaff = this.findByIdStaff(idStaff)
        let indexMember = this.findByIdListMember(idMember)
        if (indexStaff != -1) {
            if (indexMember != -1) {
                // let listClientOfStaff = this.listStaffs[indexStaff].listClient;
                this.listStaffs[indexStaff].deleteClient(idMember)
                this.listMember.forEach((item, index) => {
                    if (index == indexMember) {
                        this.listMember[indexMember].staffId = "NaN"
                        this.listMember[indexMember].isGateCoach = false
                        this.tempListMember.push(item)
                    }
                })
                return "Move Client to Member done"
            } else return "Client Id not found"
        } else return "Staff Id not found"
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
        if (data != "") return data
        else return "Members have their own personal trainer"
    }
}
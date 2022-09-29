import {Client} from "../service/client";
import {Account} from "../service/account";

// ClientManager = PersonalTrainer
export class ClientManage extends Account {
    private _name: any
    private _age: any
    listClient: Client[] = []

    constructor(id: number, userName: string, passWord: string, key: number, name?: string, age?: number) {
        super(id, userName, passWord, key);
        this._name = name;
        this._age = age;
    }

    listClientToString() {
        let data: string = ""
        this.listClient.forEach((item, index) => {
            if (item.name == undefined || item.name == "") item.name = "undefined"
            if (item.age == undefined || item.age == "") item.age = "undefined"
            if (item.height == undefined || item.height == "") item.height = "undefined"
            if (item.weight == undefined || item.weight == "") item.weight = "undefined"
            data += `${item.id},${item.userName},${item.passWord},${item.key},${item.name},${item.age},${item.height},${item.weight},\n`
        })
        return data
    }

    myInfo(): string {
        let info = `My information
        Name: ${this.name}
        Age: ${this.age}`
        return info
    }

    updateMyInfo(name?: string, age?: number): string {
        if (name) this.name = name
        if (age) this.age = age
        return "Update done"
    }

    updateInfoClient(id: number, name?: string, age?: number, height?: number, weight?: number, staffId?: number): string {
        let index = this.findById(id)
        if (index != -1) {
            if (name) this.listClient[index].name = name
            if (age) this.listClient[index].age = age
            if (height) this.listClient[index].height = height
            if (weight) this.listClient[index].weight = weight
            if (staffId) this.listClient[index].staffId = staffId
            return "Update done"
        } else return "ID not found"
    }

    deleteClient(id: number): string {
        let index = this.findById(id)
        if (index != -1) {
            this.listClient.splice(index, 1)
            return "Delete done"
        } else return "ID client not found"
    }

    addClient(client: Client): void {
        this.listClient.push(client)
    }

    displayListClient(): string {
        let data = ""
        this.listClient.forEach(item => {
            data += `Id: ${item.id}, Name: ${item.name}, Age: ${item.age}, Height: ${item.height}, Weight: ${item.weight}\n`
        })
        if (data == "") return "No data"
        else return data
    }

    findById(id: number): number {
        let flag = -1
        this.listClient.forEach((item, index) => {
            if (item.id == id) flag = index
        })
        return flag
    }

    get name(): any {
        return this._name;
    }

    set name(value: any) {
        this._name = value;
    }

    get age(): any {
        return this._age;
    }

    set age(value: any) {
        this._age = value;
    }
}
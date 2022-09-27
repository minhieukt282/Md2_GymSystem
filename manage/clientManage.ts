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

    updateInfo(id: number, name?: string, age?: number, height?: number, weight?: number): string {
        let index = this.findById(id)
        if (index != -1) {
            if (name) this.listClient[index].name = name
            if (age) this.listClient[index].age = age
            if (height) this.listClient[index].height = height
            if (weight) this.listClient[index].weight = weight
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

    displayListClient(): Client[] {
        return this.listClient
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
import {Account} from "../service/account";

export class AccountManage {
    listAccount: Account[] = []

    readDataListAccount(arrData: any): any {
        let tempArray: Account[] = []
        for (let i = 0; i < arrData.length - 1; i += 4) {
            let id = +arrData[i]
            let userName = arrData[i + 1]
            let passWord = arrData[i + 2]
            let key = arrData[i + 3]
            let newAccount = new Account(id, userName, passWord, key)
            tempArray.push(newAccount)
        }
        this.listAccount = [...tempArray];
        return this.listAccount
    }

    listAccountToString(): string {
        let data: string = ""
        this.listAccount.forEach(item => {
            data += `${item.id},${item.userName},${item.passWord},${item.key},\n`
        })
        return data
    }

    checkKey(userName: string, passWord: string): number {
        let keyCode: number = -1
        this.listAccount.forEach(item => {
            if (item.userName == userName && item.passWord == passWord) keyCode = item.key
        })
        return keyCode
    }

    checkId(id: number): boolean {
        let flag: boolean = false
        this.listAccount.forEach(item => {
            if (item.id == id) flag = true
        })
        return flag
    }

    checkUserNameInput(userName: string): boolean {
        let flag = false
        this.listAccount.forEach(item => {
            if (item.userName == userName) flag = true
        })
        return flag
    }

    checkAccount(userName: string, passWord: string): boolean {
        let flag = false
        this.listAccount.forEach(item => {
            if (item.userName == userName && item.passWord == passWord) flag = true
        })
        return flag
    }

    addAccount(account: Account): string {
        this.listAccount.push(account)
        return "Create Account Success"
    }

    deleteAccount(id: number): string {
        let index = this.findById(id)
        if (index != -1) {
            this.listAccount.splice(index, 1)
            return "Delete Done"
        } else return "Id Not Found"
    }

    displayListAccount() {
        let display = ''
        this.listAccount.forEach((item) => {
            display += `ID: ${item.id}, UserName: ${item.userName}, PassWord: ${item.passWord}, Key: ${item.key} \n`
        })
        return display
    }

    findById(id: number): number {
        let flag = -1
        this.listAccount.forEach((item, index) => {
            if (item.id == id) flag = index
        })
        return flag
    }

}
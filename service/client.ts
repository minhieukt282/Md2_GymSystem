import {Account} from "./account";

export class Client extends Account {
    private _name: any
    private _age: any
    private _height: any
    private _weight: any
    private _bmi: any
    private _checkUpGrade: any = false
    private _staffId: any
    private _isGateCoach: any = false


    constructor(id: number, userName: string, passWord: string, key: number, name?: any, age?: any, height?: any, weight?: any, checkUpGrade?: any, staffId?: any, isGateCoach?: any) {
        super(id, userName, passWord, key);
        this._name = name;
        this._age = age;
        this._height = height;
        this._weight = weight;
        this._checkUpGrade = checkUpGrade;
        this._staffId = staffId;
        this._isGateCoach = isGateCoach;
    }

    upGrade(addMonth: number): string {
        let expirationDate = this.dateCalculation(addMonth)
        let cost = this.totalCost(addMonth)
        this.checkUpGrade = true
        return `Total Month: ${Math.floor(addMonth)} - Cost: ${cost}$\nExpiration Date: ${expirationDate}\nUp Grade Done`
    }

    dateCalculation(addMonth: number): string {
        addMonth = Math.floor(addMonth)
        let today = new Date();
        let month = today.getMonth() + 1
        let year = today.getFullYear()
        let i = 1
        while (i <= addMonth) {
            if (month < 12) {
                month++;
                i++;
            } else {
                month = 1;
                year++;
                i++
            }
        }
        return `${today.getDate()}/${month}/${year}`
    }

    totalCost(addMonth: number): number {
        addMonth = Math.floor(addMonth)
        let monthly: number = 300
        let cost = addMonth * monthly
        return cost
    }

    showProfile(): string {
        let info = `-----MY INFORMATION-----
        Name: ${this.name}
        Age: ${this.age}
        Height: ${this.height}
        Weight: ${this.weight}`
        // BMI index: ${this.bmiIndex()}`
        return info
    }
    editProfile(name?: string, age?: number):string{
        if (name) this.name = name
        if (age) this.age = age
        return "Update done"
    }
    bmiIndex() {
        if (this.bmi != undefined) {
            if (this.bmi < 18.5) return "Under weight, you need to eat more"
            else if (this.bmi >= 18.5 && this.bmi < 24.9) return "Normal, perfect body"
            else if (this.bmi >= 24.9 && this.bmi < 29.9) return "Over weight, you need to eat less"
            else return "Obese, Eat less and exercise more"
        } else return "NaN"
    }

    get isGateCoach(): boolean {
        return this._isGateCoach;
    }

    set isGateCoach(value: boolean) {
        this._isGateCoach = value;
    }

    get bmi(): any {
        if (this._height && this._weight) {
            this._bmi = this._weight / (this._height * this._height)
            return this._bmi;
        }
    }

    get staffId(): any {
        return this._staffId;
    }

    set staffId(value: any) {
        this._staffId = value;
    }

    get checkUpGrade(): boolean {
        return this._checkUpGrade;
    }

    set checkUpGrade(value: boolean) {
        this._checkUpGrade = value;
    }

    get name(): string {
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

    get height(): any {
        return this._height;
    }

    set height(value: any) {
        this._height = value;
    }

    get weight(): any {
        return this._weight;
    }

    set weight(value: any) {
        this._weight = value;
    }

}
import {Account} from "./account";

export class Client extends Account {
    private _name: any
    private _age: any
    private _height: any
    private _weight: any
    private _bmi: any


    constructor(id: number, userName: string, passWord: string, key: number, name?: string, age?: number, height?: number, weight?: number) {
        super(id, userName, passWord, key);
        this._name = name;
        this._age = age;
        this._height = height;
        this._weight = weight;
    }
     showProfile(): string{
        let info =  `-----MY INFORMATION-----
        Name: ${this.name}
        Age: ${this.age}
        Height: ${this.height}
        Weight: ${this.weight}
        BMI index: ${this.bmiIndex()}`
        return info
    }
    bmiIndex() {
        if (this.bmi < 18.5) return "thieu can"
        else if (this.bmi >= 18.5 && this.bmi < 24.9) return "binh thuong"
        else if (this.bmi >= 24.9 && this.bmi < 29.9) return "thua can"
        else return "beo thi cap 1"
    }

    get bmi(): any {
        if (this._height && this._weight) {
            this._bmi = this._weight / (this._height * this._height)
            return this._bmi;
        }
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
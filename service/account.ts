export class Account {
    protected _id: number
    protected _userName: string
    protected _passWord: string
    protected _key: number

    constructor(id: number, userName: string, passWord: string, key: number) {
        this._id = id;
        this._userName = userName;
        this._passWord = passWord;
        this._key = key;
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get userName(): string {
        return this._userName;
    }

    set userName(value: string) {
        this._userName = value;
    }

    get passWord(): string {
        return this._passWord;
    }

    set passWord(value: string) {
        this._passWord = value;
    }

    get key(): number {
        return this._key;
    }

    set key(value: number) {
        this._key = value;
    }
}
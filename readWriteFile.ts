export class IOFile {
    fs = require('fs')
    url: string

    constructor(url: string) {
        this.url = url;
    }

    readFile() {
        let data = this.fs.readFileSync(this.url, {encoding: 'utf8', flag: 'r'})
        return data
    }

    writeFile(data: string) {
        this.fs.writeFileSync(this.url, data)
    }
}

export class ListIOFile{
    listIOFile: IOFile[]=[]

}


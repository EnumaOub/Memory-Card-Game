import { md5 } from 'js-md5';

export class GameGen {
    constructor() {
        this.compData = [];
        this.nameLst = [
            "cyclop",
            "deadpool",
            "thor",
            "spider-man",
            "hulk",
            "wolverine",
            "daredevil"
        ];
        this.gameSel = [];
    }
    async getLocImage(name) {
        const ts = parseInt(Date.now() / 1000, 10);
        const key = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
        const keyPrivate = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
        const hash = md5(ts + keyPrivate + key)
        const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${key}&hash=${hash}&nameStartsWith=${name}&limit=1`;
        const response = await fetch(url);
        const jsonData = await response.json();
        console.log(jsonData)
        return jsonData.data["results"][0].thumbnail["path"] + "/portrait_medium.jpg"
    };

    async getData(nb) {
        const size = nb - this.compData.length
        for ( let i = 0; i<size; i++ ) {
            const pos = this.getRandNb(0, this.nameLst.length - 1);
            const nameCharac = this.nameLst[pos];
            const imageCharac = await this.getLocImage(nameCharac);

            
            this.compData.push(
                {
                    name: nameCharac,
                    image: imageCharac
                }
            )
            this.nameLst.splice(pos, 1);
        }
        
        return this.compData;
    }

    getRandNb(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Fisher–Yates shuffle
    shuffleCard() {

        let posActual = this.compData.length;
        let posNew;

        while ( posActual != 0 ) {
            posNew = this.getRandNb(0, posActual-1);
            posActual--;
            const temp =  this.compData[posActual];
            this.compData[posActual] = this.compData[posNew];
            this.compData[posNew] = temp;
        }
    }

    roundSelect(name){
        if ( this.gameSel.includes(name) ) {
            this.gameSel = [];
            return false;
        }
        else {
            this.gameSel.push(name)
            return true;
        }
    }

    checkEndGame() {
        return this.gameSel.length === this.compData.length;
    }
}
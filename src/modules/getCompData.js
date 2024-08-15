import { md5 } from 'js-md5';

export class cardGen {
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
        for ( let i = 0; i<nb; i++ ) {
            const nameCharac = this.nameLst[i];
            const imageCharac = await this.getLocImage(nameCharac);
            
            this.compData.push(
                {
                    name: nameCharac,
                    image: imageCharac
                }
            )
        }
        this.nameLst = this.nameLst.splice(0, nb);
        return this.compData;
    }
}
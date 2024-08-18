import { md5 } from 'js-md5';

const nameLst = [
    "cyclop",
    "deadpool",
    "thor",
    "spider-man",
    "hulk",
    "wolverine",
    "daredevil",
    "gambit",
    "blade",
    "sentry",
    "storm",
    "kitty pryde",
    "rogue",
    "cloak",
    "dagger",
    "scarlet",
    "wasp",
    "mockingbird"
];

const imageLink = [
    "http://i.annihil.us/u/prod/marvel/i/mg/6/70/526547e2d90ad/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/9/90/5261a86cacb99/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/d/d0/5269657a74350/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/e/03/5317713c9e746/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/5/a0/538615ca33ab0/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/d/50/50febb79985ee/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/a/40/52696aa8aee99/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/8/a0/523ca6f2b11e4/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/f/03/52695b1392c78/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/6/40/526963dad214d/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/4/03/5261677b30b64/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/3/10/5112d84e2166c/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/5/e0/528d31d76a2b0/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/8/e0/528d31c9eac10/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/9/20/4ce5a531089da/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/9/c0/5390dfd5ef165/standard_fantastic.jpg",
    "http://i.annihil.us/u/prod/marvel/i/mg/9/b0/51e829af23af9/standard_fantastic.jpg"    
]


export class GameGen {
    constructor() {
        this.compData = [];
        this.gameSel = [];
        this.nameLst = [...nameLst];
        this.imageLink = [...imageLink];
    }
    async getLocImage(name) {
        const ts = parseInt(Date.now() / 1000, 10);
        const key = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
        const keyPrivate = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
        const hash = md5(ts + keyPrivate + key)
        const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${key}&hash=${hash}&nameStartsWith=${name}&limit=1`;
        const response = await fetch(url);
        const jsonData = await response.json();
        console.log(name);
        return jsonData.data["results"][0].thumbnail["path"] + "/standard_fantastic.jpg"
    };

    directLink(nb){
        const size = nb - this.compData.length
        for ( let i = 0; i<size; i++ ) {
            const pos = this.getRandNb(0, this.nameLst.length - 1);
            const nameCharac = this.nameLst[pos];
            const imageCharac = this.imageLink[pos];
            this.nameLst.splice(pos, 1);
            this.imageLink.splice(pos, 1);

            this.compData.push(
                {
                    name: nameCharac,
                    image: imageCharac
                }
            )

            
        }
    }

    async getData(nb, toFetch=true) {
        if (!toFetch) {
            this.restoreLst();
            this.reset();
            this.directLink(nb);
        }
        else {
            const size = nb - this.compData.length
            for ( let i = 0; i<size; i++ ) {
                const pos = this.getRandNb(0, this.nameLst.length - 1);
                const nameCharac = this.nameLst[pos];
                this.nameLst.splice(pos, 1);
                this.imageLink.splice(pos, 1);
                const imageCharac = await this.getLocImage(nameCharac);
                
                this.compData.push(
                    {
                        name: nameCharac,
                        image: imageCharac
                    }
                )
                
            }
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

    restoreLst() {
        this.compData.forEach((data) => {
            this.nameLst.push(data.name);
            this.imageLink.push(data.image);
        })
    }

    reset() {
        this.compData = [];
        this.gameSel = [];
    }
}
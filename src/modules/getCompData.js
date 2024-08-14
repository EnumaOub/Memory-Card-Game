import { md5 } from 'js-md5';

const getImage = async (name) => {
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

export const getCompData = async (nb) => { 

    let compData = [
        
    ];

    const nameLst = [
        "cyclop",
        "deadpool",
        "thor",
        "spider-man",
        "hulk",
        "wolverine",
        "daredevil"
    ];

    for ( let i = 0; i<nb; i++ ) {
        const nameCharac = nameLst[i];
        const imageCharac = await getImage(nameCharac);
        
        compData.push(
            {
                name: nameCharac,
                image: imageCharac
            }
        )
    }

    
    return compData;

}

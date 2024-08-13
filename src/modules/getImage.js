
import { md5 } from 'js-md5';

export const getImage = async (name) => {
    const ts = parseInt(Date.now() / 1000, 10);
    let key;
    let keyPrivate;
    console.log("GET MARVEL")
    key = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
    keyPrivate = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
    const hash = md5(ts + keyPrivate + key)
    const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${key}&hash=${hash}&nameStartsWith=${name}&limit=1`;
    const response = await fetch(url);
    const jsonData = await response.json();
    return jsonData
};
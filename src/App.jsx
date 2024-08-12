import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { md5 } from 'js-md5';

const getMarvel = async (name) => {
  const ts = parseInt(Date.now() / 1000, 10);
  let key;
  let keyPrivate;
  if (process.env.NETLIFY === 'true') {
    key = process.env.REACT_APP_MARVEL_PUBLIC_KEY;
    keyPrivate = process.env.REACT_APP_MARVEL_PRIVATE_KEY;
   } else {
    key = import.meta.env.VITE_MARVEL_PUBLIC_KEY;
    keyPrivate = import.meta.env.VITE_MARVEL_PRIVATE_KEY;
   }
  
  const hash = md5(ts + keyPrivate + key)
  const url = `http://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${key}&hash=${hash}&nameStartsWith=${name}&limit=1`;

  const response = await fetch(url);
  const jsonData = await response.json();
  return jsonData
};


function App() {
  const [count, setCount] = useState(0)
  const [image, setImage] = useState("")
  function modifImg() {
    const name = document.getElementById("name").value
    console.log(name)
    getMarvel(name).then((res)=> {
      console.log(res)
      const img = res.data["results"][0].thumbnail["path"] + ".jpg"
      setImage(img)
  
    })
  }

  
  return (
    <>
      <div>
        <div>
        <img src={image} alt="dddd" />
        </div>
      
      <input type="text" name="name" id="name" defaultValue={"Wolverine"} />
      <button onClick={modifImg}>Submit</button>
      </div>
      
    </>
  )
}

export default App

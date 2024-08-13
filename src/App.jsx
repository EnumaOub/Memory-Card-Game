import { useState } from 'react'
import './App.css'
import { getImage } from './modules/getImage';




function App() {
  const [image, setImage] = useState("http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf.jpg")
  function modifImg() {
    const name = document.getElementById("name").value
    console.log(name)
    getImage(name).then((res)=> {
      console.log(res)
      const img = res.data["results"][0].thumbnail["path"] + ".jpg"
      setImage(img)
  
    })
  }

  
  return (
      <div>
        <div>
        <img src={image} alt="Image" />
        </div>
      
      <input type="text" name="name" id="name" defaultValue={"Cyclop"} />
      <button onClick={modifImg}>Submit</button>
      </div>
      

  )
}

export default App

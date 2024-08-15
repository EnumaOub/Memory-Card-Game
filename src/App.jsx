import { useState } from 'react'
import './App.css'
import { getCompData, cardGen } from './modules/getCompData';
import { CardTemp } from './components/CardTemp';
import { Loading } from './components/Loading';

function App() {
  const init = {name: "wolverine", image:"http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf/portrait_medium.jpg"}
  const [image, setImage] = useState([init])
  const [load, setload] = useState(true)
  function modifImg() {
    setload(false);
    const number = document.getElementById("number").value
    console.log(number)
    const cardLst = new cardGen();
    console.log(cardLst.compData);
    console.log(cardLst.nameLst);
    cardLst.getData(number).then((data) => {
      setImage(data);
      console.log(cardLst.compData);
      console.log(cardLst.nameLst);
      setload(true);
    })
  }

  return (
      <div>
        <div>
        {load ? (
          image.map((elem, i) => <CardTemp
        key={elem.name}
        name={elem.name}
        image={(elem.image)}
        > </CardTemp> )
      ) : (
      <Loading>
        
      </Loading>
        )
        }
        </div>
      <label name="number">Number of images</label>
      <input type="number" name="number" id="number" defaultValue={3} />
      <button onClick={modifImg}>Submit</button>
      </div>
      

  )
}

export default App

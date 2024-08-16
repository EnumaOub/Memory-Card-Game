import './GameInterface.css'
import { useState } from 'react'
import { cardGen } from '../modules/getCompData';
import { CardTemp } from './CardTemp';
import { Loading } from './Loading';
import { RulesGame } from './RulesGame';
import { StartGame } from './StartGame';
import { BoardScore } from './BoardScore';

export function GameInterface() {

    const [image, setImage] = useState([])
    const [load, setload] = useState(true)

    const cardLst = new cardGen();
    console.log(cardLst.compData);
    console.log(cardLst.nameLst);

    function modifImg(number) {
        setload(false);
        // const number = document.getElementById("number").value
        console.log(number)
        cardLst.getData(number).then((data) => {
        setImage(data);
        console.log(cardLst.compData);
        console.log(cardLst.nameLst);
        setload(true);
        })
    }

    const displayCard = image.map((elem, i) => 
        <CardTemp
          key={elem.name}
          name={elem.name}
          image={(elem.image)}
      > 
      </CardTemp> 
      )
    const displayBoard = <BoardScore bestScore={0}
        actualScore={0}
        >
        
    </BoardScore>

    


    return (
        <div id='game-interf'>
        <div>
        {load ? (
            <BoardScore
            bestScore={0}
            actualScore={0}
            >
                
            </BoardScore>,
             image.map((elem, i) => 
                <CardTemp
                  key={elem.name}
                  name={elem.name}
                  image={(elem.image)}
              > 
              </CardTemp> 
              )
            
          
      ) : (
      <Loading>
        
      </Loading>
        )
        }
        </div>
        <RulesGame></RulesGame>
        <StartGame
          gameCallback={modifImg}
        ></StartGame>
      {/* <label name="number">Number of images</label>
      <input type="number" name="number" id="number" defaultValue={3} />
      <button onClick={modifImg}>Submit</button> */}
      </div>
    )

}
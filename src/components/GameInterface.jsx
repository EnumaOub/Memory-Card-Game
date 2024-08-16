import './GameInterface.css'
import { useState } from 'react'
import { cardGen } from '../modules/getCompData';
import { Loading } from './Loading';
import { RulesGame } from './RulesGame';
import { StartGame } from './StartGame';
import { BoardScore } from './BoardScore';
import { DisplayCard } from './DisplayCard';

export function GameInterface() {

    const [image, setImage] = useState([])
    const [load, setLoad] = useState(true)
    const [score, setScore] = useState({
        best: 0,
        actual: 0
    })

    const cardLst = new cardGen();

    function modifImg(number) {
        setLoad(false);
        cardLst.getData(number).then((data) => {
        setImage(data);
        setLoad(true);
        })
    }

    function cardClick(event) {
        console.log(event.target)
        let target = event.target;
        if (target.nodeName.toLowerCase() === 'img') {
            target = target.parentElement
        }
        if (target.className != "card") return
        const value = target.id;
        console.log("card click !");
        console.log(value)
    }
    


    return (
        <main>
        <div id='game-interf'>
        {load ? (
            image.length > 0 && (
            <>
            <BoardScore
                bestScore={score.best}
                actualScore={score.actual}
            >
                
            </BoardScore>
            <DisplayCard
                image={image}
                callback={cardClick}
            >

            </DisplayCard>
              </>
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
      </main>
    )

}
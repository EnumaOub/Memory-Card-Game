import './GameInterface.css'
import { useState, useRef } from 'react'
import { GameGen } from '../modules/getCompData';
import { Loading } from './Loading';
import { RulesGame } from './RulesGame';
import { StartGame } from './StartGame';
import { BoardScore } from './BoardScore';
import { DisplayCard } from './DisplayCard';
import { EndGame } from './EndGame';

export function GameInterface() {

    const [image, setImage] = useState([])
    const [load, setLoad] = useState(true)
    const [score, setScore] = useState({
        best: 0,
        actual: 0
    })

    let cardLst = useRef(new GameGen());

    function modifImg(number) {
        const isFecthing = document.getElementById("fetch-bool").checked;
        setLoad(false);
        cardLst.current.getData(number, isFecthing).then((data) => {
            setImage([...data]);
            setLoad(true);
        })
    };

    function restartGame(reset=false) {
        if (reset) {
            const startModal = document.getElementById("start-modal");
            const isFecthing = document.getElementById("fetch-bool").checked;
            if (!startModal.classList.contains("active")){
                startModal.classList.toggle("active");
            }
            console.log(isFecthing)
            if (isFecthing) {
                cardLst.current.reset();
            }
            setImage([]);
            setLoad(false);
            updateScore(false);
            startModal.showModal()
        }
        else {
            const endModal = document.getElementById("end-dialog");
            endModal.classList.toggle("active");
            setImage([]);
            setLoad(false);
            updateScore(false);
            endModal.showModal()
        }
    }

    function updateScore(bool){
        const bestScore = document.getElementById("best-score");
        const actualScore = document.getElementById("actual-score");
        const valScore = score.actual;
        if (bool) {
            if (!actualScore.classList.contains("score-up")) {
                actualScore.classList.toggle("score-up");
            }
            if (bestScore.classList.contains("score-up")) {
                bestScore.classList.toggle("score-up");
            }
            if (score.best < valScore + 1) {
                bestScore.classList.toggle("score-up");
            }
            setScore({...score,
                best: score.best <= valScore + 1 ? valScore + 1: score.best,
                actual: valScore + 1
            })
            
        }
        else {
            if (bestScore.classList.contains("score-up")) {
                bestScore.classList.toggle("score-up");
            }
            actualScore.classList.toggle("score-up");
            setScore({...score,
                actual: 0
            })
        }
    }

    function cardClick(event) {
        console.log(event.target)
        let target = event.target;
        if (target.nodeName.toLowerCase() === 'img') {
            target = target.parentElement
        }
        if (target.className != "card") return
        const value = target.id;
        updateScore(cardLst.current.roundSelect(value))
        if (cardLst.current.checkEndGame()){
            restartGame()
        }
        cardLst.current.shuffleCard();
        setImage([...cardLst.current.compData])
    }
    


    return (
        <main>
        <div id='game-interf'>
        {load ? (
            image.length > 0 && (
            <>
            <div className='head-interf'>
                <BoardScore
                    bestScore={score.best}
                    actualScore={score.actual}
                >
                </BoardScore>
                <button id="reset-btn" onClick={() => restartGame(true)}>RESET</button>
            </div>
            

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
        <EndGame></EndGame>
      {/* <label name="number">Number of images</label>
      <input type="number" name="number" id="number" defaultValue={3} />
      <button onClick={modifImg}>Submit</button> */}
      </main>
    )

}
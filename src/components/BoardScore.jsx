import './BoardScore.css'

export function BoardScore({ bestScore, actualScore}) {
    return (
        <div className="scoreboard">
            <p id="best-score">Best Score: <span>{bestScore}</span></p>
            <p id="actual-score">Actual Score: <span>{actualScore}</span></p>
        </div>
    )
}
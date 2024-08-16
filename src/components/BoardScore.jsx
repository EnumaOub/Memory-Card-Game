

export function BoardScore({ bestScore, actualScore}) {
    return (
        <div id="score-board">
            <p id="best-score">Best Score: <span>{bestScore}</span></p>
            <p id="actual-score">Actual Score: <span>{actualScore}</span></p>
        </div>
    )
}
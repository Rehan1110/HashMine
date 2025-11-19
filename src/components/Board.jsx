import { useEffect, useState } from "react";
import "./Board.css";
import { memo } from "react";

function Board({ mines, totalCells, resetKey, isGameRunning, onGameOver }) {
  const [bombs, setBombs] = useState([]);
  const [revealed, setRevealed] = useState(Array(totalCells).fill(false));
  const [gameOver, setGameOver] = useState(false);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    resetGame();
  }, [resetKey, mines, totalCells]);

  function resetGame() {
    setBombs(generateBombs());                 
    setRevealed(Array(totalCells).fill(false));
    setGameOver(false);
    setIsWin(false);
  }

  function generateBombs() {
    const indices = [];
    for (let i = 0; i < totalCells; i++) {
      indices.push(i);
    }

    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    return indices.slice(0, mines);
  }

  function handleCellClick(index) {
    if (!isGameRunning || gameOver || revealed[index]) return;

    const isBomb = bombs.includes(index);

    if (isBomb) {
      setRevealed((prev) => {
        const copy = [...prev];
        copy[index] = true;
        return copy;
      });
      setGameOver(true);
      setIsWin(false);
      if (onGameOver) onGameOver();
      return;
    }

    setRevealed((prev) => {
      const copy = [...prev];
      copy[index] = true;

      const revealedSafeCount = copy.filter(
        (val, i) => val && !bombs.includes(i)
      ).length;
      const totalSafeCells = totalCells - bombs.length;

      if (revealedSafeCount === totalSafeCells) {
        setGameOver(true);
        setIsWin(true);
        if (onGameOver) onGameOver();
      }

      return copy;
    });
  }

  return (
    <div className={`board-wrapper ${gameOver ? "game-over" : ""}`}>
      <p className="board-heading">
        {gameOver
          ? isWin
            ? "🎉 You win!"
            : "💣 Game over!"
          : isGameRunning
          ? "Game in progress..."
          : "Press Bet to start the game"}
      </p>
    <div className="board-box-container">
      <div className="board-container">
        {Array.from({ length: totalCells }).map((_, index) => {
          const wasClicked = revealed[index];
          const isBomb = bombs.includes(index);
          const shouldShowContent = gameOver || wasClicked;

          let className = "board-boxes";

          if (gameOver) {
    
            className += isBomb ? " bomb" : " diamond";
            if (!wasClicked) {
              className += " faded";
            }
          } else {
            if (wasClicked) {
              className += isBomb ? " bomb" : " diamond";
            }
          }

          return (
            <div
              key={index}
              className={className}
              onClick={() => handleCellClick(index)}
            >
              {shouldShowContent && (isBomb ? "💣" : "💎")}
            </div>
          );
        })}
      </div>
      </div>
    </div>
  );
}

export default memo(Board);

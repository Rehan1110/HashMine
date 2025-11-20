import { useState } from "react";
import Board from "./components/Board";
import Sidebar from "./components/Sidebar";
import "./App.css";

export default function App() {
   const TOTAL_CELLS = 25;
      const [rangeValue, setRangeValue] = useState(1);
      const [resetKey, setResetKey] = useState(0);     
      const [isGameRunning, setIsGameRunning] = useState(false);
      const [remainingGems, setRemainingGems] = useState(null); 

      const handleRangeChange = (value) => {
      setRangeValue(value);
      setIsGameRunning(false);
      setResetKey((k) => k + 1);
       setRemainingGems(null);   
  };

  const handleBet = () => {
    if (isGameRunning) return;
    setIsGameRunning(true);
    setResetKey((k) => k + 1); 
     setRemainingGems(null);   
  };

   const handleGameOver = () => {
    setIsGameRunning(false);
     setRemainingGems(null);   
  };

  const handleSafeReveal = (safeLeft) => {
  setRemainingGems(safeLeft);        
};


  return(
    <div className="main-layout">
      <Sidebar
        rangeValue={rangeValue}
        onRangeChange={handleRangeChange}
        onBet={handleBet}
        isGameRunning={isGameRunning}
         remainingGems={remainingGems} 
      />
      <Board
        mines={rangeValue}
        totalCells={TOTAL_CELLS}
        resetKey={resetKey}
        isGameRunning={isGameRunning}
        onGameOver={handleGameOver}
         onSafeReveal={handleSafeReveal} 
      />
    </div>
  )
}
import { useState } from "react";
import { memo } from "react";
import "./Sidebar.css"
function Sidebar({ rangeValue, onRangeChange, onBet, isGameRunning }) {
  const [money, setMoney] = useState(1)
  function handleRangeValue(e) {
    onRangeChange(Number(e.target.value));
  }
    return (
        <div className="sidebar-container">
            <div className="sidebar-heading-container">
            <p className="active" style={{color:'#FFFFFF'}}>Manual</p>
            <p style={{color:'#B3BEC1'}}>Auto</p>
            </div>
        <div className="sidebar-amount">
            <p style={{color:'#B3BEC1'}}>
                Amount <span className="info-icon"></span>
            </p>
            <p style={{color:'#B3BEC1'}}>≈0BCD</p>
        </div>
      <div className="custom-input">
  
            <div className="left-group">
                <span className="flag">🇮🇳</span>
                <input type="text" value={money} onChange={(e) =>setMoney(e.target.value)}/>
            </div>

            <div className="right-group">
                <span className="half">1/2</span>
                <span className="double">2×</span>
            </div>

            </div>

        <div className="sidebar-rupees">
            <div style={{color:'#FFFFFF'}}>10</div>
            <div style={{color:'#FFFFFF'}}>100</div>
            <div style={{color:'#FFFFFF'}}>1.0k</div>
            <div style={{color:'#FFFFFF'}}>10.0k</div>
        </div>
        <div>
            <p className="Mines">Mines</p>
        </div>
        <div className="Range">
            <span style={{color:'#FFFFFF', padding:'10px'}}>{rangeValue}</span>
           <input
            type="range"
            min="1"
            max="24"
            value={rangeValue}           
            onChange={handleRangeValue}
            className="range-value"
            style={{
                background: `linear-gradient(90deg, #00c853 ${(rangeValue / 24) * 100}%, #ffffff ${(rangeValue / 24) * 100}%)`
            }}
             />

            <span style={{color:'#B3BEC1',padding:'10px'}}>24</span>
        </div>
        <div className="sidebar-buttons">
            <div> <button
            className="first"
            onClick={onBet}
            disabled={isGameRunning}  
          >
            Bet
          </button></div>
            <div><button className="second">Betting with 0 will enter demo code</button></div>
        </div>
        </div>
    )
}
export default memo(Sidebar);
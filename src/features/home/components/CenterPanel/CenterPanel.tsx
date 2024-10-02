import Button from "../../../../library/Button/Button";
import "./CenterPanel.scss"

interface CenterPanelProps {
  isGameEnd: boolean;
  holdOnClick: ()=> void;
  diceOnClick: ()=>void;
  currentScore: number;
  activePlayer: string;
}

const CenterPanel : React.FC<CenterPanelProps> = ({isGameEnd, holdOnClick, diceOnClick, currentScore, activePlayer}:CenterPanelProps)=>{
    return (<div className="center-panel-container">
        <div>{`Active Player: ${activePlayer}`}</div>
        <Button onClick={diceOnClick} fill={'primary'} size="medium" disabled={isGameEnd}> Dice</Button>
        <Button onClick = {holdOnClick} fill={'secondary'} size={'medium'} disabled={isGameEnd}>Hold</Button>
        <div>{`Current score: ${currentScore}`}</div>
    </div>)
}

export default CenterPanel;
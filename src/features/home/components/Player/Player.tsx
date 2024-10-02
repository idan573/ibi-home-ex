import "./Player.scss"
interface PlayerProps {
    playerTitle: string;
    playerScore: number;
}

const Player: React.FC<PlayerProps> = ({playerTitle, playerScore}: PlayerProps)=>{
    return (<>
    <div className="player-container">
      <div>{playerTitle}</div>
      <div>{playerScore}</div>
    </div>
    </>)
}

export default Player;